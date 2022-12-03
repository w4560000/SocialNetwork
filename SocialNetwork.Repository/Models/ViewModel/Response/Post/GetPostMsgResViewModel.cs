using System;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 取得貼文留言 Response ViewModel
    /// </summary>
    public class GetPostMsgResViewModel
    {
        /// <summary>
        /// 貼文編號
        /// </summary>
        public int PostKey { get; set; }

        /// <summary>
        /// 貼文留言編號
        /// </summary>
        public int MsgKey { get; set; }

        /// <summary>
        /// 會員編號
        /// </summary>
        public int MemberID { get; set; }

        /// <summary>
        /// 會員暱稱
        /// </summary>
        public string NickName { get; set; }

        /// <summary>
        /// 大頭貼路徑
        /// </summary>
        public string ProfilePhotoUrl { get; set; }

        /// <summary>
        /// 留言內容
        /// </summary>
        public string MsgContent { get; set; }

        /// <summary>
        /// 留言時間
        /// </summary>
        public DateTime PostMsgDateTime { get; set; }
    }
}