using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SocialNetwork.Helper;
using SocialNetwork.Repository;
using SocialNetwork.Service;
using System;

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
        /// Constructor
        /// </summary>
        public FriendApiController(
            ILogger<FriendApiController> logger,
            IFriendService friendService)
        {
            this.Logger = logger;
            this.FriendService = friendService;
        }

        /// <summary>
        /// 發送好友邀請
        /// </summary>
        /// <param name="model">發送好友邀請 Request ViewModel</param>
        /// <returns>發送結果</returns>
        [HttpPost(nameof(SendFriendInvitation))]
        public ResponseViewModel SendFriendInvitation(SendFriendInvitationReqViewModel model)
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
        public ResponseViewModel RevokeFriendInvitation(RevokeFriendInvitationReqViewModel model)
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
        public ResponseViewModel DeleteFriend(DeleteFriendReqViewModel model)
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