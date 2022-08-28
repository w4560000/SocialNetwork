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
        [MaxLength(10, ErrorMessage = "會員名稱最多10碼")]
        public string NickName { get; set; }

        /// <summary>
        /// 會員帳號
        /// </summary>
        [Required(ErrorMessage = "請輸入會員帳號")]
        [RegularExpression("^.[A-Za-z0-9]+$", ErrorMessage = "會員帳號需至少為6碼的英數字")]
        [MinLength(6, ErrorMessage = "會員帳號需至少為6碼的英數字")]
        public string Account { get; set; }

        /// <summary>
        /// 會員密碼
        /// </summary>
        [Required(ErrorMessage = "請輸入會員密碼")]
        public string Password { get; set; }

        /// <summary>
        /// 會員密碼確認
        /// </summary>
        [Required(ErrorMessage = "請輸入會員密碼確認")]
        public string PasswordCheck { get; set; }

        /// <summary>
        /// 電子郵件
        /// </summary>
        [Required(ErrorMessage = "請輸入電子郵件")]
        [EmailAddress(ErrorMessage = "電子郵件格式錯誤")]
        public string Mail { get; set; }

        /// <summary>
        /// 註冊驗證碼
        /// </summary>
        [Required(ErrorMessage = "請輸入驗證碼")]
        public string VCode { get; set; }
    }
}