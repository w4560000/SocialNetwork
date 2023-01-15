using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 通用的 Post ViewModel
    /// </summary>
    public class CommonPostViewModel
    {
        /// <summary>
        /// 貼文編號
        /// </summary>
        [Required(ErrorMessage = "請輸入貼文編號")]
        public int PostKey { get; set; }
    }
}