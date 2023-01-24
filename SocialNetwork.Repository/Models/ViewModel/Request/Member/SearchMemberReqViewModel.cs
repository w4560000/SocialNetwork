using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 搜尋會員 Request ViewModel
    /// </summary>
    public class SearchMemberReqViewModel
    {
        /// <summary>
        /// 會員暱稱
        /// </summary>
        [Required(ErrorMessage = "請輸入會員暱稱")]
        public string NickName { get; set; }
    }
}