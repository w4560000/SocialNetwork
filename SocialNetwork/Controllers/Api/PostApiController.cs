using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SocialNetwork.Helper;
using SocialNetwork.Repository;
using SocialNetwork.Service;
using System;
using System.Collections.Generic;
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
        /// <param name="model">發佈貼文 Request ViewModel</param>
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
        /// <param name="model">取得首頁貼文 (自己和朋友) Request ViewModel</param>
        /// <returns>取得結果</returns>
        [HttpPost(nameof(GetIndexPost))]
        public async Task<ResponseViewModel<List<GetPostResViewModel>>> GetIndexPost(QueryRowMemberReqViewModel model)
        {
            try
            {
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
        /// <param name="model">取得會員個人貼文 Request ViewModel</param>
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

        /// <summary>
        /// 取得該貼文所有留言
        /// </summary>
        /// <param name="model">取得該貼文所有留言 Request ViewModel</param>
        /// <returns>取得結果</returns>
        [HttpPost(nameof(GetPostAllMsg))]
        public async Task<ResponseViewModel<List<GetPostMsgResViewModel>>> GetPostAllMsg(CommonPostViewModel model)
        {
            try
            {
                return await PostService.GetPostAllMsg(model);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"取得該貼文所有留言失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse<List<GetPostMsgResViewModel>>();
            }
        }

        /// <summary>
        /// 貼文按讚 or 取消按讚
        /// </summary>
        /// <param name="model">貼文按讚 or 取消按讚 Request ViewModel</param>
        /// <returns>操作結果</returns>
        [HttpPost(nameof(TogglePostLike))]
        public async Task<ResponseViewModel> TogglePostLike(TogglePostLikeViewModel model)
        {
            try
            {
                return await PostService.TogglePostLike(model);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"貼文按讚 or 取消按讚失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse();
            }
        }

        /// <summary>
        /// 發送貼文留言
        /// </summary>
        /// <param name="model">發送貼文留言 Request ViewModel</param>
        /// <returns>發送結果</returns>
        [HttpPost(nameof(SendPostMsg))]
        public async Task<ResponseViewModel<GetPostMsgResViewModel>> SendPostMsg(SendPostMsgReqViewModel model)
        {
            try
            {
                return await PostService.SendPostMsg(model);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"發送貼文留言失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse<GetPostMsgResViewModel>();
            }
        }
    }
}