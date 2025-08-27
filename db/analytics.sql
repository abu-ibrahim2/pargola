-- Enable extension if needed
create extension if not exists pgcrypto;

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  pathname text not null,
  referrer text,
  lang text,
  timezone text,
  screen_w int,
  screen_h int,
  user_agent text,
  visitor_id uuid not null,
  session_id uuid not null
);

create index if not exists idx_ae_created_at on public.analytics_events (created_at desc);
create index if not exists idx_ae_pathname on public.analytics_events (pathname);
create index if not exists idx_ae_referrer on public.analytics_events (referrer);
create index if not exists idx_ae_visitor on public.analytics_events (visitor_id);
create index if not exists idx_ae_session on public.analytics_events (session_id);

-- Optional: RLS (safe if you only write via service role; reads from service role as well)
alter table public.analytics_events enable row level security;

-- If you ever want to allow anonymous inserts (without service key), uncomment:
-- create policy "allow anon insert" on public.analytics_events for insert to anon with check (true);

alter table public.analytics_events add column if not exists page_label text;
create index if not exists idx_ae_page_label on public.analytics_events (page_label);

delete from public.analytics_events where pathname like '/admin%';

alter table public.analytics_events add column if not exists page_label text;
create index if not exists idx_ae_page_label on public.analytics_events (page_label);
