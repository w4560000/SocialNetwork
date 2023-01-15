using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SocialNetwork.Helper;
using SocialNetwork.Repository;
using SocialNetwork.Service;
using System;
using System.Collections.Generic;
using System.Threading;
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
                return await PostService.PublishPostAsync(model);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"發佈貼文失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse();
            }
        }

        /// <summary>
        /// 取得首頁貼文 (自己和朋友)
        /// </summary>
        /// <returns>取得結果</returns>
        [HttpPost(nameof(GetIndexPost))]
        public async Task<ResponseViewModel<List<GetPostResViewModel>>> GetIndexPost(QueryRowMemberReqViewModel model)
        {
            try
            {
                // todo remove
                Thread.Sleep(1000);
                return await PostService.GetIndexPost(model);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"取得貼文失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse<List<GetPostResViewModel>>();
            }
        }

        /// <summary>
        /// 取得會員個人貼文
        /// </summary>
        /// <param name="model">取得會員貼文 Req ViewModel</param>
        /// <returns>取得結果</returns>
        [HttpPost(nameof(GetHomePagePost))]
        public async Task<ResponseViewModel<List<GetPostResViewModel>>> GetHomePagePost(QueryRowMemberReqViewModel model)
        {
            try
            {
                return await PostService.GetHomePagePost(model);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"取得會員貼文失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse<List<GetPostResViewModel>>();
            }
        }
    }
}