create table if not exists allowed_users (
  id bigint primary key generated always as identity,
  email text not null
);
