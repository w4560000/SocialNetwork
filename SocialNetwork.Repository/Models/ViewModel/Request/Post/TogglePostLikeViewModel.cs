using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 貼文按讚 or 取消按讚 Request ViewModel
    /// </summary>
    public class TogglePostLikeViewModel
    {
        /// <summary>
        /// 貼文編號
        /// </summary>
        [Required(ErrorMessage = "請輸入貼文編號")]
        public int PostKey { get; set; }

        /// <summary>
        /// 按讚 or 取消按讚
        /// </summary>
        [Required(ErrorMessage = "請輸入按讚 or 取消按讚")]
        [EnumDataType(typeof(ToggleEnum), ErrorMessage = "請輸入按讚 or 取消按讚")]
        public ToggleEnum Toggle { get; set; }
    }
}