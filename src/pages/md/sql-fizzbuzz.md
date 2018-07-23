---
title: "SQL - FizzBuzz"
path: "/blog/sql-fizzbuzz"
---
# SQL - FizzBuzz

```sql
declare @start int=0
declare @finish int = 100
;
with gen as
(
	select @start as num
	union all
	select num + 1 from gen where num + 1 <= @finish
)
select num, (
	case 
		when (num % 15) = 0 then 'FizzBuzz'
		when (num % 3) = 0 then 'Fizz' 
		when (num % 5) = 0 then 'Buzz' 
		else convert(varchar(2), num)
	end
) fb
from gen 
