using Microsoft.AspNetCore.SignalR;
using SocialNetwork.Helper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserInfo = SocialNetwork.Helper.UserInfo;

namespace SocialNetwork.Service
{
    /// <summary>
    /// 聊天室 Hub
    /// </summary>
    public class ChatHub : Hub
    {
        /// <summary>
        /// IUserContext
        /// </summary>
        private readonly IUserContext UserContext;

        /// <summary>
        /// ICacheHelper
        /// </summary>
        private readonly ICacheHelper CacheHelper;

        /// <summary>
        /// 會員 ChatHub 連線ID Redis Key
        /// </summary>
        private string RedisMemberConnectionKey(int memberID) => $"{nameof(ChatHub)}_Member:{memberID}";

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="userContext">IUserContext</param>
        /// <param name="cacheHelper">ICacheHelper</param>
        public ChatHub(
            IUserContext userContext,
            ICacheHelper cacheHelper)
        {
            this.UserContext = userContext;
            this.CacheHelper = cacheHelper;
        }

        /// <summary>
        /// 初始連線
        /// </summary>
        public override async Task OnConnectedAsync()
        {
            //var memberID = Context.GetHttpContext().Request.Query["memberID"];

            // 紀錄 ConnectionId
            await this.CacheHelper.ResetAsync(RedisMemberConnectionKey(this.UserContext.User.MemberID), () => Context.ConnectionId);

            await base.OnConnectedAsync();
        }

        /// <summary>
        /// 結束連線
        /// </summary>
        /// <param name="exception">異常</param>
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var connectionId = Context.ConnectionId;

            // 移除 ConnectionId
            await this.CacheHelper.RemoveAsync(RedisMemberConnectionKey(this.UserContext.User.MemberID));

            await base.OnDisconnectedAsync(exception);
        }

        /// <summary>
        /// 刷新聊天室好友資訊
        /// </summary>
        /// <param name="friendMemberID">該會員好友的會員編號清單</param>
        /// <param name="userInfo">會員資訊</param>
        public async Task ReflashFriendStatus_Send(List<int> friendMemberID, UserInfo userInfo)
        {
            List<string> connectionIdList = new List<string>();

            friendMemberID.ForEach(async f =>
            {
                string connectionId = await this.CacheHelper.GetAsync<string>(RedisMemberConnectionKey(f));
                if (!string.IsNullOrEmpty(connectionId))
                    connectionIdList.Add(connectionId);
            });

            await Clients.Clients(connectionIdList).SendAsync("ReflashFriendStatus_Receive", userInfo);
        }
    }
}