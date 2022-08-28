using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 重設密碼 Step1 Request ViewModel
    /// </summary>
    public class ResetPasswordReqViewModel
    {
        /// <summary>
        /// 會員帳號
        /// </summary>
        [Required(ErrorMessage = "請輸入會員帳號")]
        public string Account { get; set; }

        /// <summary>
        /// 電子郵件
        /// </summary>
        [Required(ErrorMessage = "請輸入電子郵件")]
        [EmailAddress(ErrorMessage = "電子郵件格式錯誤")]
        public string Mail { get; set; }
    }
}