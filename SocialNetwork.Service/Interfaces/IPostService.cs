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
        Task<ResponseViewModel> PublishPostAsync(PublishPostReqViewModel model);

        /// <summary>
        /// 取得貼文 (自己和朋友)
        /// </summary>
        /// <param name="model">取得貼文 (自己和朋友) Request ViewModel</param>
        /// <returns>取得結果</returns>
        Task<ResponseViewModel<List<GetPostResViewModel>>> GetHomeIndexPost(QueryRowMemberViewModel model);

        /// <summary>
        /// 取得會員貼文
        /// </summary>
        /// <param name="model">取得會員貼文 Request ViewModel</param>
        /// <returns>取得結果</returns>
        Task<ResponseViewModel<List<GetPostResViewModel>>> GetMemberPost(QueryRowMemberViewModel model);
    }
}