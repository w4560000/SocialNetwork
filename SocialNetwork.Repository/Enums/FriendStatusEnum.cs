namespace SocialNetwork.Repository
{
    /// <summary>
    /// 好友狀態列舉
    /// </summary>
    public enum FriendStatusEnum
    {
        /// <summary>
        /// 非好友
        /// </summary>
        非好友 = 0,

        /// <summary>
        /// 您已寄送好友邀請給此會員
        /// </summary>
        已寄送好友邀請 = 1,

        /// <summary>
        /// 您已接收到此會員的好友邀情
        /// </summary>
        已接收好友邀請 = 2,

        /// <summary>
        /// 為好友
        /// </summary>
        為好友 = 3
    }
}