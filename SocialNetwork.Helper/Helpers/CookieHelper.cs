using Microsoft.AspNetCore.Http;

namespace SocialNetwork.Helper
{
    /// <summary>
    /// CookieHelper
    /// </summary>
    public static class CookieHelper
    {
        /// <summary>
        /// AddJwtTokenToCookie
        /// </summary>
        /// <param name="cookies">response cookie</param>
        /// <param name="token">Jwt Token</param>
        public static void AddJwtTokenToCookie(this IResponseCookies cookies, string token)
        {
            var cookieOptions = new CookieOptions
            {
                Secure = true,
                HttpOnly = true,
                SameSite = SameSiteMode.Lax
            };

            cookies.Append("X-Access-Token", token, cookieOptions);
        }

        /// <summary>
        /// 從 cookie 取得 JWT token
        /// </summary>
        /// <param name="cookies">HttpCookieCollection</param>
        /// <returns>JwtTokenDto</returns>
        public static string GetJwtTokenFromCookie(this IRequestCookieCollection cookies)
        {
            return cookies["X-Access-Token"];
        }
    }
}