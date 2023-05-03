create or replace function get_category_suggestions_by_user_id(p_user_id text) returns setof text as $$
  select distinct category from transactions where user_id = p_user_id;
$$ language sql;