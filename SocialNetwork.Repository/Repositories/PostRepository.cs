using Dapper;
using SocialNetwork.Helper;
using SocialNetwork.Repository.Base;
using System.Threading.Tasks;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 貼文 儲存庫
    /// </summary>
    public class PostRepository : RepositoryBase<Post>, IPostRepository
    {
        /// <summary>
        /// IUserContext
        /// </summary>
        private readonly IUserContext UserContext;

        /// <summary>
        /// Construct
        /// </summary>
        /// <param name="userContext">IUserContext</param>
        /// <param name="factory">IPostgreSqlConnectionFactory</param>
        /// <param name="configHelper">IConfigHelper</param>
        public PostRepository(
            IUserContext userContext,
            ISQLServerConnectionFactory factory,
            IConfigHelper configHelper) : base(userContext, factory, configHelper)
        {
            this.UserContext = userContext;
        }
    }
}