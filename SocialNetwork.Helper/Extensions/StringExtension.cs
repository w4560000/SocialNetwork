namespace SocialNetwork.Helper
{
    /// <summary>
    /// StringExtension
    /// </summary>
    public static class StringExtension
    {
        /// <summary>
        /// 轉為小駝峰
        /// </summary>
        /// <param name="orignnal">原始字串</param>
        /// <returns>小駝峰字串</returns>
        public static string ToLowerCamel(this string orignnal)
        {
            return orignnal.Replace(orignnal.Substring(0, 1), orignnal.Substring(0, 1).ToLower());
        }
    }
}