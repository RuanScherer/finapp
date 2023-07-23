create or replace function get_pending_installments_by_transaction(
  p_user_id text,
  p_transaction_type text
) returns setof pending_installments_by_transaction as $$
  select name, installment_amount, pending_installment_amount
  from v_pending_installments_by_transaction
  where user_id = p_user_id
  and type = p_transaction_type
  and pending_installment_amount > 0;
$$ language sql;