using SocialNetwork.Helper;
using SocialNetwork.Repository;
using System.Collections.Generic;
using System.Linq;

namespace SocialNetwork.Service
{
    /// <summary>
    /// FriendService
    /// </summary>
    public class FriendService : IFriendService
    {
        /// <summary>
        /// IFriendRepository
        /// </summary>
        private readonly IFriendRepository FriendRepository;

        /// <summary>
        /// IFriendInvitationRepository
        /// </summary>
        private readonly IFriendInvitationRepository FriendInvitationRepository;

        /// <summary>
        /// IMemberRepository
        /// </summary>
        private readonly IMemberRepository MemberRepository;

        /// <summary>
        /// IUserContext
        /// </summary>
        private readonly IUserContext UserContext;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="friendRepository">IFriendRepository</param>
        /// <param name="friendInvitationRepository">IFriendInvitationRepository</param>
        /// <param name="memberRepository">IMemberRepository</param>
        /// <param name="userContext">IUserContext</param>
        public FriendService(
            IFriendRepository friendRepository,
            IFriendInvitationRepository friendInvitationRepository,
            IMemberRepository memberRepository,
            IUserContext userContext)
        {
            this.FriendRepository = friendRepository;
            this.FriendInvitationRepository = friendInvitationRepository;
            this.MemberRepository = memberRepository;
            this.UserContext = userContext;
        }

        /// <summary>
        /// 發送好友邀請
        /// </summary>
        /// <param name="model">發送好友邀請 Request Model</param>
        /// <returns>發送結果</returns>
        public ResponseViewModel SendFriendInvitation(SendFriendInvitationReqViewModel model)
        {
            if (!this.MemberRepository.TryGetEntity(model.MemberID, out _))
                return CommonExtension.AsSystemFailResponse();

            if (this.CheckFriendExist(this.UserContext.User.MemberID, model.MemberID, out _))
                return "無法對好友發送好友邀請".AsFailResponse();

            if (this.CheckSendedFriendInvitation(this.UserContext.User.MemberID, model.MemberID, out _))
                return "已發送過好友邀請".AsFailResponse();

            // 當對方已先發送好友邀請時，則直接變為好友
            if (this.CheckFriendInvitation(this.UserContext.User.MemberID, model.MemberID, out _))
            {
                this.AddFriend(this.UserContext.User.MemberID, model.MemberID);
                return "新增好友成功".AsSuccessResponse();
            }

            var friendInvitationEntity = new FriendInvitation()
            {
                SendMemberID = this.UserContext.User.MemberID,
                ReceiveMemberID = model.MemberID
            };

            this.FriendInvitationRepository.Add<int>(friendInvitationEntity);

            return "發送成功".AsSuccessResponse();
        }

        /// <summary>
        /// 判斷好友邀請
        /// </summary>
        /// <param name="model">判斷好友邀請 Request Model</param>
        /// <returns>判斷結果</returns>
        public ResponseViewModel DecideFriendInvitation(DecideFriendInvitationReqViewModel model)
        {
            if (!this.MemberRepository.TryGetEntity(model.MemberID, out _))
                return CommonExtension.AsSystemFailResponse();

            if (this.CheckFriendExist(this.UserContext.User.MemberID, model.MemberID, out _))
                return "已互為好友關係".AsFailResponse();

            // 檢查對方是否有發送好友邀請
            if (!this.CheckFriendInvitation(this.UserContext.User.MemberID, model.MemberID, out FriendInvitation friendInvitation))
                return "查無對方發送好友邀請紀錄".AsFailResponse();

            if (model.Decision == DecideFriendInvitationEnum.拒絕)
            {
                this.FriendInvitationRepository.Delete(friendInvitation);
                return "拒絕好友邀請成功".AsSuccessResponse();
            }

            this.AddFriend(this.UserContext.User.MemberID, model.MemberID);
            this.FriendInvitationRepository.Delete(friendInvitation);

            return "新增好友成功".AsSuccessResponse();
        }

        /// <summary>
        /// 收回好友邀請
        /// </summary>
        /// <param name="model">收回好友邀請 Request Model</param>
        /// <returns>收回結果</returns>
        public ResponseViewModel RevokeFriendInvitation(RevokeFriendInvitationReqViewModel model)
        {
            if (!this.MemberRepository.TryGetEntity(model.MemberID, out _))
                return CommonExtension.AsSystemFailResponse();

            if (this.CheckFriendExist(this.UserContext.User.MemberID, model.MemberID, out _))
                return "已互為好友關係".AsFailResponse();

            // 檢查是否有發送好友邀請
            if (!this.CheckSendedFriendInvitation(this.UserContext.User.MemberID, model.MemberID, out FriendInvitation friendInvitation))
                return "查無發送好友邀請紀錄".AsFailResponse();

            this.FriendInvitationRepository.Delete(friendInvitation);

            return "收回好友邀請成功".AsSuccessResponse();
        }

        /// <summary>
        /// 刪除好友
        /// </summary>
        /// <param name="model">刪除好友 Request Model</param>
        /// <returns>刪除結果</returns>
        public ResponseViewModel DeleteFriend(DeleteFriendReqViewModel model)
        {
            if (!this.MemberRepository.TryGetEntity(model.MemberID, out _))
                return CommonExtension.AsSystemFailResponse();

            if (!this.CheckFriendExist(this.UserContext.User.MemberID, model.MemberID, out List<Friend> friendList))
                return "非好友關係，無法刪除好友".AsFailResponse();

            friendList.ForEach(x => this.FriendRepository.Delete(x));

            return "刪除好友成功".AsSuccessResponse();
        }

        /// <summary>
        /// 確認是否為好友關係
        /// </summary>
        /// <param name="memberID">會員編號</param>
        /// <param name="anotherMemberID">另一個會員的編號</param>
        /// <param name="friendList">好友關係列表</param>
        /// <returns>確認結果</returns>
        private bool CheckFriendExist(int memberID, int anotherMemberID, out List<Friend> friendList)
        {
            friendList = this.FriendRepository.GetList(@"WHERE (MemberID = @memberID AND FriendMemberID = @anotherMemberID) OR
                                                               (MemberID = @anotherMemberID AND FriendMemberID = @memberID)",
                                                    new { memberID, anotherMemberID }).ToList();
            return friendList.Count > 0;
        }

        /// <summary>
        /// 確認是否發送過好友邀請
        /// </summary>
        /// <param name="memberID">會員編號</param>
        /// <param name="anotherMemberID">另一個會員的編號</param>
        /// <param name="friendInvitation">發送的好友邀請</param>
        /// <returns>確認結果</returns>
        private bool CheckSendedFriendInvitation(int memberID, int anotherMemberID, out FriendInvitation friendInvitation)
        {
            friendInvitation = this.FriendInvitationRepository.GetList("WHERE SendMemberID = @memberID AND ReceivMemberID = @anotherMemberID",
                                                                    new { memberID, anotherMemberID }).FirstOrDefault();
            return friendInvitation != null;
        }

        /// <summary>
        /// 確認對方是否發送過好友邀請
        /// </summary>
        /// <param name="memberID">會員編號</param>
        /// <param name="anotherMemberID">另一個會員的編號</param>
        /// <param name="friendInvitation">對方發送的好友邀請</param>
        /// <returns>確認結果</returns>
        private bool CheckFriendInvitation(int memberID, int anotherMemberID, out FriendInvitation friendInvitation)
        {
            friendInvitation = this.FriendInvitationRepository.GetList("WHERE SendMemberID = @anotherMemberID AND ReceivMemberID = @memberID",
                                                                    new { memberID, anotherMemberID }).FirstOrDefault();
            return friendInvitation != null;
        }

        /// <summary>
        /// 新增好友
        /// </summary>
        /// <param name="memberID">會員編號</param>
        /// <param name="anotherMemberID">另一個會員的編號</param>
        /// <returns></returns>
        private void AddFriend(int memberID, int anotherMemberID)
        {
            var friendEntity = new Friend()
            {
                MemberID = memberID,
                FriendMemberID = anotherMemberID
            };

            this.FriendRepository.Add<int>(friendEntity);
        }
    }
}