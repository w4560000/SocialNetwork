using Microsoft.Azure.KeyVault;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.Threading.Tasks;

namespace SocialNetwork.Helper
{
    /// <summary>
    /// AzureHelper
    /// </summary>
    public static class AzureHelper
    {
        /// <summary>
        /// 帳號大頭貼Azure儲存體容器名稱
        /// </summary>
        private static string BxAPIStorageContainerName => "social-network";

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
            CloudBlockBlob cloudBlockBlob = GetAzureCloudBlobDirectory(directory).GetBlockBlobReference(photoFileDto.FileFullName);

            await cloudBlockBlob.DeleteIfExistsAsync();
            await cloudBlockBlob.UploadFromByteArrayAsync(photoFileDto.FileByte, 0, photoFileDto.FileByte.Length);
        }

        /// <summary>
        /// 取得圖片
        /// </summary>
        /// <param name="directory">Azure Blob 儲存體資料夾</param>
        /// <param name="fileFullName">檔名</param>
        /// <returns>圖片網址</returns>
        public static string GetImage(AzureBlobDirectoryEnum directory, string fileFullName)
        {
            return $"https://bingxiangstorage.blob.core.windows.net/{BxAPIStorageContainerName}/{directory}/{fileFullName}";
        }

        /// <summary>
        /// 取得存取帳號大頭貼AzureStorage實體
        /// </summary>
        /// <param name="directory">Azure Blob 儲存體資料夾</param>
        /// <returns>AzureStorage實體</returns>
        private static CloudBlobDirectory GetAzureCloudBlobDirectory(AzureBlobDirectoryEnum directory)
        {
            string connectionString = GetAzureSecretVaule("bxStorage");

            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(connectionString);
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference(BxAPIStorageContainerName);

            return container.GetDirectoryReference(directory.ToString());
        }
    }
}