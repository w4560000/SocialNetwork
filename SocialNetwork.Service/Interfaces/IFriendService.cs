using SocialNetwork.Helper;
using SocialNetwork.Repository;
using System.Collections.Generic;

namespace SocialNetwork.Service
{
    /// <summary>
    /// IFriendService
    /// </summary>
    public interface IFriendService
    {
        /// <summary>
        /// 取得好友清單
        /// </summary>
        /// <returns>取得結果</returns>
        public ResponseViewModel<List<GetFriendListResViewModel>> GetFriendList();

        /// <summary>
        /// 取得好友邀請清單
        /// </summary>
        /// <returns>取得結果</returns>
        public ResponseViewModel<List<GetFriendListResViewModel>> GetFriendInvitationList();

        /// <summary>
        /// 取得您送出的好友邀請清單
        /// </summary>
        /// <returns>取得結果</returns>
        public ResponseViewModel<List<GetFriendListResViewModel>> GetSendFriendInvitationList();

        /// <summary>
        /// 取得好友狀態
        /// </summary>
        /// <param name="model">取得好友狀態 Request ViewModel</param>
        /// <returns>取得結果</returns>
        public ResponseViewModel<GetFriendStatusResViewModel> GetFriendStatus(CommonMemberViewModel model);

        /// <summary>
        /// 發送好友邀請
        /// </summary>
        /// <param name="model">發送好友邀請 Request Model</param>
        /// <returns>發送結果</returns>
        public ResponseViewModel SendFriendInvitation(CommonMemberViewModel model);

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
        public ResponseViewModel RevokeFriendInvitation(CommonMemberViewModel model);

        /// <summary>
        /// 刪除好友
        /// </summary>
        /// <param name="model">刪除好友 Request Model</param>
        /// <returns>刪除結果</returns>
        public ResponseViewModel DeleteFriend(CommonMemberViewModel model);
    }
}