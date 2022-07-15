using Microsoft.AspNetCore.Http;

namespace SocialNetwork.Helper
{
    /// <summary>
    /// User context
    /// </summary>
    public class UserContext : IUserContext
    {
        /// <summary>
        /// 快取
        /// </summary>
        private readonly ICacheHelper CacheHelper;

        /// <summary>
        /// JwtHelper
        /// </summary>
        private readonly JwtHelper JwtHelper;

        /// <summary>
        /// HttpContext
        /// </summary>
        private readonly HttpContext HttpContext;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="cacheHelper">快取</param>
        /// <param name="jwtHelper">JwtHelper</param>
        /// <param name="httpContextAccessor">IHttpContextAccessor</param>
        public UserContext(
            ICacheHelper cacheHelper,
            JwtHelper jwtHelper,
            IHttpContextAccessor httpContextAccessor)
        {
            this.CacheHelper = cacheHelper;
            this.JwtHelper = jwtHelper;
            this.HttpContext = httpContextAccessor.HttpContext;
        }

        /// <summary>
        /// 登入使用者帳號資訊
        /// </summary>
        public UserInfo User
        {
            get
            {
                UserInfo systemAccount = new UserInfo()
                {
                    MemberID = 0,
                    Account = "System"
                };

                if (HttpContext == null)
                {
                    return systemAccount;
                }

                return JwtHelper.GetUserInfoFromJwtToken(HttpContext.Request.Cookies.GetJwtTokenFromCookie());
            }
        }
    }
}