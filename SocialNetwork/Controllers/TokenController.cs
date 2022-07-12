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
        /// JwtHelpers
        /// </summary>
        private readonly JwtHelpers JwtHelpers;

        /// <summary>
        /// HttpContext
        /// </summary>
        private readonly HttpContext HttpContext;

        /// <summary>
        /// Construct
        /// </summary>
        /// <param name="jwtHelpers">JwtHelpers</param>
        /// <param name="httpContextAccessor">IHttpContextAccessor</param>
        public TokenController(
            JwtHelpers jwtHelpers,
            IHttpContextAccessor httpContextAccessor)
        {
            this.JwtHelpers = jwtHelpers;
            this.HttpContext = httpContextAccessor.HttpContext;
        }

        [AllowAnonymous]
        [HttpPost("~/signin")]
        public ActionResult<string> SignIn(LoginViewModel login)
        {
            if (ValidateUser(login))
            {
                return JwtHelpers.GenerateToken(login.Username);
            }
            else
            {
                return BadRequest();
            }
        }

        private bool ValidateUser(LoginViewModel login)
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

        [HttpGet("~/jwtid")]
        public IActionResult GetUniqueId()
        {
            var jti = User.Claims.FirstOrDefault(p => p.Type == "jti");
            return Ok(jti.Value);
        }
    }

    public class LoginViewModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}