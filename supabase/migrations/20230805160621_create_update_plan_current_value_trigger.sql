create or replace function update_plan_current_value() returns trigger as $$
declare
  v_total_plan_deposits numeric(10,2);
  v_plan_id bigint;
begin
  if (TG_OP = 'DELETE') then
    v_plan_id = old.plan_id;
  else
    v_plan_id = new.plan_id;
  end if;

  select  sum(value)
  into    v_total_plan_deposits
  from    plan_deposits
  where   plan_id = v_plan_id;

  update  plans
  set     current_value = v_total_plan_deposits
  where   id = v_plan_id;

  return null;
end;
$$ language plpgsql;

create trigger update_plan_current_value
  after insert or update or delete on plan_deposits
  for each row
  execute procedure update_plan_current_value();
