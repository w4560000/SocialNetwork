using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 寄送驗證碼 Request ViewModel
    /// </summary>
    public class SendVCodeReqViewModel
    {
        /// <summary>
        /// 電子郵件
        /// </summary>
        [Required(ErrorMessage = "請輸入電子郵件")]
        [EmailAddress(ErrorMessage = "電子郵件格式錯誤")]
        public string Mail { get; set; }
    }
}