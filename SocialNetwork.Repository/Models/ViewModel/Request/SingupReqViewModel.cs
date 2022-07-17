using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 註冊 API  Request ViewModel
    /// </summary>
    public class SingupReqViewModel
    {
        /// <summary>
        /// 會員名稱
        /// </summary>
        [Required(ErrorMessage = "請輸入會員名稱")]
        public string NickName { get; set; }

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

        /// <summary>
        /// 會員密碼
        /// </summary>
        [Required(ErrorMessage = "請輸入會員密碼確認")]
        public string PasswordCheck { get; set; }

        /// <summary>
        /// 會員信箱
        /// </summary>
        [Required(ErrorMessage = "請輸入會員信箱")]
        public string Mail { get; set; }

        /// <summary>
        /// 註冊驗證碼
        /// </summary>
        [Required(ErrorMessage = "請輸入驗證碼")]
        public string VCode { get; set; }
    }
}