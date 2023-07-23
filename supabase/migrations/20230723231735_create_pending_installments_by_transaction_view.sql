create view v_pending_installments_by_transaction as
select
  name,
  installment_amount,
  (
    select count(id)
    from transactions
    where id_original_transaction = t.id
    and status = 'PENDING'
  ) as pending_installment_amount,
  user_id,
  type
from transactions t
where recurrence = 'INSTALLMENT'
and id_original_transaction is null
group by id;