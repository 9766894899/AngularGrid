MERGE INTO table_a a
USING (
    SELECT userid, username 
    FROM table_b 
    WHERE username IS NOT NULL
) b
ON (a.userid = b.userid)
WHEN MATCHED THEN 
    UPDATE SET a.newusername = b.username
WHEN NOT MATCHED THEN 
    INSERT (userid, newusername)
    VALUES (b.userid, b.username);
