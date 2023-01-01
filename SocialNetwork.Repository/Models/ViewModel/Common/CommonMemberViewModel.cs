using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 通用的 Member ViewModel
    /// </summary>
    public class CommonMemberViewModel
    {
        /// <summary>
        /// 會員編號
        /// </summary>
        [Required(ErrorMessage = "請輸入會員編號")]
        public int MemberID { get; set; }
    }
}