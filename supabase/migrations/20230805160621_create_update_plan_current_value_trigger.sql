create or replace function update_plan_current_value_and_status_on_plan_deposits() returns trigger as $$
declare
  v_total_plan_deposits numeric(10,2);
  v_plan_planned_value numeric(10,2);
  v_plan_finished boolean;
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

  if (v_total_plan_deposits is null) then
    v_total_plan_deposits = 0;
  end if;

  update  plans
  set     current_value = v_total_plan_deposits
  where   id = v_plan_id;

  select  planned_value, finished
  into    v_plan_planned_value, v_plan_finished
  from    plans
  where   id = v_plan_id;

  if (v_total_plan_deposits >= v_plan_planned_value and v_plan_finished = false) then
    update  plans
    set     finished = true
    where   id = v_plan_id;
  elsif (v_total_plan_deposits < v_plan_planned_value and v_plan_finished = true) then
    update  plans
    set     finished = false
    where   id = v_plan_id;
  end if;

  return null;
end;
$$ language plpgsql;

create trigger update_plan_current_value_and_status_on_plan_deposits
  after insert or update or delete on plan_deposits
  for each row
  execute procedure update_plan_current_value_and_status_on_plan_deposits();

create or replace function update_plan_current_value_and_status_on_plans() returns trigger as $$
declare
  v_total_plan_deposits numeric(10,2);
  v_plan_planned_value numeric(10,2);
  v_plan_finished boolean;
  v_plan_id bigint;
begin
  v_plan_id = new.id;

  select  sum(value)
  into    v_total_plan_deposits
  from    plan_deposits
  where   plan_id = v_plan_id;

  if (v_total_plan_deposits is null) then
    v_total_plan_deposits = 0;
  end if;

  NEW.current_value = v_total_plan_deposits;

  select  planned_value, finished
  into    v_plan_planned_value, v_plan_finished
  from    plans
  where   id = v_plan_id;

  if (v_total_plan_deposits >= v_plan_planned_value and v_plan_finished = false) then
    NEW.finished = true;
  elsif (v_total_plan_deposits < v_plan_planned_value and v_plan_finished = true) then
    NEW.finished = false;
  end if;

  return null;
end;
$$ language plpgsql;

create trigger update_plan_current_value_and_status_on_plans
  after update on plans
  for each row
  execute procedure update_plan_current_value_and_status_on_plans();
