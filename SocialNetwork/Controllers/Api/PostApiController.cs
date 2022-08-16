using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SocialNetwork.Helper;
using SocialNetwork.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork.Controllers
{
    /// <summary>
    /// PostController
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class PostApiController : ControllerBase
    {
        /// <summary>
        /// Logger
        /// </summary>
        private readonly ILogger<PostApiController> Logger;

        /// <summary>
        /// Constructor
        /// </summary>
        public PostApiController(
            ILogger<PostApiController> logger)
        {
            this.Logger = logger;
        }

        /// <summary>
        /// 發佈貼文
        /// </summary>
        /// <param name="model">發佈貼文 Req ViewModel</param>
        /// <returns>發佈結果</returns>
        [HttpPost(nameof(PublishPost))]
        public ResponseViewModel PublishPost([FromForm] PublishPostReqViewModel model)
        {
            try
            {
                return new ResponseViewModel();
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"發佈貼文失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse();
            }
        }
    }
}
