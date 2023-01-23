using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 發送貼文留言 RequestViewModel
    /// </summary>
    public class SendPostMsgReqViewModel
    {
        /// <summary>
        /// 貼文編號
        /// </summary>
        [Required(ErrorMessage = "請輸入貼文編號")]
        public int PostKey { get; set; }

        /// <summary>
        /// 貼文留言
        /// </summary>
        [Required(ErrorMessage = "請輸入貼文留言")]
        public string Msg { get; set; }
    }
}