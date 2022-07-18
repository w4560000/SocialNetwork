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
    public class MemberController : Controller
    {
        /// <summary>
        /// Logger
        /// </summary>
        private readonly ILogger<MemberController> Logger;

        /// <summary>
        /// IMemberService
        /// </summary>
        private readonly IMemberService MemberService;

        /// <summary>
        /// Constructor
        /// </summary>
        public MemberController(
            ILogger<MemberController> logger,
            IMemberService memberService)
        {
            this.Logger = logger;
            this.MemberService = memberService;
        }

        /// <summary>
        /// 登入頁
        /// </summary>
        /// <param name="returnUrl">返回網址</param>
        /// <returns>登入頁</returns>
        [AllowAnonymous]
        public IActionResult Login(string returnUrl)
        {
            this.ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        /// <summary>
        /// 登入
        /// </summary>
        /// <param name="model">viewModel</param>
        /// <returns>登入結果</returns>
        [AllowAnonymous]
        [HttpPost]
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
        [HttpPost]
        public ResponseViewModel Signup(SingupReqViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return ModelState.AsFailResponse();

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
        [HttpPost]
        public ResponseViewModel SendVCode(SendVCodeReqViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return ModelState.AsFailResponse();

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