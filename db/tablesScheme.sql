-- single row for site settings
create table if not exists site_settings (
  id text primary key,
  address text,
  contact_email text,
  phone_number text,
  whatsapp_number text,
  updated_at timestamp with time zone default now()
);

-- allowlist of admin emails
create table if not exists allowed_admins (
  email text primary key,
  created_at timestamp with time zone default now()
);

-- Single-row site settings
create table if not exists site_settings (
  id text primary key check (id = 'site-default'),
  site_title text,
  company_name text,
  address text,
  contact_email text,
  phone_number text,
  whatsapp_number text,
  instagram_handle text,
  facebook_url text,
  map_embed_url text,
  opening_hours jsonb default '{}'::jsonb,
  default_locale text default 'he',
  updated_at timestamptz default now()
);

-- Seed canonical row
insert into site_settings (id) values ('site-default') on conflict (id) do nothing;

-- Optional: ensure the row exists
insert into site_settings (id, updated_at)
values ('site-default', now())
on conflict (id) do nothing;

-- Remove the fields you no longer use
alter table site_settings drop column if exists opening_hours;
alter table site_settings drop column if exists default_locale;

alter table site_settings drop column if exists company_name;


begin;

-- 1) Ensure columns exist on site_settings
alter table public.site_settings
  add column if not exists site_title text,
  add column if not exists instagram_handle text,
  add column if not exists facebook_url text,
  add column if not exists map_embed_url text;

-- (optional) make updated_at auto-update
do $$
begin
  if not exists (
    select 1 from pg_proc where proname = 'set_updated_at'
  ) then
    create or replace function public.set_updated_at()
    returns trigger language plpgsql as $fn$
    begin
      new.updated_at := now();
      return new;
    end;
    $fn$;
  end if;
end$$;

do $$
begin
  if not exists (
    select 1 from pg_trigger
    where tgname = 'site_settings_set_updated_at'
  ) then
    create trigger site_settings_set_updated_at
    before update on public.site_settings
    for each row execute function public.set_updated_at();
  end if;
end$$;

-- 2) Seed the row your app loads/updates
insert into public.site_settings (id, updated_at)
values ('site-default', now())
on conflict (id) do nothing;

-- 3) Keep it simple: disable RLS (so your client-side upsert works)
alter table public.site_settings disable row level security;

-- 4) Drop allowed_admins if you don’t need it anymore
drop table if exists public.allowed_admins cascade;

commit;
