-- The Review Manager access control.
-- Manager membership now lives on public.users.
-- Apply this after public.users has been created.

create extension if not exists pgcrypto;

alter table public.users
  add column if not exists auth0_sub text,
  add column if not exists display_name text,
  add column if not exists email text,
  add column if not exists manager_role text,
  add column if not exists manager_status text not null default 'pending',
  add column if not exists manager_approved_at timestamptz,
  add column if not exists manager_approved_by uuid,
  add column if not exists updated_at timestamptz not null default now();

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
  display_name = coalesce(nullif(mm.display_name, ''), u.display_name),
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

drop table if exists public.manager_members;
