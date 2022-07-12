namespace SocialNetwork.Helper
{
    /// <summary>
    /// User context
    /// </summary>
    public interface IUserContext
    {
        /// <summary>
        /// 登入使用者帳號資訊
        /// </summary>
        UserInfo User { get; }
    }
}