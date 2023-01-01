using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 判斷好友邀請 Request ViewModel
    /// </summary>
    public class DecideFriendInvitationReqViewModel
    {
        /// <summary>
        /// 會員編號
        /// </summary>
        [Required(ErrorMessage = "請輸入會員編號")]
        public int MemberID { get; set; }

        /// <summary>
        /// 判斷好友邀請
        /// </summary>
        [Required(ErrorMessage = "請輸入判斷好友邀請")]
        [EnumDataType(typeof(DecideFriendInvitationEnum), ErrorMessage = "請輸入判斷好友邀請")]
        public DecideFriendInvitationEnum Decision { get;set; }
    }
}