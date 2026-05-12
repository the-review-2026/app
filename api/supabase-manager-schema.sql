-- The Review Manager access control.
-- Manager membership now lives on public.users.
-- Apply this after public.users has been created.

create extension if not exists pgcrypto;

alter table public.users
  add column if not exists auth0_sub text,
  add column if not exists nickname text,
  add column if not exists email text,
  add column if not exists manager_role text,
  add column if not exists manager_status text not null default 'pending',
  add column if not exists manager_approved_at timestamptz,
  add column if not exists manager_approved_by uuid,
  add column if not exists updated_at timestamptz not null default now();

alter table public.users
  add column if not exists display_name text;

create index if not exists users_manager_status_idx on public.users(manager_status);
create index if not exists users_manager_role_idx on public.users(manager_role);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.users'::regclass
      and conname = 'users_manager_role_check'
  ) then
    alter table public.users
      add constraint users_manager_role_check check (
        manager_role is null
        or manager_role in ('owner', 'developer', 'checker', 'system_designer', 'character_designer')
      );
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.users'::regclass
      and conname = 'users_manager_status_check'
  ) then
    alter table public.users
      add constraint users_manager_status_check check (manager_status in ('pending', 'approved', 'suspended'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.users'::regclass
      and conname = 'users_manager_approved_by_fkey'
  ) then
    alter table public.users
      add constraint users_manager_approved_by_fkey
      foreign key (manager_approved_by) references public.users(id) on delete set null;
  end if;
end $$;

update public.users
set
  nickname = coalesce(nullif(nickname, ''), nullif(display_name, '')),
  updated_at = coalesce(updated_at, now());

alter table if exists public.manager_members
  add column if not exists auth0_sub text,
  add column if not exists display_name text,
  add column if not exists email text,
  add column if not exists role text,
  add column if not exists status text not null default 'pending',
  add column if not exists approved_at timestamptz,
  add column if not exists approved_by uuid,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if to_regclass('public.manager_members') is not null then
    execute $migration$
update public.users as u
set
  auth0_sub = coalesce(nullif(mm.auth0_sub, ''), u.auth0_sub),
  nickname = coalesce(nullif(mm.display_name, ''), u.nickname),
  email = coalesce(nullif(mm.email, ''), u.email),
  manager_role = case
    when mm.role in ('owner', 'developer', 'checker', 'system_designer', 'character_designer') then mm.role
    else u.manager_role
  end,
  manager_status = case
    when mm.status in ('pending', 'approved', 'suspended') then mm.status
    else u.manager_status
  end,
  manager_approved_at = coalesce(mm.approved_at, u.manager_approved_at),
  manager_approved_by = coalesce(approver.user_id, u.manager_approved_by),
  updated_at = coalesce(greatest(u.updated_at, mm.updated_at), u.updated_at, mm.updated_at, now())
from public.manager_members as mm
left join public.manager_members as approver on approver.id = mm.approved_by
where mm.user_id = u.id
$migration$;
  end if;
end $$;

alter table public.users
  drop column if exists display_name;

drop table if exists public.manager_members;

create table if not exists public.question_submissions (
  id uuid primary key default gen_random_uuid(),
  binder text,
  note text,
  chapter text,
  section text,
  text_number text,
  text_name text,
  question_number text,
  question_name text,
  content_text text,
  content_html text,
  image jsonb not null default '{}'::jsonb,
  notebook_blocks jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending',
  source_app text,
  author jsonb not null default '{}'::jsonb,
  submitted_by uuid references public.users(id) on delete set null,
  approved_by uuid references public.users(id) on delete set null,
  submitted_at timestamptz,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.question_submissions'::regclass
      and conname = 'question_submissions_status_check'
  ) then
    alter table public.question_submissions
      add constraint question_submissions_status_check check (status in ('draft', 'pending', 'approved', 'rejected'));
  end if;
end $$;

create index if not exists question_submissions_status_idx on public.question_submissions(status);
create index if not exists question_submissions_note_idx on public.question_submissions(note);
create index if not exists question_submissions_submitted_by_idx on public.question_submissions(submitted_by);
create index if not exists question_submissions_updated_at_idx on public.question_submissions(updated_at desc);
