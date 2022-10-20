using SocialNetwork.Helper;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 取得好友清單 Response ViewModel
    /// 取得好友邀請清單 Response ViewModel
    /// 取得您送出的好友邀請清單 Response ViewModel
    /// </summary>
    public class GetFriendListResViewModel
    {
        /// <summary>
        /// 會員編號
        /// </summary>
        public int MemberID { get; set; }

        /// <summary>
        /// 會員暱稱
        /// </summary>
        public string NickName { get; set; }

        /// <summary>
        /// 大頭貼路徑
        /// </summary>
        public string ProfilePhotoURL { get; set; }

        /// <summary>
        /// 會員狀態
        /// </summary>
        public MemberStatusEnum Status { get; set; }
    }
}