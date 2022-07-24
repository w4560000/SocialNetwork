using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SocialNetwork.Helper;
using SocialNetwork.Repository;
using SocialNetwork.Service;
using System;

namespace SocialNetwork.Controllers
{
    /// <summary>
    /// MemberController
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class MemberApiController : ControllerBase
    {
        /// <summary>
        /// Logger
        /// </summary>
        private readonly ILogger<MemberApiController> Logger;

        /// <summary>
        /// IMemberService
        /// </summary>
        private readonly IMemberService MemberService;

        /// <summary>
        /// Constructor
        /// </summary>
        public MemberApiController(
            ILogger<MemberApiController> logger,
            IMemberService memberService)
        {
            this.Logger = logger;
            this.MemberService = memberService;
        }

        /// <summary>
        /// 登入
        /// </summary>
        /// <param name="model">viewModel</param>
        /// <returns>登入結果</returns>
        [AllowAnonymous]
        [HttpPost(nameof(Login))]
        public ResponseViewModel Login(LoginReqViewModel model)
        {
            return "登入成功".AsSuccessResponse();
        }

        /// <summary>
        /// 註冊
        /// </summary>
        /// <param name="model">viewModel</param>
        /// <returns>註冊結果</returns>
        [AllowAnonymous]
        [HttpPost(nameof(Signup))]
        public ResponseViewModel Signup(SingupReqViewModel model)
        {
            try
            {
                return this.MemberService.Signup(model);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"註冊失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse();
            }
        }

        /// <summary>
        /// 寄送驗證碼
        /// </summary>
        /// <param name="model">viewModel</param>
        /// <returns>寄送結果</returns>
        [AllowAnonymous]
        [HttpPost(nameof(SendVCode))]
        public ResponseViewModel SendVCode(SendVCodeReqViewModel model)
        {
            try
            {
                return this.MemberService.SendVCode(model);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"寄送驗證碼失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse();
            }
        }
    }
}