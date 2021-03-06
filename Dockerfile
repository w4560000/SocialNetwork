FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
ARG ProjectName
WORKDIR /app

COPY $ProjectName/*.csproj ./$ProjectName/
COPY $ProjectName.Service/*.csproj ./$ProjectName.Service/
COPY $ProjectName.Repository/*.csproj ./$ProjectName.Repository/
COPY $ProjectName.Repository.Base/*.csproj ./$ProjectName.Repository.Base/
COPY $ProjectName.Helper/*.csproj ./$ProjectName.Helper/

WORKDIR /app/$ProjectName
RUN dotnet restore 

WORKDIR /app
COPY $ProjectName/. ./$ProjectName/
COPY $ProjectName.Service/. ./$ProjectName.Service/
COPY $ProjectName.Repository/. ./$ProjectName.Repository/
COPY $ProjectName.Repository.Base/. ./$ProjectName.Repository.Base/
COPY $ProjectName.Helper/. ./$ProjectName.Helper/

WORKDIR /app/$ProjectName/
RUN dotnet publish -c Release -o /app/$ProjectName/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS runtime
ARG ProjectName

WORKDIR /app
COPY --from=build /app/$ProjectName/publish .

ENV ProjectDll="${ProjectName}.dll"
ENTRYPOINT dotnet $ProjectDll