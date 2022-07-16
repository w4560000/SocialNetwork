using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SocialNetwork.Repository;
using SocialNetwork.Service;

namespace SocialNetwork.Controllers
{
    /// <summary>
    /// HomeController
    /// </summary>
    public class HomeController : Controller
    {
        /// <summary>
        /// Logger
        /// </summary>
        private readonly ILogger<HomeController> Logger;

        /// <summary>
        /// IMemberService
        /// </summary>
        private readonly IMemberService MemberService;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="logger">Logger</param>
        /// <param name="memberService">IMemberService</param>
        public HomeController(
            ILogger<HomeController> logger,
            IMemberService memberService)
        {
            Logger = logger;
            MemberService = memberService;
        }

        /// <summary>
        /// 登入後首頁
        /// </summary>
        /// <returns>登入後首頁</returns>
        public IActionResult Index()
        {
            return View();
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
        public IActionResult Login(LoginViewModel model)
        {
            return Ok();
        }

    }
}