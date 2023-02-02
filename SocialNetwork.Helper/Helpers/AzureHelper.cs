using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.Azure.KeyVault;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
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
        /// CloudBlobDirectoryDI
        /// </summary>
        private static Dictionary<AzureBlobDirectoryEnum, CloudBlobDirectory> CloudBlobDirectoryDI;

        /// <summary>
        /// 帳號大頭貼Azure儲存體容器名稱
        /// </summary>
        private static string BxAPIStorageContainerName { get; set; }

        /// <summary>
        /// 初始化
        /// </summary>
        /// <param name="storageContainerName">容器名稱</param>
        public static void Init(string storageContainerName)
        {
            BxAPIStorageContainerName = storageContainerName;

            CloudBlobDirectoryDI = new Dictionary<AzureBlobDirectoryEnum, CloudBlobDirectory>()
            {
                { AzureBlobDirectoryEnum.ProfilePhoto, CloudBlobContainer.Value.GetDirectoryReference(AzureBlobDirectoryEnum.ProfilePhoto.ToString()) },
                { AzureBlobDirectoryEnum.BackgoundPhoto, CloudBlobContainer.Value.GetDirectoryReference(AzureBlobDirectoryEnum.BackgoundPhoto.ToString()) },
                { AzureBlobDirectoryEnum.PostPhoto, CloudBlobContainer.Value.GetDirectoryReference(AzureBlobDirectoryEnum.PostPhoto.ToString()) }
            };
        }

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
            //KeyVaultClient keyVaultClient = new KeyVaultClient(
            //    new KeyVaultClient.AuthenticationCallback(new AzureServiceTokenProvider().KeyVaultTokenCallback));

            var client = new SecretClient(new Uri("https://bingxiangKeyvault.vault.azure.net"), new DefaultAzureCredential());
            string connectionString = client.GetSecretAsync(secretName).Result.Value.Value;

            return connectionString;
        }

        /// <summary>
        /// 上傳圖檔
        /// </summary>
        /// <param name="directory">Azure Blob 儲存體資料夾</param>
        /// <param name="photoFileDto">圖檔 Dto</param>
        public static async Task UpLoadImageAsync(AzureBlobDirectoryEnum directory, PhotoFileDto photoFileDto)
        {
            // 刪除相同檔名檔案
            List<string> imagePathList = new List<string>();
            SystemHelper.AllowFileExtensions.ForEach(f => imagePathList.Add(photoFileDto.FileName + f));
            await DeleteImageAsync(directory, imagePathList);

            CloudBlockBlob cloudBlockBlob = GetAzureCloudBlobDirectory(directory).GetBlockBlobReference(photoFileDto.FileName + photoFileDto.FileExtension);

            await cloudBlockBlob.UploadFromByteArrayAsync(photoFileDto.FileByte, 0, photoFileDto.FileByte.Length);

            // 設定 ContentType
            cloudBlockBlob.Properties.ContentType = GetContentType(photoFileDto.FileExtension);
            await cloudBlockBlob.SetPropertiesAsync();
        }

        /// <summary>
        /// 刪除圖檔
        /// </summary>
        /// <param name="directory">Azure Blob 儲存體資料夾</param>
        /// <param name="imagePathList">圖檔路徑清單</param>
        public static async Task DeleteImageAsync(AzureBlobDirectoryEnum directory, List<string> imagePathList)
        {
            List<Task> deleteTasks = new List<Task>();

            imagePathList.ForEach(f => deleteTasks.Add(GetAzureCloudBlobDirectory(directory).GetBlockBlobReference(f).DeleteIfExistsAsync()));

            await Task.WhenAll(deleteTasks);
        }

        /// <summary>
        /// 取得圖片網址
        /// </summary>
        /// <param name="directory">Azure Blob 儲存體資料夾</param>
        /// <param name="photoFileDto">圖檔 Dto</param>
        /// <returns>圖片網址</returns>
        public static string GetImage(AzureBlobDirectoryEnum directory, PhotoFileDto photoFileDto)
        {
            return $"{BxStorageURL}{BxAPIStorageContainerName}/{directory}/{photoFileDto.FileName}{photoFileDto.FileExtension}";
        }

        /// <summary>
        /// 取得存取帳號大頭貼AzureStorage實體
        /// </summary>
        /// <param name="directory">Azure Blob 儲存體資料夾</param>
        /// <returns>AzureStorage實體</returns>
        private static CloudBlobDirectory GetAzureCloudBlobDirectory(AzureBlobDirectoryEnum directory)
        {
            return CloudBlobDirectoryDI[directory];
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