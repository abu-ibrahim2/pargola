-- 1) Ensure the bucket exists and is public-read (for viewing in your grid)
insert into storage.buckets (id, name, public)
values ('pargola-images', 'pargola-images', true)
on conflict (id) do update set public = true;

-- 2) Helper: who is the admin? (use your real admin email)
create or replace function is_admin() returns boolean
language sql stable as $$
  select auth.jwt()->>'email' = 'abuibrahimkaloti@gmail.com';
$$;

-- 3) READ: anyone can read from this bucket (for your public gallery/grid)
create policy "Public read pargola images"
on storage.objects for select
using (bucket_id = 'pargola-images');

-- 4) INSERT: only admin can upload
create policy "Admin upload pargola images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'pargola-images' and is_admin());

-- 5) UPDATE: only admin
create policy "Admin update pargola images"
on storage.objects for update
to authenticated
using (bucket_id = 'pargola-images' and is_admin())
with check (bucket_id = 'pargola-images' and is_admin());

-- 6) DELETE: only admin
create policy "Admin delete pargola images"
on storage.objects for delete
to authenticated
using (bucket_id = 'pargola-images' and is_admin());
