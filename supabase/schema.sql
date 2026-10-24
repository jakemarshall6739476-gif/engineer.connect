-- =====================================================================
-- Engineer Connect: database setup
-- Run this whole file once in Supabase -> SQL Editor -> New query -> Run.
-- Safe to run again: it only adds what is missing and refreshes the rules.
--
-- Rules in plain words:
--   * Anyone (even signed out) can read public profiles, ideas and open jobs.
--   * Only signed-in people can post, back ideas, connect or advertise jobs.
--   * People can only change or delete their own things.
--   * Connection requests can only be seen by the two people involved.
--   * Job templates are private to the employer who saved them.
--   * Admins (is_admin = true, set by hand in Table Editor) can hide anything.
-- =====================================================================

-- The engineering areas (keep in step with DISCIPLINES in app.js)
create or replace function public.valid_area(a text)
returns boolean language sql immutable
as $$ select a in ('mechanical','electrical','chemical','civil','aerospace','software','nuclear') $$;

-- ---------------------------------------------------------------------
-- Profiles: one per account, created automatically on sign-up
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  name        text not null default '' check (char_length(name) <= 60),
  role        text not null default '' check (char_length(role) <= 80),
  discipline  text check (discipline is null or public.valid_area(discipline)),
  location    text not null default '' check (char_length(location) <= 60),
  skills      text[] not null default '{}' check (cardinality(skills) <= 20),
  looking     text not null default '' check (char_length(looking) <= 200),
  visible     boolean not null default true,   -- show on the Connections page
  is_admin    boolean not null default false,  -- set by hand, never from the website
  created_at  timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and is_admin) $$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name)
  values (new.id, left(coalesce(new.raw_user_meta_data ->> 'name', ''), 60))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

insert into public.profiles (id) select id from auth.users on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- Ideas and backing
-- ---------------------------------------------------------------------
create table if not exists public.ideas (
  id          bigint generated always as identity primary key,
  author      uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  discipline  text not null check (public.valid_area(discipline)),
  title       text not null check (char_length(title) between 1 and 100),
  body        text not null check (char_length(body) between 1 and 600),
  tags        text[] not null default '{}' check (cardinality(tags) <= 10),
  hidden      boolean not null default false,
  created_at  timestamptz not null default now()
);

create table if not exists public.idea_backers (
  idea_id     bigint not null references public.ideas (id) on delete cascade,
  user_id     uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (idea_id, user_id)
);

-- Ideas with their author's name and backing count, for the Ideas page
create or replace view public.idea_list
with (security_invoker = true)
as
  select i.id, i.author, i.discipline, i.title, i.body, i.tags, i.hidden, i.created_at,
         p.name as author_name,
         (select count(*) from public.idea_backers b where b.idea_id = i.id)::int as backers
  from public.ideas i
  join public.profiles p on p.id = i.author;

-- ---------------------------------------------------------------------
-- Connection requests
-- ---------------------------------------------------------------------
create table if not exists public.connection_requests (
  id          bigint generated always as identity primary key,
  from_user   uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  to_user     uuid not null references public.profiles (id) on delete cascade,
  status      text not null default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at  timestamptz not null default now(),
  unique (from_user, to_user),
  check (from_user <> to_user)
);

-- ---------------------------------------------------------------------
-- Jobs and job templates
-- The fields used for filtering are columns; the rest of the advert is in "details".
-- ---------------------------------------------------------------------
create table if not exists public.jobs (
  id            bigint generated always as identity primary key,
  owner         uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  title         text not null check (char_length(title) between 1 and 80),
  company       text not null check (char_length(company) between 1 and 80),
  location      text not null check (char_length(location) between 1 and 80),
  discipline    text not null check (public.valid_area(discipline)),
  job_type      text not null default '',
  pattern       text not null default '',
  closing_date  date,
  details       jsonb not null default '{}',
  hidden        boolean not null default false,
  created_at    timestamptz not null default now()
);

create table if not exists public.job_templates (
  id          bigint generated always as identity primary key,
  owner       uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  name        text not null check (char_length(name) between 1 and 50),
  data        jsonb not null default '{}',
  created_at  timestamptz not null default now(),
  unique (owner, name)
);

-- ---------------------------------------------------------------------
-- Security rules (row level security)
-- ---------------------------------------------------------------------
alter table public.profiles             enable row level security;
alter table public.ideas                enable row level security;
alter table public.idea_backers         enable row level security;
alter table public.connection_requests  enable row level security;
alter table public.jobs                 enable row level security;
alter table public.job_templates        enable row level security;

-- Profiles
drop policy if exists "profiles: read visible or own" on public.profiles;
create policy "profiles: read visible or own" on public.profiles for select
  using (visible or id = auth.uid() or public.is_admin());
drop policy if exists "profiles: edit own" on public.profiles;
create policy "profiles: edit own" on public.profiles for update
  using (id = auth.uid()) with check (id = auth.uid());
-- Nobody can make themselves an admin: only these columns can be changed from the website
revoke update on public.profiles from anon, authenticated;
grant update (name, role, discipline, location, skills, looking, visible) on public.profiles to authenticated;

-- Ideas
drop policy if exists "ideas: read" on public.ideas;
create policy "ideas: read" on public.ideas for select
  using (not hidden or author = auth.uid() or public.is_admin());
drop policy if exists "ideas: post own" on public.ideas;
create policy "ideas: post own" on public.ideas for insert to authenticated
  with check (author = auth.uid() and not hidden);
drop policy if exists "ideas: edit own or admin" on public.ideas;
create policy "ideas: edit own or admin" on public.ideas for update to authenticated
  using (author = auth.uid() or public.is_admin())
  with check (author = auth.uid() or public.is_admin());
drop policy if exists "ideas: delete own or admin" on public.ideas;
create policy "ideas: delete own or admin" on public.ideas for delete to authenticated
  using (author = auth.uid() or public.is_admin());

-- Backing
drop policy if exists "backers: read" on public.idea_backers;
create policy "backers: read" on public.idea_backers for select using (true);
drop policy if exists "backers: back as yourself" on public.idea_backers;
create policy "backers: back as yourself" on public.idea_backers for insert to authenticated
  with check (user_id = auth.uid());
drop policy if exists "backers: unback your own" on public.idea_backers;
create policy "backers: unback your own" on public.idea_backers for delete to authenticated
  using (user_id = auth.uid());

-- Connection requests: only the two people involved
drop policy if exists "connections: read own" on public.connection_requests;
create policy "connections: read own" on public.connection_requests for select to authenticated
  using (auth.uid() in (from_user, to_user));
drop policy if exists "connections: send" on public.connection_requests;
create policy "connections: send" on public.connection_requests for insert to authenticated
  with check (from_user = auth.uid() and status = 'pending');
drop policy if exists "connections: answer" on public.connection_requests;
create policy "connections: answer" on public.connection_requests for update to authenticated
  using (to_user = auth.uid()) with check (to_user = auth.uid());
drop policy if exists "connections: cancel or remove" on public.connection_requests;
create policy "connections: cancel or remove" on public.connection_requests for delete to authenticated
  using (auth.uid() in (from_user, to_user));
-- Answering a request can only change its status
revoke update on public.connection_requests from anon, authenticated;
grant update (status) on public.connection_requests to authenticated;

-- Jobs: open vacancies are public
drop policy if exists "jobs: read open" on public.jobs;
create policy "jobs: read open" on public.jobs for select
  using ((not hidden and (closing_date is null or closing_date >= current_date))
         or owner = auth.uid() or public.is_admin());
drop policy if exists "jobs: post own" on public.jobs;
create policy "jobs: post own" on public.jobs for insert to authenticated
  with check (owner = auth.uid() and not hidden);
drop policy if exists "jobs: edit own or admin" on public.jobs;
create policy "jobs: edit own or admin" on public.jobs for update to authenticated
  using (owner = auth.uid() or public.is_admin())
  with check (owner = auth.uid() or public.is_admin());
drop policy if exists "jobs: delete own or admin" on public.jobs;
create policy "jobs: delete own or admin" on public.jobs for delete to authenticated
  using (owner = auth.uid() or public.is_admin());

-- Job templates: private to their owner
drop policy if exists "templates: own only" on public.job_templates;
create policy "templates: own only" on public.job_templates for all to authenticated
  using (owner = auth.uid()) with check (owner = auth.uid());

-- ---------------------------------------------------------------------
-- "Delete my account": removes the account and, through the links above,
-- everything that person posted.
-- ---------------------------------------------------------------------
create or replace function public.delete_my_account()
returns void
language plpgsql security definer set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Not signed in';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$;
revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
