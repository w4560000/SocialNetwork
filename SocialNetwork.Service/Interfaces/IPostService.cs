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
        /// 取得首頁貼文 (自己和朋友)
        /// </summary>
        /// <param name="model">取得貼文 (自己和朋友) Request ViewModel</param>
        /// <returns>取得結果</returns>
        Task<ResponseViewModel<List<GetPostResViewModel>>> GetIndexPost(QueryRowMemberReqViewModel model);

        /// <summary>
        /// 取得會員個人貼文
        /// </summary>
        /// <param name="model">取得會員貼文 Request ViewModel</param>
        /// <returns>取得結果</returns>
        Task<ResponseViewModel<List<GetPostResViewModel>>> GetHomePagePost(QueryRowMemberReqViewModel model);

        /// <summary>
        /// 取得該貼文所有留言
        /// </summary>
        /// <param name="model">取得該貼文所有留言 Request ViewModel</param>
        /// <returns>取得結果</returns>
        Task<ResponseViewModel<List<GetPostMsgResViewModel>>> GetPostAllMsg(CommonPostViewModel model);

        /// <summary>
        /// 貼文按讚 or 取消按讚
        /// </summary>
        /// <param name="model">貼文按讚 or 取消按讚 Request ViewModel</param>
        /// <returns>操作結果</returns>
        Task<ResponseViewModel> TogglePostLike(TogglePostLikeViewModel model);

        /// <summary>
        /// 發送貼文留言
        /// </summary>
        /// <param name="model">發送貼文留言 Request ViewModel</param>
        /// <returns>發送結果</returns>
        Task<ResponseViewModel<GetPostMsgResViewModel>> SendPostMsg(SendPostMsgReqViewModel model);

        /// <summary>
        /// 刪除貼文
        /// </summary>
        /// <param name="model">刪除貼文 Request ViewModel</param>
        /// <returns>刪除結果</returns>
        Task<ResponseViewModel> DeletePostAsync(CommonPostViewModel model);
    }
}