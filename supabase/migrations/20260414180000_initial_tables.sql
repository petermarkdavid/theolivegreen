-- Harvest registrations + newsletter (see supabase/setup_tables.sql)
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
