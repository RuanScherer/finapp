create or replace function get_transactions_by_month(
  p_user_id text,
  p_from_date date,
  p_to_date date
) returns setof transactions as $$
  select *
  from transactions
  where user_id = p_user_id
  and due_date >= p_from_date
  and due_Date < p_to_date
  and (
    (recurrence in ('INSTALLMENT', 'FIXED') and id_original_transaction is not null)
    or (recurrence = 'UNIQUE' and id_original_transaction is null)
  )
  order by status asc, type asc;
$$ language sql;