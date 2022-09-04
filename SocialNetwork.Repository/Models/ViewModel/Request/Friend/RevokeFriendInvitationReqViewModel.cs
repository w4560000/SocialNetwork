using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 收回好友邀請 Request ViewModel
    /// </summary>
    public class RevokeFriendInvitationReqViewModel
    {
        /// <summary>
        /// 會員編號
        /// </summary>
        [Required(ErrorMessage = "請帶入會員編號")]
        public int MemberID { get; set; }
    }
}