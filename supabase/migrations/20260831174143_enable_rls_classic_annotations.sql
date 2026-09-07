-- Enable Row Level Security on classic_annotations
alter table public.classic_annotations enable row level security;

-- The app runs entirely with the anon role (no user auth).
-- SELECT: everyone may only read public annotations.
create policy "anon_select_public_classic_annotations"
on public.classic_annotations
for select
to anon
using (is_public = true);

-- INSERT: everyone may add public annotations.
create policy "anon_insert_classic_annotations"
on public.classic_annotations
for insert
to anon
with check (true);

-- UPDATE: not used by the app; left unrestricted for the anon role to
-- keep the current behaviour working.
create policy "anon_update_classic_annotations"
on public.classic_annotations
for update
to anon
using (true)
with check (true);

-- DELETE: the app gates deletion with a client-side password; replicate
-- that behaviour at the API level with an unrestricted anon policy.
create policy "anon_delete_classic_annotations"
on public.classic_annotations
for delete
to anon
using (true);
