create type pending_installments_by_transaction as (
  name text,
  installment_amount integer,
  pending_installment_amount integer
);

create or replace function get_pending_installments_by_transaction(
  p_user_id text,
  p_from_date date,
  p_to_date date,
  p_transaction_type text
) returns setof pending_installments_by_transaction as $$
  select
    name,
    installment_amount,
    (
      select count(id)
      from transactions
      where id_original_transaction = t.id
      and status = 'PENDING'
    ) as pending_installment_amount
  from transactions t
  where user_id = p_user_id
  and due_date >= p_from_date
  and due_date < p_to_date
  and type = p_transaction_type
  and recurrence = 'INSTALLMENT'
  and id_original_transaction is null
  group by id;
$$ language sql;
