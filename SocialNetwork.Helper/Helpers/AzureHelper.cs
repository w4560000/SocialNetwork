using Microsoft.Azure.KeyVault;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork.Helper
{
    /// <summary>
    /// AzureHelper
    /// </summary>
    public static class AzureHelper
    {
        /// <summary>
        /// Defines the Lazy CloudBlobContainer
        /// </summary>
        private static readonly Lazy<CloudBlobContainer> CloudBlobContainer = new Lazy<CloudBlobContainer>(() => {
            string connectionString = GetAzureSecretVaule("bxStorage");

            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(connectionString);
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            return blobClient.GetContainerReference(BxAPIStorageContainerName);
        });

        /// <summary>
        /// 帳號大頭貼Azure儲存體容器名稱
        /// </summary>
        private static string BxAPIStorageContainerName => "social-network";

        /// <summary>
        /// Azure Storage URL
        /// </summary>
        public static string BxStorageURL => "https://bingxiangstorage.blob.core.windows.net/";

        /// <summary>
        /// 取得AzureSecret
        /// </summary>
        /// <param name="secretName">secretName</param>
        /// <returns>SecretVaule</returns>
        public static string GetAzureSecretVaule(string secretName)
        {
            KeyVaultClient keyVaultClient = new KeyVaultClient(
                new KeyVaultClient.AuthenticationCallback(new AzureServiceTokenProvider().KeyVaultTokenCallback));

            string connectionString = keyVaultClient.GetSecretAsync("https://bingxiangKeyvault.vault.azure.net/", secretName).Result.Value;

            return connectionString;
        }

        /// <summary>
        /// 上傳圖檔
        /// </summary>
        /// <param name="directory">Azure Blob 儲存體資料夾</param>
        /// <param name="photoFileDto">圖檔 Dto</param>
        /// <returns>上傳結果</returns>
        public static async Task UpLoadImageAsync(AzureBlobDirectoryEnum directory, PhotoFileDto photoFileDto)
        {
            // 刪除相同檔名檔案
            SystemHelper.AllowFileExtensions.ForEach(f => GetAzureCloudBlobDirectory(directory).GetBlockBlobReference(photoFileDto.FileName + f).DeleteIfExistsAsync());

            CloudBlockBlob cloudBlockBlob = GetAzureCloudBlobDirectory(directory).GetBlockBlobReference(photoFileDto.FileName + photoFileDto.FileExtension);

            await cloudBlockBlob.UploadFromByteArrayAsync(photoFileDto.FileByte, 0, photoFileDto.FileByte.Length);

            // 設定 ContentType
            cloudBlockBlob.Properties.ContentType = GetContentType(photoFileDto.FileExtension);
            await cloudBlockBlob.SetPropertiesAsync();
        }

        /// <summary>
        /// 取得圖片網址
        /// </summary>
        /// <param name="directory">Azure Blob 儲存體資料夾</param>
        /// <param name="photoFileDto">圖檔 Dto</param>
        /// <returns>圖片網址</returns>
        public static string GetImage(AzureBlobDirectoryEnum directory, PhotoFileDto photoFileDto)
        {
            return $"{BxAPIStorageContainerName}/{directory}/{photoFileDto.FileName}{photoFileDto.FileExtension}";
        }

        /// <summary>
        /// 取得存取帳號大頭貼AzureStorage實體
        /// </summary>
        /// <param name="directory">Azure Blob 儲存體資料夾</param>
        /// <returns>AzureStorage實體</returns>
        private static CloudBlobDirectory GetAzureCloudBlobDirectory(AzureBlobDirectoryEnum directory)
        {
            return CloudBlobContainer.Value.GetDirectoryReference(directory.ToString());
        }


        /// <summary>
        /// 取得ContentType
        /// </summary>
        /// <param name="fileExtension">檔案副檔名</param>
        /// <returns>ContentType</returns>
        private static string GetContentType(string fileExtension)
        {
            string extension = fileExtension.Split('.').Last();

            return extension.Contains("svg") ? $"image/{extension}+xml" : $"image/{extension}";
        }
    }
}