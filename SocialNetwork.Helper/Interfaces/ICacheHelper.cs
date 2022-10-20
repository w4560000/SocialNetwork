using System;
using System.Threading.Tasks;

namespace SocialNetwork.Helper
{
    /// <summary>
    /// 快取介面
    /// </summary>
    public interface ICacheHelper
    {
        /// <summary>
        /// 清除所有快取
        /// </summary>
        void Clear();

        /// <summary>
        /// 清除所有快取
        /// </summary>
        Task ClearAsync();

        /// <summary>
        /// 取得快取內容
        /// </summary>
        /// <typeparam name="T">Type</typeparam>
        /// <param name="key">The key of the value to get.</param>
        /// <returns>The value associated with the specified key.</returns>
        T Get<T>(string key);

        /// <summary>
        /// 取得快取內容
        /// </summary>
        /// <typeparam name="T">Type</typeparam>
        /// <param name="key">The key of the value to get.</param>
        /// <returns>The value associated with the specified key.</returns>
        Task<T> GetAsync<T>(string key);

        /// <summary>
        /// 確定快取鍵值是否存在
        /// </summary>
        /// <param name="key">The key of the value to get.</param>
        /// <returns>Result</returns>
        bool IsSet(string key);

        /// <summary>
        /// 確定快取鍵值是否存在
        /// </summary>
        /// <param name="key">The key of the value to get.</param>
        /// <returns>Result</returns>
        Task<bool> IsSetAsync(string key);

        /// <summary>
        /// Removes the value with the specified key from the cache 移除快取內容
        /// </summary>
        /// <param name="key">The key of the value to remove.</param>
        void Remove(string key);

        /// <summary>
        /// Removes the value with the specified key from the cache 移除快取內容
        /// </summary>
        /// <param name="key">The key of the value to remove.</param>
        Task RemoveAsync(string key);

        /// <summary>
        /// 依據鍵值樣式移除快取內容
        /// </summary>
        /// <param name="pattern">
        /// h?llo matches hello, hallo and hxllo h*lo matches hllo and heeeello h[ae]llo matches
        /// hello and hallo, but not hillo h[^e]llo matches hallo, hbllo, ... but not hello h[a-b]llo
        /// matches hallo and hbllo
        /// </param>
        void RemoveByPattern(string pattern);

        /// <summary>
        /// 依據鍵值樣式移除快取內容
        /// </summary>
        /// <param name="pattern">
        /// h?llo matches hello, hallo and hxllo h*lo matches hllo and heeeello h[ae]llo matches
        /// hello and hallo, but not hillo h[^e]llo matches hallo, hbllo, ... but not hello h[a-b]llo
        /// matches hallo and hbllo
        /// </param>
        Task RemoveByPatternAsync(string pattern);

        /// <summary>
        /// 指定快取內容
        /// </summary>
        /// <param name="key">The key of the value to get.</param>
        /// <param name="data">資料</param>
        /// <param name="expiry">到期時間 (null = 無到期時間)</param>
        void Set(string key, object data, TimeSpan? expiry);

        /// <summary>
        /// 指定快取內容
        /// </summary>
        /// <param name="key">The key of the value to get.</param>
        /// <param name="data">資料</param>
        /// <param name="expiry">到期時間 (null = 無到期時間)</param>
        Task SetAsync(string key, object data, TimeSpan? expiry);
    }
}