create table plan_deposits (
  id bigint primary key generated always as identity,
  value numeric(10,2) not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  plan_id bigint not null references plans(id) on delete cascade
)