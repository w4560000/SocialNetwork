using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 更新會員資訊 Request ViewModel
    /// </summary>
    public class UpdateMemberInfoReqViewModel
    {
        /// <summary>
        /// 會員名稱
        /// </summary>
        [Required(ErrorMessage = "請輸入會員名稱")]
        [MaxLength(10, ErrorMessage = "會員名稱最多10碼")]
        public string NickName { get; set; }

        /// <summary>
        /// 主頁背景圖片
        /// </summary>
        [DataType(DataType.Upload)]
        [ValidatePhotoFile]
        public IFormFile BackgroundPhoto { get; set; }

        /// <summary>
        /// 頭像圖片
        /// </summary>
        [DataType(DataType.Upload)]
        [ValidatePhotoFile]
        public IFormFile ProfilePhoto { get; set; }
    }
}