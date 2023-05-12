create type transaction_count_by_recurrence as (
  recurrence text,
  count integer
);

create or replace function get_transactions_count_by_recurrence(
  p_user_id text,
  p_from_date date,
  p_to_date date,
  p_transaction_type text
) returns setof transaction_count_by_recurrence as $$
  select recurrence, count(id) as count
  from transactions
  where user_id = p_user_id
  and due_date >= p_from_date
  and due_date < p_to_date
  and type = p_transaction_type
  and (
    (recurrence in ('INSTALLMENT', 'FIXED') and id_original_transaction is not null)
    or (recurrence = 'UNIQUE' and id_original_transaction is null)
  )
  group by recurrence
  order by 2 desc;
$$ language sql;
