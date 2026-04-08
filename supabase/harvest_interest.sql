-- Run in Supabase → SQL Editor (once per project)
-- Inserts come from the Edge Function `harvest-interest` (service role), not from the browser.

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

comment on table public.harvest_interest is 'Harvest 2026 interest form submissions (from api/harvest-interest)';

alter table public.harvest_interest enable row level security;

-- No policies for anon/authenticated: only the service role (server) can insert/select.
-- To view rows in the Supabase dashboard Table Editor, use the service role or add a policy for your staff auth later.
