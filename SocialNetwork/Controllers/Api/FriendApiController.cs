using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SocialNetwork.Helper;
using SocialNetwork.Repository;
using SocialNetwork.Service;
using System;
using System.Collections.Generic;

namespace SocialNetwork.Controllers
{
    /// <summary>
    /// FriendController
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class FriendApiController : ControllerBase
    {
        /// <summary>
        /// Logger
        /// </summary>
        private readonly ILogger<FriendApiController> Logger;

        /// <summary>
        /// IFriendService
        /// </summary>
        private readonly IFriendService FriendService;

        /// <summary>
        /// IUserContext
        /// </summary>
        private readonly IUserContext UserContext;

        /// <summary>
        /// Constructor
        /// </summary>
        public FriendApiController(
            ILogger<FriendApiController> logger,
            IFriendService friendService,
            IUserContext userContext)
        {
            this.Logger = logger;
            this.FriendService = friendService;
            this.UserContext = userContext;
        }   

        /// <summary>
        /// 取得好友清單
        /// </summary>
        /// <returns>取得結果</returns>
        [HttpPost(nameof(GetFriendList))]
        public ResponseViewModel<List<GetFriendListResViewModel>> GetFriendList()
        {
            try
            {
                return FriendService.GetFriendList(this.UserContext.User.MemberID);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"取得好友清單失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse<List<GetFriendListResViewModel>>();
            }
        }

        /// <summary>
        /// 取得好友邀請清單
        /// </summary>
        /// <returns>取得結果</returns>
        [HttpPost(nameof(GetFriendInvitationList))]
        public ResponseViewModel<List<GetFriendListResViewModel>> GetFriendInvitationList()
        {
            try
            {
                return FriendService.GetFriendInvitationList(this.UserContext.User.MemberID);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"取得好友邀請清單失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse<List<GetFriendListResViewModel>>();
            }
        }

        /// <summary>
        /// 取得您送出的好友邀請清單
        /// </summary>
        /// <returns>取得結果</returns>
        [HttpPost(nameof(GetSendFriendInvitationList))]
        public ResponseViewModel<List<GetFriendListResViewModel>> GetSendFriendInvitationList()
        {
            try
            {
                return FriendService.GetSendFriendInvitationList(this.UserContext.User.MemberID);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"取得您送出的好友邀請清單失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse<List<GetFriendListResViewModel>>();
            }
        }

        /// <summary>
        /// 取得好友狀態
        /// </summary>
        /// <param name="model">取得好友狀態 Request ViewModel</param>
        /// <returns>取得結果</returns>
        [HttpPost(nameof(GetFriendStatus))]
        public ResponseViewModel<GetFriendStatusResViewModel> GetFriendStatus(CommonMemberViewModel model)
        {
            try
            {
                return FriendService.GetFriendStatus(model);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"取得好友狀態失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse<GetFriendStatusResViewModel>();
            }
        }

        /// <summary>
        /// 發送好友邀請
        /// </summary>
        /// <param name="model">發送好友邀請 Request ViewModel</param>
        /// <returns>發送結果</returns>
        [HttpPost(nameof(SendFriendInvitation))]
        public ResponseViewModel SendFriendInvitation(CommonMemberViewModel model)
        {
            try
            {
                return FriendService.SendFriendInvitation(model);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"發送好友邀請失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse();
            }
        }

        /// <summary>
        /// 判斷好友邀請 (接受 or 拒絕)
        /// </summary>
        /// <param name="model">判斷好友邀請 Request ViewModel</param>
        /// <returns>判斷結果</returns>
        [HttpPost(nameof(DecideFriendInvitation))]
        public ResponseViewModel DecideFriendInvitation(DecideFriendInvitationReqViewModel model)
        {
            try
            {
                return FriendService.DecideFriendInvitation(model);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"判斷好友邀請失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse();
            }
        }

        /// <summary>
        /// 收回好友邀請
        /// </summary>
        /// <param name="model">收回好友邀請 Request ViewModel</param>
        /// <returns>收回結果</returns>
        [HttpPost(nameof(RevokeFriendInvitation))]
        public ResponseViewModel RevokeFriendInvitation(CommonMemberViewModel model)
        {
            try
            {
                return FriendService.RevokeFriendInvitation(model);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"收回好友邀請失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse();
            }
        }

        /// <summary>
        /// 刪除好友
        /// </summary>
        /// <param name="model">刪除好友 Request ViewModel</param>
        /// <returns>刪除結果</returns>
        [HttpPost(nameof(DeleteFriend))]
        public ResponseViewModel DeleteFriend(CommonMemberViewModel model)
        {
            try
            {
                return FriendService.DeleteFriend(model);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"刪除好友失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse();
            }
        }
    }
}