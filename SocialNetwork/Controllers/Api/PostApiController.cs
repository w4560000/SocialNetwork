using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SocialNetwork.Helper;
using SocialNetwork.Repository;
using SocialNetwork.Service;
using System;
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
        /// IPostService
        /// </summary>
        private readonly IPostService PostService;

        /// <summary>
        /// Constructor
        /// </summary>
        public PostApiController(
            ILogger<PostApiController> logger,
            IPostService postService)
        {
            this.Logger = logger;
            this.PostService = postService;
        }

        /// <summary>
        /// 發佈貼文
        /// </summary>
        /// <param name="model">發佈貼文 Req ViewModel</param>
        /// <returns>發佈結果</returns>
        [HttpPost(nameof(PublishPost))]
        public async Task<ResponseViewModel> PublishPost([FromForm] PublishPostReqViewModel model)
        {
            try
            {
                return await PostService.PublishPost(model);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"發佈貼文失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse();
            }
        }
    }
}