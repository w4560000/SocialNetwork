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

        /// <summary>
        /// 個人主頁
        /// </summary>
        /// <returns>個人主頁</returns>
        public IActionResult HomePage()
        {
            return View();
        }

        /// <summary>
        /// 帳號設定頁
        /// </summary>
        /// <returns>帳號設定頁</returns>
        public IActionResult MemberSetting()
        {
            return View();
        }

        /// <summary>
        /// 好友管理頁
        /// </summary>
        /// <returns>好友管理頁</returns>
        public IActionResult FriendManagement()
        {
            return View();
        }
    }
}