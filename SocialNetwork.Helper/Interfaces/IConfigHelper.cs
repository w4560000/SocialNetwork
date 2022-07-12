using System;

namespace SocialNetwork.Helper
{
    public interface IConfigHelper
    {
        /// <summary>
        /// 讀取 config 中指定鍵值的設定值內容，可帶入第二參數 defaultValue 作為預設值
        /// </summary>
        /// <param name="key">鍵值</param>
        /// <param name="defaultValue">預設值，該無鍵值則回傳預設值</param>
        /// <returns>設定值內容</returns>
        string Get(string key, string defaultValue = null);

        /// <summary>
        /// 讀取 config 中指定鍵值的設定值內容，完成轉型傳回指定型別，無預設值
        /// </summary>
        /// <typeparam name="T">取回的內容完轉換成該型別</typeparam>
        /// <param name="key">鍵值</param>
        /// <returns>轉型後內容</returns>
        T Get<T>(string key) where T : IConvertible;

        /// <summary>
        /// 讀取 config 中指定鍵值的設定值內容，完成轉型傳回指定型別，可帶入第二參數 defaultValue 作為預設值
        /// </summary>
        /// <typeparam name="T">取回的內容完轉換成該型別</typeparam>
        /// <param name="key">鍵值</param>
        /// <param name="defaultValue">預設值，該無鍵值則回傳預設值</param>
        /// <returns>轉型後內容</returns>
        T Get<T>(string key, T defaultValue) where T : IConvertible;
    }
}