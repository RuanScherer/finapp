create or replace function get_month_pendencies(
  p_user_id text,
  p_type text,
  p_from_date date,
  p_to_date date
) returns numeric(10, 2) as $$
  select sum(amount)
  from transactions
  where user_id = p_user_id
  and type = p_type
  and due_date >= p_from_date
  and due_Date < p_to_date
  and status = 'PENDING'
  and (
    (recurrence in ('INSTALLMENT', 'FIXED') and id_original_transaction is not null)
    or (recurrence = 'UNIQUE' and id_original_transaction is null)
  );
$$ language sql;