namespace SocialNetwork.Repository
{
    /// <summary>
    /// 搜尋會員
    /// </summary>
    public class SearchMemberResViewModel
    {
        /// <summary>
        /// 會員編號
        /// </summary>
        public int MemberID { get; set; }

        /// <summary>
        /// 暱稱
        /// </summary>
        public string NickName { get; set; }

        /// <summary>
        /// 大頭貼路徑
        /// </summary>
        public string ProfilePhotoURL { get; set; }
    }
}