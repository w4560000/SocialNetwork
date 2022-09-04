using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 刪除好友 Request ViewModel
    /// </summary>
    public class DeleteFriendReqViewModel
    {
        /// <summary>
        /// 會員編號
        /// </summary>
        [Required(ErrorMessage = "請帶入會員編號")]
        public int MemberID { get; set; }
    }
}