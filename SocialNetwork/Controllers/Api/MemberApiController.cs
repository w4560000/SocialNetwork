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
        /// <param name="model">登入 Req ViewModel</param>
        /// <returns>登入結果</returns>
        [AllowAnonymous]
        [HttpPost(nameof(Login))]
        public ResponseViewModel Login(LoginReqViewModel model)
        {
            try
            {
                return this.MemberService.Login(model);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"登入失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse();
            }
        }

        /// <summary>
        /// 註冊
        /// </summary>
        /// <param name="model">註冊 Req ViewModel</param>
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
        /// <param name="model">寄送驗證碼 Req ViewModel</param>
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

        /// <summary>
        /// 更新會員公開資訊
        /// </summary>
        /// <param name="model">更新會員公開資訊 Req ViewModel</param>
        /// <returns>更新結果</returns>
        [HttpPost(nameof(UpdateMemberPublicInfo))]
        public ResponseViewModel UpdateMemberPublicInfo(UpdateMemberPublicInfoReqViewModel model)
        {
            try
            {
                return this.MemberService.UpdateMemberPublicInfo(model);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"更新使用者資訊失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse();
            }
        }

        /// <summary>
        /// 重設密碼 Step1
        /// 申請重設密碼、建立重設密碼URL
        /// </summary>
        /// <param name="model">重設密碼 Step1 Req ViewModel</param>
        /// <returns>申請結果</returns>
        [HttpPost(nameof(ResetPassword))]
        [AllowAnonymous]
        public ResponseViewModel ResetPassword(ResetPasswordReqViewModel model)
        {
            try
            {
                return this.MemberService.ResetPassword(model);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"申請重設密碼失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse();
            }
        }

        /// <summary>
        /// 重設密碼 Step2
        /// </summary>
        /// <param name="model">重設密碼 Step2 Req ViewModel</param>
        /// <returns>申請結果</returns>
        [HttpPost(nameof(ResetPasswordConfirm))]
        [AllowAnonymous]
        public ResponseViewModel ResetPasswordConfirm(ResetPasswordConfirmReqViewModel model)
        {
            try
            {
                return this.MemberService.ResetPasswordConfirm(model);
            }
            catch (Exception ex)
            {
                this.Logger.LogCritical(ex, $"申請重設密碼失敗，{ex.GetExceptionMessage()}");
                return CommonExtension.AsSystemFailResponse();
            }
        }
    }
}