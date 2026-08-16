-- 0002_storage.sql
-- The `media` table (0001_init.sql) tracks metadata about uploaded files,
-- but nothing ever created the actual Supabase Storage bucket those files
-- live in. This does that: one public bucket, readable by anyone (so
-- images/resume display on the public site with no auth), writable only
-- by the authenticated admin.

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media public read"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "media authenticated insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

create policy "media authenticated update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media');

create policy "media authenticated delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');
