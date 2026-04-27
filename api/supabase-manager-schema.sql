-- The Review Manager access control.
-- Apply this in Supabase after the existing users table has been created.

create extension if not exists pgcrypto;

create table if not exists public.manager_members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  auth0_sub text not null,
  display_name text,
  email text,
  role text check (
    role in ('owner', 'developer', 'checker', 'system_designer', 'character_designer')
  ),
  status text not null default 'pending' check (status in ('pending', 'approved', 'suspended')),
  approved_at timestamptz,
  approved_by uuid references public.manager_members(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id),
  unique (auth0_sub)
);

create index if not exists manager_members_status_idx on public.manager_members(status);
create index if not exists manager_members_role_idx on public.manager_members(role);
