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
        /// 取得快取內容
        /// </summary>
        /// <typeparam name="T">Type</typeparam>
        /// <param name="key">The key of the value to get.</param>
        /// <returns>The value associated with the specified key.</returns>
        T Get<T>(string key);

        /// <summary>
        /// 確定快取鍵值是否存在
        /// </summary>
        /// <param name="key">The key of the value to get.</param>
        /// <returns>Result</returns>
        bool IsSet(string key);

        /// <summary>
        /// Removes the value with the specified key from the cache 移除快取內容
        /// </summary>
        /// <param name="key">The key of the value to remove.</param>
        void Remove(string key);

        /// <summary>
        /// 依據鍵值樣式移除快取內容
        /// </summary>
        /// <param name="pattern">pattern</param>
        void RemoveByPattern(string pattern);

        /// <summary>
        /// 指定快取內容
        /// </summary>
        /// <param name="key">The key of the value to set.</param>
        /// <param name="data">The value associated with the specified key.</param>
        /// <param name="cacheSeconds">Cache time (seconds)</param>
        void Set(string key, object data, int cacheSeconds);
    }
}