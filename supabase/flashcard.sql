-- Supabase schema for Let's Review flashcards.
-- Run this in the Supabase SQL editor for the project used by api.the-review.net.

create extension if not exists pgcrypto;

create table if not exists public.flashcard (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  page_number integer not null default 1 check (page_number >= 1),
  question_number integer not null default 1 check (question_number >= 1),
  question_name text,
  question_text text,
  question_text_placement jsonb not null default '{"area":"right","order":10}'::jsonb,
  image text,
  image_placement jsonb not null default '{"area":"right","order":20}'::jsonb,
  "table" jsonb,
  table_placement jsonb not null default '{"area":"right","order":30}'::jsonb,
  graph jsonb,
  graph_placement jsonb not null default '{"area":"right","order":40}'::jsonb,
  three_options jsonb not null default '[]'::jsonb,
  answer text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists flashcard_subject_page_question_idx
  on public.flashcard (subject, page_number, question_number);

create index if not exists flashcard_subject_idx
  on public.flashcard (subject);

alter table public.flashcard enable row level security;

drop policy if exists "Service role can manage flashcard" on public.flashcard;
create policy "Service role can manage flashcard"
  on public.flashcard
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

