using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 密碼變更 Request ViewModel
    /// </summary>
    public class ChangePasswordReqViewModel
    {
        /// <summary>
        /// 舊密碼
        /// </summary>
        [Required(ErrorMessage = "請輸入舊密碼")]
        public string OldPassword { get; set; }

        /// <summary>
        /// 新密碼
        /// </summary>
        [Required(ErrorMessage = "請輸入新密碼")]
        public string NewPassword { get; set; }

        /// <summary>
        /// 新密碼確認
        /// </summary>
        [Required(ErrorMessage = "請輸入新密碼確認")]
        public string NewPasswordCheck { get; set; }
    }
}