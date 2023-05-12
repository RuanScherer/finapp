create type spent_amount_by_category as (
  category text,
  amount numeric
);

create or replace function get_spent_amount_by_category(
  p_user_id text,
  p_from_date date,
  p_to_date date
) returns setof spent_amount_by_category as $$
  select category, sum(amount) as amount
  from transactions
  where user_id = p_user_id
  and due_date >= p_from_date
  and due_date < p_to_date
  and type = 'OUTCOME'
  and (
    (recurrence in ('INSTALLMENT', 'FIXED') and id_original_transaction is not null)
    or (recurrence = 'UNIQUE' and id_original_transaction is null)
  )
  group by category
  order by 2 desc
  limit 5;
$$ language sql;
