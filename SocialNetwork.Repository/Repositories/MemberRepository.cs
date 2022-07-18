using SocialNetwork.Helper;
using SocialNetwork.Repository.Base;
using Dapper;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 會員 Repository
    /// </summary>
    public class MemberRepository : RepositoryBase<Member>, IMemberRepository
    {
        /// <summary>
        /// Construct
        /// </summary>
        /// <param name="userContext">IUserContext</param>
        /// <param name="factory">IPostgreSqlConnectionFactory</param>
        /// <param name="configHelper">IConfigHelper</param>
        public MemberRepository(
            IUserContext userContext,
            ISQLServerConnectionFactory factory,
            IConfigHelper configHelper) : base(userContext, factory, configHelper)
        {
        }

        /// <summary>
        /// 檢查會員帳號和信箱是否已存在
        /// </summary>
        /// <param name="account">會員帳號</param>
        /// <param name="mail">會員信箱</param>
        /// <returns>檢查結果</returns>
        public bool CheckMemberExist(string account, string mail)
        {
            return this.Connection.RecordCount<Member>("WHERE Account = @account OR Mail = @mail", new { account, mail }) > 0;
        }
    }
}