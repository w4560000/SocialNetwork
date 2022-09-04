using SocialNetwork.Helper;
using SocialNetwork.Repository;

namespace SocialNetwork.Service
{
    /// <summary>
    /// IFriendService
    /// </summary>
    public interface IFriendService
    {
        /// <summary>
        /// 發送好友邀請
        /// </summary>
        /// <param name="model">發送好友邀請 Request Model</param>
        /// <returns>發送結果</returns>
        public ResponseViewModel SendFriendInvitation(SendFriendInvitationReqViewModel model);

        /// <summary>
        /// 判斷好友邀請
        /// </summary>
        /// <param name="model">判斷好友邀請 Request Model</param>
        /// <returns>判斷結果</returns>
        public ResponseViewModel DecideFriendInvitation(DecideFriendInvitationReqViewModel model);

        /// <summary>
        /// 收回好友邀請
        /// </summary>
        /// <param name="model">收回好友邀請 Request Model</param>
        /// <returns>收回結果</returns>
        public ResponseViewModel RevokeFriendInvitation(RevokeFriendInvitationReqViewModel model);

        /// <summary>
        /// 刪除好友
        /// </summary>
        /// <param name="model">刪除好友 Request Model</param>
        /// <returns>刪除結果</returns>
        public ResponseViewModel DeleteFriend(DeleteFriendReqViewModel model);
    }
}