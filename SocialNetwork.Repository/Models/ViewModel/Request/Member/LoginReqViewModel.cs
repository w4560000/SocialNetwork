using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 登入 Request ViewModel
    /// </summary>
    public class LoginReqViewModel
    {
        /// <summary>
        /// 會員帳號
        /// </summary>
        [Required(ErrorMessage = "請輸入會員帳號")]
        public string Account { get; set; }

        /// <summary>
        /// 會員密碼
        /// </summary>
        [Required(ErrorMessage = "請輸入會員密碼")]
        public string Password { get; set; }
    }
}