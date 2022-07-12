using Microsoft.AspNetCore.Http;
using SocialNetwork.Helper;

namespace SocialNetwork
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
        /// HttpContext
        /// </summary>
        private readonly HttpContext HttpContext;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="cacheHelper">快取</param>
        /// <param name="httpContextAccessor">IHttpContextAccessor</param>
        public UserContext(
            ICacheHelper cacheHelper,
            IHttpContextAccessor httpContextAccessor)
        {
            this.CacheHelper = cacheHelper;
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
                    Id = "000000",
                    UserName = "System"
                };

                if (HttpContext == null)
                {
                    return systemAccount;
                }

                return systemAccount;
            }
        }
    }
}