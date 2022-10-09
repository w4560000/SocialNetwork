namespace SocialNetwork.Repository
{
    /// <summary>
    /// 取得好友狀態 Response ViewModel
    /// </summary>
    public class GetFriendStatusResViewModel
    {
        /// <summary>
        /// 好友狀態
        /// </summary>
        public FriendStatusEnum FriendStatus { get; set; }
    }
}