create table plans (
  id bigint primary key generated always as identity,
  name text not null,
  planned_value numeric(10,2) not null,
  current_value numeric(10,2) not null default 0,
  finished boolean not null default false,
  due_date date,
  user_id text not null
)