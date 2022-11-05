using SocialNetwork.Helper;
using SocialNetwork.Repository;
using System.Collections.Generic;
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
        /// <param name="model">發佈貼文 Request ViewModel</param>
        /// <returns>發佈結果</returns>
        public Task<ResponseViewModel> PublishPostAsync(PublishPostReqViewModel model);


        /// <summary>
        /// 取得會員貼文
        /// </summary>
        /// <param name="model">取得會員貼文 Request ViewModel</param>
        /// <returns>取得結果</returns>
        public Task<ResponseViewModel<List<GetPostResViewModel>>> GetMemberPost(CommonMemberViewModel model);
    }
}