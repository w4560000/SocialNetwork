﻿# Build Docker Image 
```
docker build -t socialnetwork --build-arg ProjectName=SocialNetwork --no-cache .

# run with appsettings.json 
docker run -d -it --env-file ./.env.list -p 7000:80 socialnetwork
```

# Run Docker Composes
```
docker-compose build --no-cache
docker-compose up -e ASPNETCORE_ENVIRONMENT=Production -d
```



## 服務

|  服務			| Port號				|
|  ----			| ----				|
| SocialNetwork	| localhost:7000	|
| MSSQL			| localhost:2500	|
| Redis			| localhost:6379	|
| PostgreSQL	| localhost:5432	|
| pgadmin4		| localhost:5050	|

### MSSQL Volumn
|  本地路徑			| 容器內路徑				| 用途				|
|  ----				| ----					| ----				|
| ./MSSQL/data		| /var/opt/mssql/data	| 資料庫檔案持久化 避免資料遺失 (.mdf、.ldf)	|
| ./MSSQL/backup	| /var/opt/mssql/backup	| 容器啟動前 會還原此資料夾內的備份檔	|
| ./MSSQL/script	| /var/opt/mssql/script	| 容器啟動前 會執行此資料夾內的sql檔 <br> (若要 initial data，可撰寫放入此資料夾)	|

## 開發注意事項

- npm install後，build Gulp Task installLib 會將 node_modules 指定的第三方套件 搬移至 wwwroot/lib 底下
- 暫時停用 (bundleconfig.json，build Gulp 才會 bundle min.js、min.css)
