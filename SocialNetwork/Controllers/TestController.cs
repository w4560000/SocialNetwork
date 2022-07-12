using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SocialNetwork.Helper;
using SocialNetwork.Repository;
using SocialNetwork.Service;
using System.Threading.Tasks;

namespace SocialNetwork.Controllers
{
    /// <summary>
    /// test 測試測試
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        /// <summary>
        /// 快取
        /// </summary>
        private readonly ICacheHelper CacheHelper;

        /// <summary>
        /// AppSettings
        /// </summary>
        private readonly AppSettings AppSettings;

        /// <summary>
        /// ITestService
        /// </summary>
        private readonly ITestService TestService;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="cacheHelper">ICacheHelper</param>
        /// <param name="appSettings">IOptions AppSettings</param>
        /// <param name="testService">ITestService</param>
        public TestController(
            ICacheHelper cacheHelper,
            IOptions<AppSettings> appSettings,
            ITestService testService)
        {
            this.CacheHelper = cacheHelper;
            this.AppSettings = appSettings.Value;
            this.TestService = testService;
        }

        /// <summary>
        /// 測試 AppSettings
        /// </summary>
        /// <returns>RedisSettings.Connection</returns>
        [HttpGet(nameof(AppSettingsTest))]
        public string AppSettingsTest()
        {
            return AppSettings.RedisSettings.Connection;
        }

        /// <summary>
        /// 測試 Redis
        /// </summary>
        /// <returns>Redis Value</returns>
        [HttpGet(nameof(RedisTest))]
        public string RedisTest()
        {
            return this.CacheHelper.Get(
                    $"USER:1",
                    24 * 60 * 60,
                    () =>
                    {
                        return "123";
                    });
        }

        /// <summary>
        /// 測試 PostgreSQL
        /// </summary>
        /// <returns>testname</returns>
        [HttpGet(nameof(PostgreSQLTest))]
        public string PostgreSQLTest()
        {
            return this.TestService.Test();
        }
    }
}