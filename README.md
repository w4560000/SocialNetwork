網站Demo: https://ls.ikkon.online

# 功能

1. 會員
   * 新會員註冊、登入
   * Google第三方登入 (目前無法使用，Google OAuth 審核中)
   * 忘記密碼
     * 填寫註冊時帳號、信箱
     * 收取驗證信，點擊驗證信內容的連結來變更密碼
2. 基本功能
   * TopBar - 搜尋會員
   * Menu - 顯示個人資訊、修改在線狀態、切換頁面、登出
     * 切換功能 
       * 首頁 - 發佈貼文、查看自己、好友貼文
       * 個人主頁 - 查看個人資訊、發佈貼文、查看自己貼文
       * 帳號設定 - 更換主頁背景、更換大頭貼、修改暱稱、修改個人資訊(生日、興趣、工作、學歷)、密碼變更
       * 好友管理
         * 我的好友 - 查看目前好友、移除好友
         * 好友邀請 - 查看收到的好友邀請 (拒絕 or 接受)
         * 您送出的好友邀請 - 查看送出的好友邀請 (可收回)
3. 右上預計放置廣告圖，目前先以圖檔代替
4. 好友列表 - 可查看目前好友在線狀態 (目前好友在線狀態有串SingalR，故可即時更新)

## todo
* TopBar - 新增聊天室查詢、通知 (當有好友邀請、貼完按讚 SingalR 即時通知)
* 聊天室 - 點擊好友列表的好友，彈出聊天室 即時互動

# Build Docker Image 
```
docker build -t socialnetwork --build-arg ProjectName=SocialNetwork --no-cache .

# run with appsettings.json 
docker run --network=socialnetwork_default -d -it --env-file .env -p 7000:80 socialnetwork
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
