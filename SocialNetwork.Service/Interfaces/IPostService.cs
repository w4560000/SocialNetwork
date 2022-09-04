using SocialNetwork.Helper;
using SocialNetwork.Repository;
using System.Threading.Tasks;

namespace SocialNetwork.Service
{
    /// <summary>
    /// IPostService
    /// </summary>
    public interface IPostService
    {
        /// <summary>
        /// 發佈貼文
        /// </summary>
        /// <param name="model">發佈貼文 Req Model</param>
        /// <returns>發佈結果</returns>
        public Task<ResponseViewModel> PublishPostAsync(PublishPostReqViewModel model);
    }
}