using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SocialNetwork.Helper;
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
    }
}