using SocialNetwork.Helper;
using SocialNetwork.Repository.Base;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 忘記密碼 Repository
    /// </summary>
    public class ForgotPasswordRepository : RepositoryBase<ForgotPassword>, IForgotPasswordRepository
    {
        /// <summary>
        /// Construct
        /// </summary>
        /// <param name="userContext">IUserContext</param>
        /// <param name="factory">IPostgreSqlConnectionFactory</param>
        /// <param name="configHelper">IConfigHelper</param>
        public ForgotPasswordRepository(
            IUserContext userContext,
            ISQLServerConnectionFactory factory,
            IConfigHelper configHelper) : base(userContext, factory, configHelper)
        {
        }
    }
}