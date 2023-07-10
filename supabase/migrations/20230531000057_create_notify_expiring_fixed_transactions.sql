create or replace procedure notify_expiring_fixed_transactions() as $$
  declare
    v_id_existing_notification  bigint;
    v_transaction_id            bigint;
    v_transaction_name          text;
    v_transaction_user_id       text;

    c_expiring_fixed_transactions cursor for
      select    id, name, user_id
      from      transactions
      where     recurrence = 'FIXED'
      and       id_original_transaction is not null
      and       installment_number = 12
      and       date_trunc('month', due_date::date) = date_trunc('month', CURRENT_DATE)
      order by  due_date asc;
  begin
    open c_expiring_fixed_transactions;
    loop fetch c_expiring_fixed_transactions into v_transaction_id, v_transaction_name, v_transaction_user_id;
      exit when not found;

      select id into v_id_existing_notification
      from notifications
      where transaction_id = v_transaction_id
      and category = 'EXPIRING_FIXED_TRANSACTION'
      limit 1;

      if v_id_existing_notification is not null then
        continue;
      end if;

      insert into notifications (title, content, category, transaction_id, user_id) values (
        'Transação fixa prestes a vencer',
        'A sua transação fixa ' || v_transaction_name || ' vence esse mês. Para continuar com ela você precisa recadastrá-la.',
        'EXPIRING_FIXED_TRANSACTION',
        v_transaction_id,
        v_transaction_user_id
      );
    end loop;
    close c_expiring_fixed_transactions;
  end
$$ language plpgsql;
