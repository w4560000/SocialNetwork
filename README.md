# Build Docker Image 
```
docker build -t socialnetwork --build-arg ProjectName=SocialNetwork --no-cache .

# run with appsettings.json 
docker run -d --rm --name socialnetwork.container -p 7000:80 socialnetwork
```

# Run Docker Composes
```
docker-compose build --no-cache
docker-compose up -d
```



## 服務

|  服務   | Port號  |
|  ----  | ----  |
| SocialNetwork  | localhost:7000 |
| Redis  | localhost:6379 |
| PostgreSQL  | localhost:5432 |
| pgadmin4  | localhost:5050 |


## 開發注意事項

- 若有更新 bundleconfig.json，記得重 build Gulp 才會 bundle .js、.css
