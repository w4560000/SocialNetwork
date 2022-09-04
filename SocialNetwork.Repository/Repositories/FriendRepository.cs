using SocialNetwork.Helper;
using SocialNetwork.Repository.Base;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 好友 儲存庫
    /// </summary>
    public class FriendRepository : RepositoryBase<Friend>, IFriendRepository
    {
        /// <summary>
        /// Construct
        /// </summary>
        /// <param name="userContext">IUserContext</param>
        /// <param name="factory">IPostgreSqlConnectionFactory</param>
        /// <param name="configHelper">IConfigHelper</param>
        public FriendRepository(
            IUserContext userContext,
            ISQLServerConnectionFactory factory,
            IConfigHelper configHelper) : base(userContext, factory, configHelper)
        {
        }
    }
}