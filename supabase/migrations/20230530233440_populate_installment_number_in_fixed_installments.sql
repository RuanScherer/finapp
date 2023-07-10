do
$do$
declare
  v_id_transaction      bigint;
  v_id_installment      bigint;
  v_installment_number  int := 1;

  c_fixed_transactions cursor for
    select  id
    from    transactions
    where   recurrence              in ('INSTALLMENT', 'FIXED')
    and     id_original_transaction is null;
  c_fixed_installments cursor (p_id_transaction bigint) for
    select    id
    from      transactions
    where     recurrence              in ('INSTALLMENT', 'FIXED')
    and       id_original_transaction = p_id_transaction
    order by  due_date asc;
begin
  open c_fixed_transactions;
  loop fetch c_fixed_transactions into v_id_transaction;
    exit when not found;

    open c_fixed_installments(v_id_transaction);
    loop fetch c_fixed_installments into v_id_installment;
      exit when not found;

      update  transactions
      set     installment_number = v_installment_number
      where   id = v_id_installment;

      v_installment_number := v_installment_number + 1;
    end loop;
    close c_fixed_installments;

    v_installment_number := 1;
  end loop;
  close c_fixed_transactions;
end
$do$;