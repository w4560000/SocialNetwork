using System.Collections.Generic;

namespace SocialNetwork.Helper
{
    /// <summary>
    /// SystemHelper
    /// </summary>
    public static class SystemHelper
    {
        /// <summary>
        /// 預設大頭貼
        /// </summary>
        public static string DefaultProfilePhoto => "/images/default_profilePhoto.svg";

        /// <summary>
        /// 預設背景圖
        /// </summary>
        public static string DefaultBackgoundPhoto => "/images/default_backgroundPhoto.jpg";

        /// <summary>
        /// 允許的附檔名
        /// </summary>
        public static List<string> AllowFileExtensions = new List<string>() { ".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif" };

        /// <summary>
        /// 允許檔案大小
        /// </summary>
        public static long FileLengthLimit = 5 * 1024 * 1024; // 5 MB
    }
}