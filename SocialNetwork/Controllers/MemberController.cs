using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SocialNetwork.Helper;
using SocialNetwork.Repository;
using SocialNetwork.Service;

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
            if (!ModelState.IsValid)
                return ModelState.AsFailResponse();

            this.MemberService.Signup(model);
            return "註冊成功".AsSuccessResponse();
        }
    }
}