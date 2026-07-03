create extension if not exists pgcrypto;

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  package_id integer not null,
  package_code text not null,
  package_name text not null,
  full_name text not null,
  phone text not null,
  email text not null,
  university text not null,
  study_year text,
  source text not null default 'direct',
  consent boolean not null check (consent = true),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'confirmed', 'declined')),
  created_at timestamptz not null default now()
);

create index if not exists reservations_created_at_idx
  on public.reservations (created_at desc);
create index if not exists reservations_package_code_idx
  on public.reservations (package_code);
create index if not exists reservations_email_idx
  on public.reservations (lower(email));

create table if not exists public.host_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  course text not null,
  study_year text not null,
  social_media text,
  group_size integer not null check (group_size between 1 and 500),
  destinations text[] not null default '{}',
  motivation text not null,
  source text not null default 'direct',
  consent boolean not null check (consent = true),
  status text not null default 'new'
    check (status in ('new', 'reviewing', 'approved', 'declined')),
  created_at timestamptz not null default now()
);

create index if not exists host_applications_created_at_idx
  on public.host_applications (created_at desc);
create index if not exists host_applications_email_idx
  on public.host_applications (lower(email));

alter table public.reservations enable row level security;
alter table public.host_applications enable row level security;

-- There are intentionally no public table policies.
-- All reads and writes go through validated Next.js server routes using the
-- server-only service role key. Never expose that key in browser code.
