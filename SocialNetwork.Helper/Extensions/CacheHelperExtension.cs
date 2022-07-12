using System;
using System.Collections.Generic;
using System.Text;

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
        public static T Get<T>(this ICacheHelper cacheHelper, string key, Func<T> acquire)
        {
            return Get(cacheHelper, key, 60, acquire);
        }

        /// <summary>
        /// 取得或依據委派初始化快取內容, 設定的快取內容存留時間參考 cacheSeconds
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="cacheHelper"></param>
        /// <param name="key"></param>
        /// <param name="cacheSeconds"></param>
        /// <param name="acquire"></param>
        /// <returns></returns>
        public static T Get<T>(this ICacheHelper cacheHelper, string key, int cacheSeconds, Func<T> acquire)
        {
            if (cacheHelper.IsSet(key))
            {
                return cacheHelper.Get<T>(key);
            }

            T result = acquire();

            cacheHelper.Set(key, result, cacheSeconds);

            return result;
        }
    }

}
