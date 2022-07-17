namespace SocialNetwork.Repository
{
    /// <summary>
    /// IMemberRepository
    /// </summary>
    public interface IMemberRepository
    {
        /// <summary>
        /// 檢查會員帳號和會員信箱是否已存在
        /// </summary>
        /// <param name="account">會員帳號</param>
        /// <param name="mail">會員信箱</param>
        /// <returns>檢查結果</returns>
        bool CheckMemberExist(string account, string mail);
    }
}