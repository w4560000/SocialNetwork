using System;
using System.Collections.Generic;
using System.Linq;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 取得貼文 Response ViewModel
    /// 取得會員貼文 Response ViewModel
    /// </summary>
    public class GetPostResViewModel
    {
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
        /// 貼文編號
        /// </summary>
        public int PostKey { get; set; }

        /// <summary>
        /// 發布貼文時間
        /// </summary>
        public DateTime PostDateTime { get; set; }

        /// <summary>
        /// 貼文內容
        /// </summary>
        public string PostContent { get; set; }

        /// <summary>
        /// 貼文圖片清單
        /// </summary>
        public List<string> PostImageUrlList
        {
            get
            {
                return this.PostImageUrlStr.Split(',')
                                           .Where(w => !string.IsNullOrEmpty(w))
                                           .ToList();
            }
        }

        /// <summary>
        /// 貼文圖片
        /// </summary>
        private string PostImageUrlStr { get; set; }

        /// <summary>
        /// 按讚數
        /// </summary>
        public int PostLike { get; set; }

        /// <summary>
        /// 當前會員是否有按讚該貼文
        /// </summary>
        public bool IsCurrnetMemberPostLiked { get; set; }

        /// <summary>
        /// 總留言筆數
        /// </summary>
        public int TotalPostMsgCount { get; set; }

        /// <summary>
        /// 留言清單 (最多呈現3筆)
        /// </summary>
        public List<GetPostMsgResViewModel> PostMsgList { get; set; }
    }
}