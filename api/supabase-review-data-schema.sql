-- The Review cross-device cloud sync.
-- Apply this in Supabase after the existing users table has been created.

create extension if not exists pgcrypto;

create table if not exists public.review_data (
  user_id uuid primary key references public.users(id) on delete cascade,
  storage_key text not null default 'the-review-quest-v1',
  payload jsonb not null default '{}'::jsonb,
  login_days jsonb not null default '{}'::jsonb,
  daily_login_reward_days jsonb not null default '{}'::jsonb,
  daily_try_records jsonb not null default '{}'::jsonb,
  learning_progress jsonb not null default '{}'::jsonb,
  client_updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.review_data
  add column if not exists login_days jsonb not null default '{}'::jsonb,
  add column if not exists daily_login_reward_days jsonb not null default '{}'::jsonb,
  add column if not exists daily_try_records jsonb not null default '{}'::jsonb,
  add column if not exists learning_progress jsonb not null default '{}'::jsonb;

create index if not exists review_data_client_updated_at_idx on public.review_data(client_updated_at);

create table if not exists public.personal_data (
  user_id uuid primary key references public.users(id) on delete cascade,
  storage_key text not null default 'the-review-personal-v1',
  payload jsonb not null default '{}'::jsonb,
  login_status text not null default 'logged_out',
  is_logged_in boolean not null default false,
  auth_provider text,
  display_name text,
  nickname text,
  email text,
  color_theme text,
  high_contrast boolean not null default false,
  monochrome boolean not null default false,
  review_coin integer not null default 0,
  coin_grant_5000_applied boolean not null default false,
  has_unlimited_review_coins boolean not null default false,
  settings jsonb not null default '{}'::jsonb,
  education_codes jsonb not null default '[]'::jsonb,
  avater jsonb not null default '{}'::jsonb,
  equipped_avater jsonb not null default '{}'::jsonb,
  client_updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint personal_data_login_status_check check (login_status in ('logged_out', 'guest', 'logged_in')),
  constraint personal_data_review_coin_check check (review_coin >= 0)
);

alter table public.personal_data
  add column if not exists login_status text not null default 'logged_out',
  add column if not exists is_logged_in boolean not null default false,
  add column if not exists auth_provider text,
  add column if not exists display_name text,
  add column if not exists nickname text,
  add column if not exists email text,
  add column if not exists color_theme text,
  add column if not exists high_contrast boolean not null default false,
  add column if not exists monochrome boolean not null default false,
  add column if not exists review_coin integer not null default 0,
  add column if not exists coin_grant_5000_applied boolean not null default false,
  add column if not exists has_unlimited_review_coins boolean not null default false,
  add column if not exists settings jsonb not null default '{}'::jsonb,
  add column if not exists education_codes jsonb not null default '[]'::jsonb,
  add column if not exists avater jsonb not null default '{}'::jsonb,
  add column if not exists equipped_avater jsonb not null default '{}'::jsonb;

create index if not exists personal_data_client_updated_at_idx on public.personal_data(client_updated_at);

update public.review_data
set
  login_days = case when jsonb_typeof(payload->'loginDays') = 'object' then payload->'loginDays' else '{}'::jsonb end,
  daily_login_reward_days = case when jsonb_typeof(payload->'dailyLoginRewardDays') = 'object' then payload->'dailyLoginRewardDays' else '{}'::jsonb end,
  daily_try_records = case when jsonb_typeof(payload->'dailyTryRecords') = 'object' then payload->'dailyTryRecords' else '{}'::jsonb end,
  learning_progress = case
    when jsonb_typeof(payload->'learningProgress') = 'object' then payload->'learningProgress'
    when jsonb_typeof(payload->'progress') = 'object' then payload->'progress'
    when jsonb_typeof(payload->'noteProgress') = 'object' then payload->'noteProgress'
    else '{}'::jsonb
  end
where payload ?| array['loginDays', 'dailyLoginRewardDays', 'dailyTryRecords', 'learningProgress', 'progress', 'noteProgress'];

insert into public.personal_data (
  user_id,
  storage_key,
  payload,
  login_status,
  is_logged_in,
  auth_provider,
  display_name,
  nickname,
  email,
  color_theme,
  high_contrast,
  monochrome,
  review_coin,
  coin_grant_5000_applied,
  has_unlimited_review_coins,
  settings,
  education_codes,
  avater,
  equipped_avater,
  client_updated_at,
  created_at,
  updated_at
)
select
  user_id,
  'the-review-personal-v1',
  jsonb_strip_nulls(
    jsonb_build_object(
      'reviewCoin', payload->'reviewCoin',
      'coinGrant5000Applied', payload->'coinGrant5000Applied',
      'settings', payload->'settings',
      'auth', payload->'auth',
      'avater', coalesce(payload->'avater', payload->'avatar'),
      'personalSync', jsonb_build_object(
        'version', 1,
        'updatedAt', coalesce(payload #>> '{sync,updatedAt}', client_updated_at::text),
        'syncedAt', '',
        'lastRemoteUpdatedAt', updated_at::text
      )
    )
  ),
  case
    when (payload #>> '{auth,isLoggedIn}') = 'true' and (payload #>> '{auth,provider}') = 'guest' then 'guest'
    when (payload #>> '{auth,isLoggedIn}') = 'true' then 'logged_in'
    else 'logged_out'
  end,
  coalesce((payload #>> '{auth,isLoggedIn}') = 'true', false),
  nullif(payload #>> '{auth,provider}', ''),
  nullif(payload #>> '{auth,displayName}', ''),
  nullif(payload #>> '{auth,nickname}', ''),
  nullif(payload #>> '{auth,email}', ''),
  nullif(payload #>> '{settings,theme}', ''),
  coalesce((payload #>> '{settings,highContrast}') = 'true', false),
  coalesce((payload #>> '{settings,monochrome}') = 'true', false),
  case
    when (payload->>'reviewCoin') ~ '^[0-9]+(\.[0-9]+)?$' then floor((payload->>'reviewCoin')::numeric)::integer
    else 0
  end,
  coalesce((payload->>'coinGrant5000Applied') = 'true', false),
  coalesce((payload->>'hasUnlimitedReviewCoins') = 'true', false),
  case when jsonb_typeof(payload->'settings') = 'object' then payload->'settings' else '{}'::jsonb end,
  case when jsonb_typeof(payload #> '{settings,educationCodes}') = 'array' then payload #> '{settings,educationCodes}' else '[]'::jsonb end,
  case
    when jsonb_typeof(payload->'avater') = 'object' then payload->'avater'
    when jsonb_typeof(payload->'avatar') = 'object' then payload->'avatar'
    else '{}'::jsonb
  end,
  case
    when jsonb_typeof(payload #> '{avater,equipped}') = 'object' then payload #> '{avater,equipped}'
    when jsonb_typeof(payload #> '{avatar,equipped}') = 'object' then payload #> '{avatar,equipped}'
    else '{}'::jsonb
  end,
  client_updated_at,
  created_at,
  updated_at
from public.review_data
where payload ?| array['reviewCoin', 'coinGrant5000Applied', 'settings', 'auth', 'avater', 'avatar']
on conflict (user_id) do nothing;

update public.personal_data
set
  login_status = case
    when (payload #>> '{auth,isLoggedIn}') = 'true' and (payload #>> '{auth,provider}') = 'guest' then 'guest'
    when (payload #>> '{auth,isLoggedIn}') = 'true' then 'logged_in'
    else 'logged_out'
  end,
  is_logged_in = coalesce((payload #>> '{auth,isLoggedIn}') = 'true', false),
  auth_provider = nullif(payload #>> '{auth,provider}', ''),
  display_name = nullif(payload #>> '{auth,displayName}', ''),
  nickname = nullif(payload #>> '{auth,nickname}', ''),
  email = nullif(payload #>> '{auth,email}', ''),
  color_theme = nullif(payload #>> '{settings,theme}', ''),
  high_contrast = coalesce((payload #>> '{settings,highContrast}') = 'true', false),
  monochrome = coalesce((payload #>> '{settings,monochrome}') = 'true', false),
  review_coin = case
    when (payload->>'reviewCoin') ~ '^[0-9]+(\.[0-9]+)?$' then floor((payload->>'reviewCoin')::numeric)::integer
    else 0
  end,
  coin_grant_5000_applied = coalesce((payload->>'coinGrant5000Applied') = 'true', false),
  has_unlimited_review_coins = coalesce((payload->>'hasUnlimitedReviewCoins') = 'true', false),
  settings = case when jsonb_typeof(payload->'settings') = 'object' then payload->'settings' else '{}'::jsonb end,
  education_codes = case when jsonb_typeof(payload #> '{settings,educationCodes}') = 'array' then payload #> '{settings,educationCodes}' else '[]'::jsonb end,
  avater = case
    when jsonb_typeof(payload->'avater') = 'object' then payload->'avater'
    when jsonb_typeof(payload->'avatar') = 'object' then payload->'avatar'
    else '{}'::jsonb
  end,
  equipped_avater = case
    when jsonb_typeof(payload #> '{avater,equipped}') = 'object' then payload #> '{avater,equipped}'
    when jsonb_typeof(payload #> '{avatar,equipped}') = 'object' then payload #> '{avatar,equipped}'
    else '{}'::jsonb
  end
where payload ?| array['reviewCoin', 'coinGrant5000Applied', 'settings', 'auth', 'avater', 'avatar'];
