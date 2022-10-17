using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SocialNetwork.Helper;
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
        /// IUserContext
        /// </summary>
        private readonly IUserContext UserContext;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="logger">Logger</param>
        /// <param name="memberService">IMemberService</param>
        /// <param name="userContext">IUserContext</param>
        public HomeController(
            ILogger<HomeController> logger,
            IMemberService memberService,
            IUserContext userContext)
        {
            this.Logger = logger;
            this.MemberService = memberService;
            this.UserContext = userContext;
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
        /// <param name="memberIDStr">會員編號</param>
        /// <returns>個人主頁</returns>
        [HttpGet("Home/HomePage")]
        [HttpGet("Home/HomePage/{memberIDStr}")]
        public IActionResult HomePage(string memberIDStr = "")
        {
            // memberIDStr 不為數字 則帶空
            this.ViewBag.QueryMemberID = int.TryParse(memberIDStr, out int memberID) ? memberID.ToString() : "";

            // memberIDStr 為自己 則帶空
            if (this.UserContext.User.MemberID == memberID)
                this.ViewBag.QueryMemberID = "";

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

        /// <summary>
        /// 錯誤頁
        /// </summary>
        /// <returns>錯誤頁</returns>
        [AllowAnonymous]
        public IActionResult Error()
        {
            return View();
        }
    }
}