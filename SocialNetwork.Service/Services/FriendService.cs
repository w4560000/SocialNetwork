using SocialNetwork.Helper;
using SocialNetwork.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        /// 取得好友清單
        /// </summary>
        /// <param name="memberID">會員編號</param>
        /// <returns>取得結果</returns>
        public async Task<ResponseViewModel<List<GetFriendListResViewModel>>> GetFriendListAsync(int memberID)
        {
            var querySql = @"
                             SELECT m.MemberiD, m.NickName, m.ProfilePhotoURL, m.Status
                             FROM dbo.Member m
                             WHERE m.MemberID IN (
					                                 SELECT f.FriendMemberID FROM dbo.Friend f
					                                 WHERE f.MemberID = @memberID
					                                 UNION
					                                 SELECT f.MemberID FROM dbo.Friend f
					                                 WHERE f.FriendMemberID = @memberID
				                                 )";

            var res = (await this.FriendRepository.QueryAsync<GetFriendListResViewModel>(querySql, new { memberID })).ToList();

            return "取得好友清單成功".AsSuccessResponse(res);
        }

        /// <summary>
        /// 取得好友邀請清單
        /// </summary>
        /// <param name="memberID">會員編號</param>
        /// <returns>取得結果</returns>
        public async Task<ResponseViewModel<List<GetFriendListResViewModel>>> GetFriendInvitationListAsync(int memberID)
        {
            var querySql = @"
                             SELECT m.MemberiD, m.NickName, m.ProfilePhotoURL
                             FROM dbo.Member m
                             WHERE m.MemberID IN (
					                                 SELECT fi.SendMemberID FROM dbo.FriendInvitation fi
					                                 WHERE fi.ReceiveMemberID = @memberID
				                                  )";

            var res = (await this.FriendRepository.QueryAsync<GetFriendListResViewModel>(querySql, new { memberID })).ToList();

            return "取得好友邀請清單成功".AsSuccessResponse(res);
        }

        /// <summary>
        /// 取得您送出的好友邀請清單
        /// </summary>
        /// <param name="memberID">會員編號</param>
        /// <returns>取得結果</returns>
        public async Task<ResponseViewModel<List<GetFriendListResViewModel>>> GetSendFriendInvitationListAsync(int memberID)
        {
            var querySql = @"
                             SELECT m.MemberiD, m.NickName, m.ProfilePhotoURL
                             FROM Member m
                             WHERE m.MemberID IN (
					                                 SELECT fi.ReceiveMemberID FROM dbo.FriendInvitation fi
					                                 WHERE fi.SendMemberID = @memberID
				                                 )";

            var res = (await this.FriendRepository.QueryAsync<GetFriendListResViewModel>(querySql, new { memberID })).ToList();

            return "取得您送出的好友邀請清單成功".AsSuccessResponse(res);
        }

        /// <summary>
        /// 取得好友狀態
        /// </summary>
        /// <param name="model">取得好友狀態 Request ViewModel</param>
        /// <returns>取得結果</returns>
        public async Task<ResponseViewModel<GetFriendStatusResViewModel>> GetFriendStatusAsync(CommonMemberViewModel model)
        {
            if (!this.MemberRepository.TryGetEntity(model.MemberID, out _))
                return CommonExtension.AsSystemFailResponse<GetFriendStatusResViewModel>();

            string msg = "取得好友狀態成功";

            // 檢查是否為好友
            var (isFriend, _) = await this.CheckFriendExistAsync(this.UserContext.User.MemberID, model.MemberID);
            if (isFriend)
                return msg.AsSuccessResponse(new GetFriendStatusResViewModel() { FriendStatus = FriendStatusEnum.為好友 });

            // 檢查是否發送過好友邀請
            var (isSendedFriendInvitation, _) = await this.CheckSendedFriendInvitationAsync(this.UserContext.User.MemberID, model.MemberID);
            if (isSendedFriendInvitation)
                return msg.AsSuccessResponse(new GetFriendStatusResViewModel() { FriendStatus = FriendStatusEnum.已寄送好友邀請 });

            // 檢查對方是否發送過好友邀請
            var (isExistFriendInvitation, _) = await this.CheckFriendInvitationAsync(this.UserContext.User.MemberID, model.MemberID);
            if (isExistFriendInvitation)
                return msg.AsSuccessResponse(new GetFriendStatusResViewModel() { FriendStatus = FriendStatusEnum.已接收好友邀請 });

            return msg.AsSuccessResponse(new GetFriendStatusResViewModel() { FriendStatus = FriendStatusEnum.非好友 });
        }

        /// <summary>
        /// 發送好友邀請
        /// </summary>
        /// <param name="model">發送好友邀請 Request Model</param>
        /// <returns>發送結果</returns>
        public async Task<ResponseViewModel> SendFriendInvitationAsync(CommonMemberViewModel model)
        {
            if (!this.MemberRepository.TryGetEntity(model.MemberID, out _))
                return CommonExtension.AsSystemFailResponse();

            if (this.UserContext.User.MemberID == model.MemberID)
                return "無法對自己發送好友邀請".AsFailResponse();

            var (isFriend, _) = await this.CheckFriendExistAsync(this.UserContext.User.MemberID, model.MemberID);
            if (isFriend)
                return "無法對好友發送好友邀請".AsFailResponse();

            var (isSendedFriendInvitation, _) = await this.CheckSendedFriendInvitationAsync(this.UserContext.User.MemberID, model.MemberID);
            if (isSendedFriendInvitation)
                return "已發送過好友邀請".AsFailResponse();

            // 當對方已先發送好友邀請時，則直接變為好友
            var (isExistFriendInvitation, _) = await this.CheckFriendInvitationAsync(this.UserContext.User.MemberID, model.MemberID);
            if (isExistFriendInvitation)
            {
                await this.AddFriendAsync(this.UserContext.User.MemberID, model.MemberID);
                return "新增好友成功".AsSuccessResponse();
            }

            var friendInvitationEntity = new FriendInvitation()
            {
                SendMemberID = this.UserContext.User.MemberID,
                ReceiveMemberID = model.MemberID
            };

            await this.FriendInvitationRepository.AddAsync<int>(friendInvitationEntity);

            return "發送成功".AsSuccessResponse();
        }

        /// <summary>
        /// 判斷好友邀請
        /// </summary>
        /// <param name="model">判斷好友邀請 Request Model</param>
        /// <returns>判斷結果</returns>
        public async Task<ResponseViewModel> DecideFriendInvitationAsync(DecideFriendInvitationReqViewModel model)
        {
            if (!this.MemberRepository.TryGetEntity(model.MemberID, out _))
                return CommonExtension.AsSystemFailResponse();

            var (isFriend, _) = await this.CheckFriendExistAsync(this.UserContext.User.MemberID, model.MemberID);
            if (isFriend)
                return "已互為好友關係".AsFailResponse();

            // 檢查對方是否有發送好友邀請
            var (isExistFriendInvitation, friendInvitation) = await this.CheckFriendInvitationAsync(this.UserContext.User.MemberID, model.MemberID);
            if (!isExistFriendInvitation)
                return "查無對方發送好友邀請紀錄".AsFailResponse();

            if (model.Decision == DecideFriendInvitationEnum.拒絕)
            {
                this.FriendInvitationRepository.Delete(friendInvitation);
                return "拒絕好友邀請成功".AsSuccessResponse();
            }

            await this.AddFriendAsync(this.UserContext.User.MemberID, model.MemberID);
            await this.FriendInvitationRepository.DeleteAsync(friendInvitation);

            return "新增好友成功".AsSuccessResponse();
        }

        /// <summary>
        /// 收回好友邀請
        /// </summary>
        /// <param name="model">收回好友邀請 Request Model</param>
        /// <returns>收回結果</returns>
        public async Task<ResponseViewModel> RevokeFriendInvitationAsync(CommonMemberViewModel model)
        {
            if (!this.MemberRepository.TryGetEntity(model.MemberID, out _))
                return CommonExtension.AsSystemFailResponse();

            var (isFriend, _) = await this.CheckFriendExistAsync(this.UserContext.User.MemberID, model.MemberID);
            if (isFriend)
                return "已互為好友關係".AsFailResponse();

            // 檢查是否有發送好友邀請
            var (isSendedFriendInvitation, friendInvitation) = await this.CheckSendedFriendInvitationAsync(this.UserContext.User.MemberID, model.MemberID);
            if (!isSendedFriendInvitation)
                return "查無發送好友邀請紀錄".AsFailResponse();

            this.FriendInvitationRepository.Delete(friendInvitation);

            return "收回好友邀請成功".AsSuccessResponse();
        }

        /// <summary>
        /// 刪除好友
        /// </summary>
        /// <param name="model">刪除好友 Request Model</param>
        /// <returns>刪除結果</returns>
        public async Task<ResponseViewModel> DeleteFriendAsync(CommonMemberViewModel model)
        {
            if (!this.MemberRepository.TryGetEntity(model.MemberID, out _))
                return CommonExtension.AsSystemFailResponse();

            var (isFriend, friend) = await this.CheckFriendExistAsync(this.UserContext.User.MemberID, model.MemberID);
            if (!isFriend)
                return "非好友關係，無法刪除好友".AsFailResponse();

            this.FriendRepository.Delete(friend);

            return "刪除好友成功".AsSuccessResponse();
        }

        /// <summary>
        /// 確認是否為好友關係
        /// </summary>
        /// <param name="memberID">會員編號</param>
        /// <param name="anotherMemberID">另一個會員的編號</param>
        /// <returns>確認結果</returns>
        private async Task<(bool isFriend, Friend friend)> CheckFriendExistAsync(int memberID, int anotherMemberID)
        {
            var friend = (await this.FriendRepository.GetListAsync(@"WHERE (MemberID = @memberID AND FriendMemberID = @anotherMemberID) OR
                                                           (MemberID = @anotherMemberID AND FriendMemberID = @memberID)", new { memberID, anotherMemberID })).FirstOrDefault();
            return (friend != null, friend);
        }

        /// <summary>
        /// 確認是否發送過好友邀請
        /// </summary>
        /// <param name="memberID">會員編號</param>
        /// <param name="anotherMemberID">另一個會員的編號</param>
        /// <returns>確認結果</returns>
        private async Task<(bool isSendedFriendInvitation, FriendInvitation friendInvitation)> CheckSendedFriendInvitationAsync(int memberID, int anotherMemberID)
        {
            var friendInvitation = (await this.FriendInvitationRepository.GetListAsync("WHERE SendMemberID = @memberID AND ReceiveMemberID = @anotherMemberID",
                                                                    new { memberID, anotherMemberID })).FirstOrDefault();
            return (friendInvitation != null, friendInvitation);
        }

        /// <summary>
        /// 確認對方是否發送過好友邀請
        /// </summary>
        /// <param name="memberID">會員編號</param>
        /// <param name="anotherMemberID">另一個會員的編號</param>
        /// <returns>確認結果</returns>
        private async Task<(bool isExistFriendInvitation, FriendInvitation friendInvitation)> CheckFriendInvitationAsync(int memberID, int anotherMemberID)
        {
            var friendInvitation = (await this.FriendInvitationRepository.GetListAsync("WHERE SendMemberID = @anotherMemberID AND ReceiveMemberID = @memberID",
                                                                    new { memberID, anotherMemberID })).FirstOrDefault();
            return (friendInvitation != null, friendInvitation);
        }

        /// <summary>
        /// 新增好友
        /// </summary>
        /// <param name="memberID">會員編號</param>
        /// <param name="anotherMemberID">另一個會員的編號</param>
        /// <returns></returns>
        private async Task AddFriendAsync(int memberID, int anotherMemberID)
        {
            var friendEntity = new Friend()
            {
                MemberID = memberID,
                FriendMemberID = anotherMemberID
            };

            await this.FriendRepository.AddAsync<int>(friendEntity);
        }
    }
}