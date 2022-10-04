using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
        /// 重設密碼頁
        /// </summary>
        /// <param name="guid">guid</param>
        /// <returns>登入頁</returns>
        [HttpGet("Member/ResetPassword/{guid}")]
        [AllowAnonymous]
        public IActionResult ResetPassword(string guid)
        {
            var isGuidExist = this.MemberService.CheckResetPasswordGuid(guid);

            if(!isGuidExist)
                return NotFound();

            this.ViewBag.Guid = guid;

            return View();
        }
    }
}