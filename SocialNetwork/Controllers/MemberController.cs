using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
        /// Constructor
        /// </summary>
        public MemberController(
            ILogger<MemberController> logger)
        {
            this.Logger = logger;
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
    }
}