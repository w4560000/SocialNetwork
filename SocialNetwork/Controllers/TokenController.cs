using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Helper;
using System.Linq;

namespace SocialNetwork.Controllers
{
    /// <summary>
    /// 測試Token Controller
    /// </summary>
    [Authorize]
    [ApiController]
    public class TokenController : ControllerBase
    {
        /// <summary>
        /// JwtHelper
        /// </summary>
        private readonly JwtHelper JwtHelper;

        /// <summary>
        /// HttpContext
        /// </summary>
        private readonly HttpContext HttpContext;

        /// <summary>
        /// IUserContext
        /// </summary>
        private readonly IUserContext UserContext;

        /// <summary>
        /// Construct
        /// </summary>
        /// <param name="jwtHelper">JwtHelper</param>
        /// <param name="httpContextAccessor">IHttpContextAccessor</param>
        /// <param name="userContext">IUserContext</param>
        public TokenController(
            JwtHelper jwtHelper,
            IHttpContextAccessor httpContextAccessor,
            IUserContext userContext)
        {
            this.JwtHelper = jwtHelper;
            this.HttpContext = httpContextAccessor.HttpContext;
            this.UserContext = userContext;
        }

        [AllowAnonymous]
        [HttpPost("~/signin")]
        public ActionResult<string> SignIn(UserInfo login)
        {
            if (ValidateUser())
            {
                return JwtHelper.GenerateToken(login);
            }
            else
            {
                return BadRequest();
            }
        }

        private bool ValidateUser()
        {
            return true; // TODO
        }

        [HttpGet("~/claims")]
        public IActionResult GetClaims()
        {
            return Ok(User.Claims.Select(p => new { p.Type, p.Value }));
        }

        [HttpGet("~/username")]
        public IActionResult GetUserName()
        {
            return Ok(User.Identity.Name);
        }

        [HttpGet("~/GetUserInfo")]
        public IActionResult GetUserInfo()
        {
            return Ok(JwtHelper.GetUserInfoFromJwtToken(HttpContext.Request.Cookies.GetJwtTokenFromCookie()));
        }

        [HttpGet("~/GetUserInfoV2")]
        public IActionResult GetUserInfoV2()
        {
            return Ok(this.UserContext.User);
        }
    }
}