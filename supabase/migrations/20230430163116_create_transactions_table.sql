create table if not exists transactions (
  id bigint primary key generated always as identity,
  name text not null,
  amount numeric(10, 2) not null,
  type text not null,
  category text not null,
  payment_method text not null,
  recurrence text not null,
  due_date date not null,
  status text not null,
  installment_amount int,
  installment_number int,
  id_original_transaction bigint references transactions(id) on delete cascade,
  user_id text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
)