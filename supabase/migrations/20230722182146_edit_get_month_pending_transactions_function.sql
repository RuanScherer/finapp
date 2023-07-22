drop function if exists get_month_pending_transactions(text, date, date);
drop type pending_transaction;

create type pending_transaction as (
  id bigint,
  name text,
  amount numeric,
  category text,
  type text,
  id_original_transaction bigint,
  installment_number int,
  installment_amount int
);

create or replace function get_month_pending_transactions(
  p_user_id text,
  p_from_date date,
  p_to_date date
) returns setof pending_transaction as $$
  select id, name, amount, category, type, id_original_transaction, installment_number, installment_amount
  from transactions
  where user_id = p_user_id
  and due_date >= p_from_date
  and due_Date < p_to_date
  and status = 'PENDING'
  and (
    (recurrence in ('INSTALLMENT', 'FIXED') and id_original_transaction is not null)
    or (recurrence = 'UNIQUE' and id_original_transaction is null)
  )
  order by due_date asc
  limit 10;
$$ language sql;