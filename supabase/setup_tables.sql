-- =============================================================================
-- Run this ENTIRE file in Supabase → SQL Editor (no text selected), then Run.
-- Use the same project as your app (check URL: project-ref in dashboard URL).
-- =============================================================================

-- Harvest registrations
create table if not exists public.harvest_interest (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  email text not null,
  guest_count integer not null check (guest_count >= 1),
  notes text,
  source text,
  client_created_at timestamptz
);

create index if not exists harvest_interest_created_at_idx on public.harvest_interest (created_at desc);
create index if not exists harvest_interest_email_idx on public.harvest_interest (email);

comment on table public.harvest_interest is 'Harvest interest form submissions (Edge Function harvest-interest)';

alter table public.harvest_interest enable row level security;

-- Newsletter signups
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  source text,
  client_created_at timestamptz
);

create unique index if not exists newsletter_subscribers_email_lower_idx
  on public.newsletter_subscribers (lower(email));

create index if not exists newsletter_subscribers_created_at_idx
  on public.newsletter_subscribers (created_at desc);

comment on table public.newsletter_subscribers is 'Newsletter signups from the site';

alter table public.newsletter_subscribers enable row level security;

-- =============================================================================
-- Verification: you should see EXACTLY 2 rows below (if 0 rows, tables were not created in this database).
-- =============================================================================
select table_schema, table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in ('harvest_interest', 'newsletter_subscribers')
order by table_name;
