using Microsoft.Azure.KeyVault;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
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
        /// 上傳圖檔統一副檔名
        /// </summary>
        private static string ImageFilenameExtension => ".png";

        /// <summary>
        /// 帳號大頭貼Azure儲存體資料夾
        /// </summary>
        private static string ImageDirectory => "MemberPhoto/";

        /// <summary>
        /// 帳號大頭貼Azure儲存體容器名稱
        /// </summary>
        private static string BxAPIStorageContainerName => "SocialNetwork";

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
        /// 上傳大頭貼圖檔
        /// </summary>
        /// <param name="memberAccount">會員帳號</param>
        /// <param name="imageBase64String">圖檔資料</param>
        /// <returns>上傳結果</returns>
        public static async Task UpLoadImageAsync(string memberAccount, string imageBase64String)
        {
            if (ValidateImage(imageBase64String, out byte[] bytes))
            {
                await UploadAzureStorageBlogImageByBytesAsync(memberAccount, bytes);
            }
        }

        /// <summary>
        /// 取得會員大頭貼網址
        /// </summary>
        /// <param name="memberAccount">會員帳號</param>
        /// <returns>會員大頭貼網址</returns>
        public static string GetImage(string memberAccount) =>
            $"https://bingxiangstorage.blob.core.windows.net/{BxAPIStorageContainerName}/{ImageDirectory}{memberAccount}{ImageFilenameExtension}";

        /// <summary>
        /// 驗證圖檔
        /// </summary>
        /// <param name="imageBase64String">圖檔資料</param>
        /// <param name="bytes">圖檔bytes</param>
        /// <returns>是否驗證成功</returns>
        private static bool ValidateImage(string imageBase64String, out byte[] bytes)
        {
            //取得content-type
            string type = imageBase64String.Substring(0, imageBase64String.IndexOf(";"));

            //取得圖檔完整的base64
            imageBase64String = imageBase64String.Substring(imageBase64String.IndexOf(",") + 1);

            //base64轉換為byte
            bytes = Convert.FromBase64String(imageBase64String);

            return !new List<string>() { "jpeg", "png", "gif" }.All(a => !type.Contains(a)); ;
        }

        /// <summary>
        /// 上傳圖檔至AzureStorage
        /// </summary>
        /// <param name="memberAccount">會員帳號</param>
        /// <param name="bytes">圖檔bytes</param>
        private static async Task UploadAzureStorageBlogImageByBytesAsync(string memberAccount, byte[] bytes)
        {
            string localFileName = $"{memberAccount}{ImageFilenameExtension}";

            CloudBlockBlob cloudBlockBlob = GetAzureCloudBlobDirectory().GetBlockBlobReference(localFileName);

            await cloudBlockBlob.DeleteIfExistsAsync();
            await cloudBlockBlob.UploadFromByteArrayAsync(bytes, 0, bytes.Length);
        }

        /// <summary>
        /// 取得存取帳號大頭貼AzureStorage實體
        /// </summary>
        /// <returns>AzureStorage實體</returns>
        private static CloudBlobDirectory GetAzureCloudBlobDirectory()
        {
            string connectionString = GetAzureSecretVaule("bxStorage");

            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(connectionString);
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference(BxAPIStorageContainerName);

            return container.GetDirectoryReference(ImageDirectory);
        }
    }
}