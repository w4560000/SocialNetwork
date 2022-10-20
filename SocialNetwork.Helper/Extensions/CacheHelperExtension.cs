using System;
using System.Threading.Tasks;

namespace SocialNetwork.Helper
{
    /// <summary>
    /// 根據 ICacheProvider 的 Cache-Aside pattern
    /// </summary>
    public static class CacheHelperExtension
    {
        /// <summary>
        /// 取得或依據委派初始化快取內容
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="cacheHelper"></param>
        /// <param name="key"></param>
        /// <param name="acquire"></param>
        /// <returns></returns>
        public static async Task<T> GetAsync<T>(this ICacheHelper cacheHelper, string key, Func<T> acquire)
        {
            return await GetAsync(cacheHelper, key, acquire, 60);
        }

        /// <summary>
        /// 取得或依據委派初始化快取內容, 設定的快取內容存留時間參考 cacheSeconds
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="cacheHelper"></param>
        /// <param name="key"></param>
        /// <param name="acquire"></param>
        /// <param name="cacheSeconds"></param>
        /// <returns></returns>
        public static async Task<T> GetAsync<T>(this ICacheHelper cacheHelper, string key, Func<T> acquire, int cacheSeconds = 0)
        {
            if (await cacheHelper.IsSetAsync(key))
            {
                return await cacheHelper.GetAsync<T>(key);
            }

            T result = acquire();
            TimeSpan? expiry = cacheSeconds == 0 ? (TimeSpan?)null : TimeSpan.FromSeconds(cacheSeconds);

            await cacheHelper.SetAsync(key, result, expiry);

            return result;
        }

        /// <summary>
        /// 更新依據委派初始化快取內容, 設定的快取內容存留時間參考 cacheSeconds
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="cacheHelper"></param>
        /// <param name="key"></param>
        /// <param name="cacheSeconds"></param>
        /// <param name="acquire"></param>
        /// <returns></returns>
        public static async Task<T> ResetAsync<T>(this ICacheHelper cacheHelper, string key, Func<T> acquire, int cacheSeconds = 0)
        {
            await cacheHelper.RemoveAsync(key);

            T result = acquire();
            TimeSpan? expiry = cacheSeconds == 0 ? (TimeSpan?)null : TimeSpan.FromSeconds(cacheSeconds);

            await cacheHelper.SetAsync(key, result, expiry);

            return result;
        }
    }
}