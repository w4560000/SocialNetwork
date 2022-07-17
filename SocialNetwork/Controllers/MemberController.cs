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
        /// <returns>登入頁</returns>
        [AllowAnonymous]
        [HttpPost]
        public ResponseViewModel<object> Login(LoginViewModel model)
        {
            return "登入成功".AsSuccessResponse<object>(null);
        }
    }
}