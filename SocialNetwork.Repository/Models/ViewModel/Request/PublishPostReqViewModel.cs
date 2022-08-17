using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
        [Required(ErrorMessage = "請輸入貼文內容")]
        public string Post { get; set; }

        /// <summary>
        /// 貼文圖片
        /// </summary>
        [DataType(DataType.Upload)]
        [ValidatePhotoFile]
        public List<IFormFile> PhotoFiles { get; set; } = new List<IFormFile>();
    }
}