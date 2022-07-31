namespace SocialNetwork.Helper
{
    /// <summary>
    /// 會員資訊
    /// </summary>
    public class UserInfo
    {
        /// <summary>
        /// 會員編號
        /// </summary>
        public int MemberID { get; set; }

        /// <summary>
        /// 帳號
        /// </summary>
        public string Account { get; set; }

        /// <summary>
        /// 暱稱
        /// </summary>
        public string NickName { get; set; }

        /// <summary>
        /// 個人大頭貼路徑
        /// </summary>
        public string ProfilePhotoUrl { get; set; }
    }
}