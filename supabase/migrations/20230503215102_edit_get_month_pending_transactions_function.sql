create or replace function get_month_pending_transactions(
  p_user_id text,
  p_from_date date,
  p_to_date date
) returns setof pending_transaction as $$
  select id, name, amount, category, type
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