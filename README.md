# 網站簡介

https://ls.ikkon.app  
練習用社群網站，僅有基礎功能，尚缺及時通知、聊天室功能

專案透過 .Net Core MVC 、API 建置，版本為 .Net Core 3.1，SQL Server、Redis 協助儲存資料  
前端頁面以 .Net Core MVC Action 為進入點，透過 Razor 提供畫面，部分畫面 由 JQuery 動態操作DOM  
透過 NPM 下載第三方套件、Typescript 撰寫 JQuery語法，並自動編譯成 Javascript  
撰寫 Scss 透過 VS 的擴充工具 (Web Compiler 2022+) 來自動編譯成 css  
最後由 Gulp 來協助整合套件 

|  Gulp Task			| 說明				|
|  ----			| ----				|
| installLib	| 將 node_modules 底下部分所需套件 移至 wwwroot/lib |
| minJs			| 將 bundleconfig.json 設定要 bundle 的 .js檔 壓縮成 .min.js檔	|
| minCss		| 將 bundleconfig.json 設定要 bundle 的 .css檔 壓縮成 .min.css檔	|
| clean		| 清除 .min.js檔、.min.css檔	|


後端透過 API 提供服務
API 可參考 https://ls.ikkon.app/swagger/index.html  
以 JWT 當作登入驗證 Token，來判別登入狀態、是否過期

|  使用的雲服務			| 說明				|
|  ----			| ----				|
| GCP GCE	| 由單一台 Linux VM 透過 docker-compose 建置該網站 |
| GCP Load Balancing			| 協助掛載 HTTPS 憑證並轉導至 GCE	|
| GCP Cloud DNS			| 設定 ls.ikkon.app 對應至 GCP Load Balancing IP	|
| GCP Cloud Domains	| 新增 domain ls.ikkon.app	|
| Google OAuth		| 提供會員透過Google第三方登入	|
| Azure Key Vault		| 協助保存機密連線字串	|
| Azure Blob Storage		| 用以儲存圖檔 (大頭貼、個人背景圖、貼文圖檔)	|

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
3. 貼文功能
   * 可發佈文字、最多十張圖片的貼文
   * 貼文按讚、留言功能
4. 右上預計放置廣告圖，目前先以圖檔代替
5. 好友列表 - 可查看目前好友在線狀態 (目前好友在線狀態有串SingalR，故可即時更新)

## todo
* TopBar - 新增聊天室查詢、通知 (當有好友邀請、貼完按讚 SingalR 即時通知)
* 聊天室 - 點擊好友列表的好友，彈出聊天室 即時互動

# 前置
```
sudo chmod +x /home/leozheng0411/SocialNetwork/MSSQL/entrypoint.sh
```

# Run Docker Composes
```
docker-compose build --no-cache
docker-compose up -d
```

# Build Docker Image 
```
docker build -t socialnetwork --build-arg ProjectName=SocialNetwork --no-cache .

# run with appsettings.json 
docker run --network=socialnetwork_default -d -it --env-file .env -p 7000:80 socialnetwork
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

- 若有更新 bundleconfig.json，記得重新 build Gulp 才會 bundle min.js、min.css
- npm install後，build Gulp Task installLib 會將 node_modules 指定的第三方套件 搬移至 wwwroot/lib 底下
