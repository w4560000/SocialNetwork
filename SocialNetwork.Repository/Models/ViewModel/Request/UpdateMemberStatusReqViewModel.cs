using SocialNetwork.Helper;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 更新會員狀態 Req ViewModel
    /// </summary>
    public class UpdateMemberStatusReqViewModel
    {
        /// <summary>
        /// 會員狀態
        /// </summary>
        public MemberStatusEnum Status { get; set; }
    }
}