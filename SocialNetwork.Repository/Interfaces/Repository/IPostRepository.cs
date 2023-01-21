using SocialNetwork.Repository.Base;
using System.Threading.Tasks;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// IPostRepository
    /// </summary>
    public interface IPostRepository : IGenericRepository<Post>
    {
        /// <summary>
        /// 貼文按讚 or 取消按讚
        /// </summary>
        /// <param name="model">貼文按讚 or 取消按讚 Req ViewModel</param>
        Task TogglePostLike(TogglePostLikeViewModel model);
    }
}