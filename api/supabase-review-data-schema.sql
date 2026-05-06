-- The Review users table cloud data.
-- Apply this after public.users has been created.
-- This migrates legacy review_data/personal_data/manager_members data into users,
-- renames the user-level Review Data columns, and removes the old tables.

create extension if not exists pgcrypto;

alter table public.users
  add column if not exists auth0_sub text,
  add column if not exists nickname text,
  add column if not exists email text,
  add column if not exists personal_data jsonb not null default '{}'::jsonb,
  add column if not exists review_period jsonb not null default '{}'::jsonb,
  add column if not exists todays_mission jsonb not null default '{}'::jsonb,
  add column if not exists review_data jsonb not null default '{}'::jsonb,
  add column if not exists login_status text not null default 'logged_out',
  add column if not exists is_logged_in boolean not null default false,
  add column if not exists auth_provider text,
  add column if not exists color_theme text,
  add column if not exists review_coin integer not null default 0,
  add column if not exists has_unlimited_review_coins boolean not null default false,
  add column if not exists settings jsonb not null default '{}'::jsonb,
  add column if not exists education_codes jsonb not null default '[]'::jsonb,
  add column if not exists avater jsonb not null default '{}'::jsonb,
  add column if not exists equipped_avater jsonb not null default '{}'::jsonb,
  add column if not exists review_client_updated_at timestamptz,
  add column if not exists review_synced_at timestamptz,
  add column if not exists review_remote_updated_at timestamptz,
  add column if not exists manager_role text,
  add column if not exists manager_status text not null default 'pending',
  add column if not exists manager_approved_at timestamptz,
  add column if not exists manager_approved_by uuid,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

-- Temporary legacy columns. They are dropped at the end of this migration.
alter table public.users
  add column if not exists display_name text,
  add column if not exists review_storage_key text,
  add column if not exists review_payload jsonb,
  add column if not exists login_days jsonb,
  add column if not exists daily_login_reward_days jsonb,
  add column if not exists daily_try_records jsonb,
  add column if not exists learning_progress jsonb,
  add column if not exists high_contrast boolean,
  add column if not exists monochrome boolean,
  add column if not exists coin_grant_5000_applied boolean;

create index if not exists users_auth0_sub_idx on public.users(auth0_sub);
create index if not exists users_review_client_updated_at_idx on public.users(review_client_updated_at);
create index if not exists users_login_status_idx on public.users(login_status);
create index if not exists users_color_theme_idx on public.users(color_theme);
create index if not exists users_manager_status_idx on public.users(manager_status);
create index if not exists users_manager_role_idx on public.users(manager_role);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.users'::regclass and conname = 'users_login_status_check'
  ) then
    alter table public.users
      add constraint users_login_status_check check (login_status in ('logged_out', 'guest', 'logged_in'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.users'::regclass and conname = 'users_review_coin_check'
  ) then
    alter table public.users
      add constraint users_review_coin_check check (review_coin >= 0);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.users'::regclass and conname = 'users_manager_role_check'
  ) then
    alter table public.users
      add constraint users_manager_role_check check (
        manager_role is null
        or manager_role in ('owner', 'developer', 'checker', 'system_designer', 'character_designer')
      );
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.users'::regclass and conname = 'users_manager_status_check'
  ) then
    alter table public.users
      add constraint users_manager_status_check check (manager_status in ('pending', 'approved', 'suspended'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.users'::regclass and conname = 'users_manager_approved_by_fkey'
  ) then
    alter table public.users
      add constraint users_manager_approved_by_fkey
      foreign key (manager_approved_by) references public.users(id) on delete set null;
  end if;
end $$;

update public.users as u
set
  nickname = coalesce(nullif(u.nickname, ''), nullif(u.display_name, ''), nullif(u.review_payload #>> '{auth,nickname}', ''), nullif(u.review_payload #>> '{auth,displayName}', '')),
  personal_data = case
    when jsonb_typeof(u.review_payload) = 'object' then coalesce(u.personal_data, '{}'::jsonb) || u.review_payload
    else coalesce(u.personal_data, '{}'::jsonb)
  end,
  review_period = jsonb_build_object(
    'loginDays',
    case
      when jsonb_typeof(u.login_days) = 'object' then u.login_days
      when jsonb_typeof(u.review_payload->'loginDays') = 'object' then u.review_payload->'loginDays'
      else coalesce(u.review_period->'loginDays', '{}'::jsonb)
    end,
    'dailyLoginRewardDays',
    case
      when jsonb_typeof(u.daily_login_reward_days) = 'object' then u.daily_login_reward_days
      when jsonb_typeof(u.review_payload->'dailyLoginRewardDays') = 'object' then u.review_payload->'dailyLoginRewardDays'
      else coalesce(u.review_period->'dailyLoginRewardDays', '{}'::jsonb)
    end
  ),
  todays_mission = case
    when jsonb_typeof(u.daily_try_records) = 'object' then u.daily_try_records
    when jsonb_typeof(u.review_payload->'dailyTryRecords') = 'object' then u.review_payload->'dailyTryRecords'
    else coalesce(u.todays_mission, '{}'::jsonb)
  end,
  review_data = case
    when jsonb_typeof(u.learning_progress) = 'object' then u.learning_progress
    when jsonb_typeof(u.review_payload->'learningProgress') = 'object' then u.review_payload->'learningProgress'
    when jsonb_typeof(u.review_payload->'progress') = 'object' then u.review_payload->'progress'
    when jsonb_typeof(u.review_payload->'noteProgress') = 'object' then u.review_payload->'noteProgress'
    else coalesce(u.review_data, '{}'::jsonb)
  end,
  color_theme = coalesce(nullif(u.color_theme, ''), nullif(u.review_payload #>> '{settings,theme}', '')),
  settings = case
    when jsonb_typeof(u.settings) = 'object' and u.settings <> '{}'::jsonb then
      u.settings - 'highContrast' - 'monochrome' - 'text' - 'notifications' - 'notificationTimeMinutes' - 'reviewPeriodNotifyMinutes'
    when jsonb_typeof(u.review_payload->'settings') = 'object' then
      (u.review_payload->'settings') - 'highContrast' - 'monochrome' - 'text' - 'notifications' - 'notificationTimeMinutes' - 'reviewPeriodNotifyMinutes'
    else coalesce(u.settings, '{}'::jsonb)
  end,
  education_codes = case
    when jsonb_typeof(u.education_codes) = 'array' and jsonb_array_length(u.education_codes) > 0 then u.education_codes
    when jsonb_typeof(u.review_payload #> '{settings,educationCodes}') = 'array' then u.review_payload #> '{settings,educationCodes}'
    else coalesce(u.education_codes, '[]'::jsonb)
  end,
  updated_at = coalesce(u.updated_at, now());

alter table if exists public.review_data
  add column if not exists storage_key text,
  add column if not exists payload jsonb not null default '{}'::jsonb,
  add column if not exists login_days jsonb not null default '{}'::jsonb,
  add column if not exists daily_login_reward_days jsonb not null default '{}'::jsonb,
  add column if not exists daily_try_records jsonb not null default '{}'::jsonb,
  add column if not exists learning_progress jsonb not null default '{}'::jsonb,
  add column if not exists login_status text not null default 'logged_out',
  add column if not exists is_logged_in boolean not null default false,
  add column if not exists auth_provider text,
  add column if not exists display_name text,
  add column if not exists nickname text,
  add column if not exists email text,
  add column if not exists color_theme text,
  add column if not exists high_contrast boolean,
  add column if not exists monochrome boolean,
  add column if not exists review_coin integer not null default 0,
  add column if not exists coin_grant_5000_applied boolean,
  add column if not exists has_unlimited_review_coins boolean not null default false,
  add column if not exists settings jsonb not null default '{}'::jsonb,
  add column if not exists education_codes jsonb not null default '[]'::jsonb,
  add column if not exists avater jsonb not null default '{}'::jsonb,
  add column if not exists equipped_avater jsonb not null default '{}'::jsonb,
  add column if not exists client_updated_at timestamptz,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if to_regclass('public.review_data') is not null then
    execute $migration$
update public.users as u
set
  personal_data = case
    when jsonb_typeof(rd.payload) = 'object' then coalesce(u.personal_data, '{}'::jsonb) || rd.payload
    else coalesce(u.personal_data, '{}'::jsonb)
  end,
  review_period = jsonb_build_object(
    'loginDays',
    case
      when jsonb_typeof(rd.login_days) = 'object' and rd.login_days <> '{}'::jsonb then rd.login_days
      when jsonb_typeof(rd.payload->'loginDays') = 'object' then rd.payload->'loginDays'
      else coalesce(u.review_period->'loginDays', '{}'::jsonb)
    end,
    'dailyLoginRewardDays',
    case
      when jsonb_typeof(rd.daily_login_reward_days) = 'object' and rd.daily_login_reward_days <> '{}'::jsonb then rd.daily_login_reward_days
      when jsonb_typeof(rd.payload->'dailyLoginRewardDays') = 'object' then rd.payload->'dailyLoginRewardDays'
      else coalesce(u.review_period->'dailyLoginRewardDays', '{}'::jsonb)
    end
  ),
  todays_mission = case
    when jsonb_typeof(rd.daily_try_records) = 'object' and rd.daily_try_records <> '{}'::jsonb then rd.daily_try_records
    when jsonb_typeof(rd.payload->'dailyTryRecords') = 'object' then rd.payload->'dailyTryRecords'
    else u.todays_mission
  end,
  review_data = case
    when jsonb_typeof(rd.learning_progress) = 'object' and rd.learning_progress <> '{}'::jsonb then rd.learning_progress
    when jsonb_typeof(rd.payload->'learningProgress') = 'object' then rd.payload->'learningProgress'
    when jsonb_typeof(rd.payload->'progress') = 'object' then rd.payload->'progress'
    when jsonb_typeof(rd.payload->'noteProgress') = 'object' then rd.payload->'noteProgress'
    else u.review_data
  end,
  login_status = case
    when rd.login_status in ('guest', 'logged_in') then rd.login_status
    when (rd.payload #>> '{auth,isLoggedIn}') = 'true' and (rd.payload #>> '{auth,provider}') = 'guest' then 'guest'
    when (rd.payload #>> '{auth,isLoggedIn}') = 'true' then 'logged_in'
    else u.login_status
  end,
  is_logged_in = coalesce(rd.is_logged_in, (rd.payload #>> '{auth,isLoggedIn}') = 'true', u.is_logged_in),
  auth_provider = coalesce(nullif(rd.auth_provider, ''), nullif(rd.payload #>> '{auth,provider}', ''), u.auth_provider),
  nickname = coalesce(nullif(rd.nickname, ''), nullif(rd.display_name, ''), nullif(rd.payload #>> '{auth,nickname}', ''), nullif(rd.payload #>> '{auth,displayName}', ''), u.nickname),
  email = coalesce(nullif(rd.email, ''), nullif(rd.payload #>> '{auth,email}', ''), u.email),
  color_theme = coalesce(nullif(rd.color_theme, ''), nullif(rd.payload #>> '{settings,theme}', ''), u.color_theme),
  review_coin = greatest(
    0,
    case
      when rd.review_coin > 0 then rd.review_coin
      when (rd.payload->>'reviewCoin') ~ '^[0-9]+(\.[0-9]+)?$' then floor((rd.payload->>'reviewCoin')::numeric)::integer
      else u.review_coin
    end
  ),
  has_unlimited_review_coins = coalesce(rd.has_unlimited_review_coins, false) or coalesce((rd.payload->>'hasUnlimitedReviewCoins') = 'true', false) or coalesce(u.has_unlimited_review_coins, false),
  settings = case
    when jsonb_typeof(rd.settings) = 'object' and rd.settings <> '{}'::jsonb then
      rd.settings - 'highContrast' - 'monochrome' - 'text' - 'notifications' - 'notificationTimeMinutes' - 'reviewPeriodNotifyMinutes'
    when jsonb_typeof(rd.payload->'settings') = 'object' then
      (rd.payload->'settings') - 'highContrast' - 'monochrome' - 'text' - 'notifications' - 'notificationTimeMinutes' - 'reviewPeriodNotifyMinutes'
    else u.settings
  end,
  education_codes = case
    when jsonb_typeof(rd.education_codes) = 'array' and jsonb_array_length(rd.education_codes) > 0 then rd.education_codes
    when jsonb_typeof(rd.payload #> '{settings,educationCodes}') = 'array' then rd.payload #> '{settings,educationCodes}'
    else u.education_codes
  end,
  avater = case
    when jsonb_typeof(rd.avater) = 'object' and rd.avater <> '{}'::jsonb then rd.avater
    when jsonb_typeof(rd.payload->'avater') = 'object' then rd.payload->'avater'
    when jsonb_typeof(rd.payload->'avatar') = 'object' then rd.payload->'avatar'
    else u.avater
  end,
  equipped_avater = case
    when jsonb_typeof(rd.equipped_avater) = 'object' and rd.equipped_avater <> '{}'::jsonb then rd.equipped_avater
    when jsonb_typeof(rd.payload #> '{avater,equipped}') = 'object' then rd.payload #> '{avater,equipped}'
    when jsonb_typeof(rd.payload #> '{avatar,equipped}') = 'object' then rd.payload #> '{avatar,equipped}'
    else u.equipped_avater
  end,
  review_client_updated_at = coalesce(rd.client_updated_at, u.review_client_updated_at),
  review_remote_updated_at = coalesce(rd.updated_at, u.review_remote_updated_at),
  updated_at = coalesce(greatest(u.updated_at, rd.updated_at), u.updated_at, rd.updated_at, now())
from public.review_data as rd
where rd.user_id = u.id
$migration$;
  end if;
end $$;

alter table if exists public.personal_data
  add column if not exists payload jsonb not null default '{}'::jsonb,
  add column if not exists client_updated_at timestamptz,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if to_regclass('public.personal_data') is not null then
    execute $migration$
update public.users as u
set
  personal_data = case
    when jsonb_typeof(pd.payload) = 'object' then coalesce(u.personal_data, '{}'::jsonb) || pd.payload
    else u.personal_data
  end,
  login_status = case
    when (pd.payload #>> '{auth,isLoggedIn}') = 'true' and (pd.payload #>> '{auth,provider}') = 'guest' then 'guest'
    when (pd.payload #>> '{auth,isLoggedIn}') = 'true' then 'logged_in'
    else u.login_status
  end,
  is_logged_in = coalesce((pd.payload #>> '{auth,isLoggedIn}') = 'true', u.is_logged_in),
  auth_provider = coalesce(nullif(pd.payload #>> '{auth,provider}', ''), u.auth_provider),
  nickname = coalesce(nullif(pd.payload #>> '{auth,nickname}', ''), nullif(pd.payload #>> '{auth,displayName}', ''), u.nickname),
  email = coalesce(nullif(pd.payload #>> '{auth,email}', ''), u.email),
  color_theme = coalesce(nullif(pd.payload #>> '{settings,theme}', ''), u.color_theme),
  review_coin = greatest(
    0,
    case
      when (pd.payload->>'reviewCoin') ~ '^[0-9]+(\.[0-9]+)?$' then floor((pd.payload->>'reviewCoin')::numeric)::integer
      else u.review_coin
    end
  ),
  has_unlimited_review_coins = coalesce((pd.payload->>'hasUnlimitedReviewCoins') = 'true', false) or coalesce(u.has_unlimited_review_coins, false),
  settings = case
    when jsonb_typeof(pd.payload->'settings') = 'object' then
      (pd.payload->'settings') - 'highContrast' - 'monochrome' - 'text' - 'notifications' - 'notificationTimeMinutes' - 'reviewPeriodNotifyMinutes'
    else u.settings
  end,
  education_codes = case
    when jsonb_typeof(pd.payload #> '{settings,educationCodes}') = 'array' then pd.payload #> '{settings,educationCodes}'
    else u.education_codes
  end,
  avater = case
    when jsonb_typeof(pd.payload->'avater') = 'object' then pd.payload->'avater'
    when jsonb_typeof(pd.payload->'avatar') = 'object' then pd.payload->'avatar'
    else u.avater
  end,
  equipped_avater = case
    when jsonb_typeof(pd.payload #> '{avater,equipped}') = 'object' then pd.payload #> '{avater,equipped}'
    when jsonb_typeof(pd.payload #> '{avatar,equipped}') = 'object' then pd.payload #> '{avatar,equipped}'
    else u.equipped_avater
  end,
  review_client_updated_at = coalesce(u.review_client_updated_at, pd.client_updated_at),
  review_remote_updated_at = coalesce(u.review_remote_updated_at, pd.updated_at),
  updated_at = coalesce(greatest(u.updated_at, pd.updated_at), u.updated_at, pd.updated_at, now())
from public.personal_data as pd
where pd.user_id = u.id
$migration$;
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
  drop column if exists display_name,
  drop column if exists review_storage_key,
  drop column if exists review_payload,
  drop column if exists login_days,
  drop column if exists daily_login_reward_days,
  drop column if exists daily_try_records,
  drop column if exists learning_progress,
  drop column if exists high_contrast,
  drop column if exists monochrome,
  drop column if exists coin_grant_5000_applied;

drop table if exists public.answers;
drop table if exists public.review_schedules;
drop table if exists public.review_data;
drop table if exists public.personal_data;
drop table if exists public.manager_members;
