-- The Review cross-device Review Data sync.
-- Apply this in Supabase after the existing users table has been created.

create extension if not exists pgcrypto;

create table if not exists public.review_data (
  user_id uuid primary key references public.users(id) on delete cascade,
  storage_key text not null default 'the-review-quest-v1',
  payload jsonb not null default '{}'::jsonb,
  client_updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists review_data_client_updated_at_idx on public.review_data(client_updated_at);
