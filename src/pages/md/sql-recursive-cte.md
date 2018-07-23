---
title: "SQL recursive CTE"
path: "/blog/sql-recursive-cte"
---
# SQL recursive CTE

The general syntax for a recursive CTE is:

```sql
WITH cte_name (column1, column2, …)</div>
AS
(
	cte_query_definition -- Anchor member</div>
	UNION ALL
	cte_query_definition -- Recursive member; references cte_name.</div>
)
-- Statement using the CTE</div>
SELECT *
FROM cte_name
with cte as
(
	select id, lastname, 0 as lev from dbo.Employee where ReportsTo is null
	union all
	select e.id, e.lastname, lev + 1 from dbo.Employee e join cte
	on e.ReportsTo = cte.ID
)
select lastname, lev from cte
