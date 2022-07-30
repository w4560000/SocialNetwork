namespace SocialNetwork.Repository
{
    /// <summary>
    /// Google 第三方登入 Request ViewModel
    /// </summary>
    public class GoogleLoginReqViewModel
    {
        /// <summary>
        /// Google 授權驗證碼
        /// </summary>
        public string Code { get; set; }
    }
}