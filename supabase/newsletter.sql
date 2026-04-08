-- Run in Supabase → SQL Editor (once per project)
-- Inserts should come from an Edge Function or server route (service role), not from the browser with anon key.

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  source text,
  client_created_at timestamptz
);

-- One row per email (case-insensitive; adjust if you need full signup history per email)
create unique index if not exists newsletter_subscribers_email_lower_idx
  on public.newsletter_subscribers (lower(email));

create index if not exists newsletter_subscribers_created_at_idx
  on public.newsletter_subscribers (created_at desc);

comment on table public.newsletter_subscribers is 'Newsletter signups from the site';

alter table public.newsletter_subscribers enable row level security;

-- No policies for anon/authenticated: only the service role (Edge Function / server) can insert/select.
