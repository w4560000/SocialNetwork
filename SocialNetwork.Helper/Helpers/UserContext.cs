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
        /// IHttpContextAccessor
        /// </summary>
        private readonly IHttpContextAccessor HttpContextAccessor;

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
            this.HttpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// 登入使用者帳號資訊
        /// </summary>
        public UserInfo User
        {
            get
            {
                var context = HttpContextAccessor.HttpContext;

                UserInfo systemAccount = new UserInfo()
                {
                    MemberID = 0,
                    Account = "System"
                };

                if (context == null || string.IsNullOrEmpty(context.Request.Cookies.GetJwtTokenFromCookie()))
                {
                    return systemAccount;
                }

                return JwtHelper.GetUserInfoFromJwtToken(context.Request.Cookies.GetJwtTokenFromCookie());
            }
        }
    }
}