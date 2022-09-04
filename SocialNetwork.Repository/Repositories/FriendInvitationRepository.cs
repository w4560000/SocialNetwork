using SocialNetwork.Helper;
using SocialNetwork.Repository.Base;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 好友邀請 儲存庫
    /// </summary>
    public class FriendInvitationRepository : RepositoryBase<FriendInvitation>, IFriendInvitationRepository
    {
        /// <summary>
        /// Construct
        /// </summary>
        /// <param name="userContext">IUserContext</param>
        /// <param name="factory">IPostgreSqlConnectionFactory</param>
        /// <param name="configHelper">IConfigHelper</param>
        public FriendInvitationRepository(
            IUserContext userContext,
            ISQLServerConnectionFactory factory,
            IConfigHelper configHelper) : base(userContext, factory, configHelper)
        {
        }
    }
}