namespace SocialNetwork.Helper
{
    /// <summary>
    /// 圖檔 Dto
    /// </summary>
    public class PhotoFileDto
    {
        /// <summary>
        /// 檔名
        /// </summary>
        public string FileFullName { get; set; }

        /// <summary>
        /// 檔案
        /// </summary>
        public byte[] FileByte { get; set; }
    }
}