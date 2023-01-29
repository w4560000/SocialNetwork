using SocialNetwork.Helper;
using SocialNetwork.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

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
        /// <param name="memberID">會員編號</param>
        /// <returns>取得結果</returns>
        Task<ResponseViewModel<List<GetFriendListResViewModel>>> GetFriendListAsync(int memberID);

        /// <summary>
        /// 取得好友邀請清單
        /// </summary>
        /// <param name="memberID">會員編號</param>
        /// <returns>取得結果</returns>
        Task<ResponseViewModel<List<GetFriendListResViewModel>>> GetFriendInvitationListAsync(int memberID);

        /// <summary>
        /// 取得您送出的好友邀請清單
        /// </summary>
        /// <param name="memberID">會員編號</param>
        /// <returns>取得結果</returns>
        Task<ResponseViewModel<List<GetFriendListResViewModel>>> GetSendFriendInvitationListAsync(int memberID);

        /// <summary>
        /// 取得好友狀態
        /// </summary>
        /// <param name="model">取得好友狀態 Request ViewModel</param>
        /// <returns>取得結果</returns>
        Task<ResponseViewModel<GetFriendStatusResViewModel>> GetFriendStatusAsync(CommonMemberViewModel model);

        /// <summary>
        /// 發送好友邀請
        /// </summary>
        /// <param name="model">發送好友邀請 Request Model</param>
        /// <returns>發送結果</returns>
        Task<ResponseViewModel> SendFriendInvitationAsync(CommonMemberViewModel model);

        /// <summary>
        /// 判斷好友邀請
        /// </summary>
        /// <param name="model">判斷好友邀請 Request Model</param>
        /// <returns>判斷結果</returns>
        Task<ResponseViewModel> DecideFriendInvitationAsync(DecideFriendInvitationReqViewModel model);

        /// <summary>
        /// 收回好友邀請
        /// </summary>
        /// <param name="model">收回好友邀請 Request Model</param>
        /// <returns>收回結果</returns>
        Task<ResponseViewModel> RevokeFriendInvitationAsync(CommonMemberViewModel model);

        /// <summary>
        /// 刪除好友
        /// </summary>
        /// <param name="model">刪除好友 Request Model</param>
        /// <returns>刪除結果</returns>
        Task<ResponseViewModel> DeleteFriendAsync(CommonMemberViewModel model);
    }
}