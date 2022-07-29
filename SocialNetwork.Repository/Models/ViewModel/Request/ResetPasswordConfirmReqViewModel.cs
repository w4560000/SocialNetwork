using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 重設密碼 Step2 Req ViewModel
    /// </summary>
    public class ResetPasswordConfirmReqViewModel
    {
        /// <summary>
        /// 新密碼
        /// </summary>
        [Required(ErrorMessage = "請輸入新密碼")]
        public string Password { get; set; }

        /// <summary>
        /// 新密碼確認
        /// </summary>
        [Required(ErrorMessage = "請輸入密碼確認")]
        public string PasswordCheck { get; set; }

        /// <summary>
        /// 重設密碼 Guid 驗證
        /// </summary>
        [Required(ErrorMessage = "伺服器異常")]
        public string Guid { get; set; }
    }
}