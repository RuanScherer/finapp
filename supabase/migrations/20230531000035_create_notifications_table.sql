create table if not exists notifications(
  id bigint primary key generated always as identity,
  title text not null,
  content text not null,
  read boolean default false,
  category text not null,
  transaction_id bigint references transactions(id) on delete cascade,
  user_id text,
  created_at date not null default timezone('utc'::text, now())
)
