#!/bin/sh

# Launch MSSQL and send to background
/opt/mssql/bin/sqlservr &
pid=$!
# Wait for it to be available
echo "Waiting for MS SQL to be available ⏳"

# 1. 確認服務是否啟動
/opt/mssql-tools/bin/sqlcmd -l 30 -S localhost -h-1 -V1 -U sa -P ${SA_PASSWORD} -Q "SET NOCOUNT ON SELECT N'MS SQL is available 🔥' , @@servername"
is_up=$?
while [ $is_up -ne 0 ] ; do 
    echo -e $(date) 
    /opt/mssql-tools/bin/sqlcmd -l 30 -S localhost -h-1 -V1 -U sa -P ${SA_PASSWORD} -Q "SET NOCOUNT ON SELECT N'MS SQL is available 🔥' , @@servername"
    is_up=$?
    sleep 5 
done

# 2. 還原 Database
for restoreFile in /var/opt/mssql/backup/*.bak
do
    fileName=${restoreFile##*/}
    database=${fileName%.bak}
    
    echo "Ready to restore ${restoreFile}";
    touch /var/opt/mssql/data/${database}.mdf
    touch /var/opt/mssql/data/${database}_Log.ldf
    /opt/mssql-tools/bin/sqlcmd -U SA -P ${SA_PASSWORD} -Q "
    RESTORE DATABASE [${database}] FROM DISK = '${restoreFile}' WITH REPLACE, MOVE '${database}' TO '/var/opt/mssql/data/${database}.mdf', MOVE '${database}_Log' TO '/var/opt/mssql/data/${database}_Log.ldf'"
    echo "Restore ${restoreFile} completed successfully 👍";
done

# 3. 執行預設 Script
for foo in /var/opt/mssql/script/*.sql
do 
    echo "Ready to execute ${foo}";
    /opt/mssql-tools/bin/sqlcmd -U sa -P ${SA_PASSWORD} -l 30 -e -i ${foo}
    echo "Execute ${foo} completed successfully 🌳";
done

# Wait on the sqlserver process
wait $pid