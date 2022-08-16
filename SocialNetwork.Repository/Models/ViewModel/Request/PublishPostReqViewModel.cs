using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 發佈貼文 Req ViewModel
    /// </summary>
    public class PublishPostReqViewModel
    {
        /// <summary>
        /// 貼文內容
        /// </summary>
        public string Post { get; set; }

        /// <summary>
        /// 貼文圖片
        /// </summary>
        public List<IFormFile> PhotoFiles { get; set; }
    }
}