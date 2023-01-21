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

        /// <summary>
        /// 貼文按讚 or 取消按讚
        /// </summary>
        /// <param name="model">貼文按讚 or 取消按讚 Req ViewModel</param>
        public async Task TogglePostLike(TogglePostLikeViewModel model)
        {
            string sql = @$"
MERGE INTO [dbo].[PostLike] a
USING (
		SELECT @PostKey AS 'PostKey', @MemberID AS 'MemberID', @Toggle AS 'Toggle'
	  ) data ON a.PostKey = data.PostKey AND a.MemberID = data.MemberID
WHEN MATCHED AND Toggle = {(int)ToggleEnum.Off} THEN
	DELETE
WHEN NOT MATCHED AND data.Toggle = {(int)ToggleEnum.On} THEN
	INSERT VALUES (data.PostKey, data.MemberID, GETDATE(), data.MemberID, GETDATE(), data.MemberID);";

            await this.Connection.ExecuteAsync(sql, new { model.PostKey, model.Toggle, this.UserContext.User.MemberID });
        }
    }
}