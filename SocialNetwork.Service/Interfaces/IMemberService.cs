using SocialNetwork.Helper;
using SocialNetwork.Repository;

namespace SocialNetwork.Service
{
    /// <summary>
    /// IMemberService
    /// </summary>
    public interface IMemberService
    {
        /// <summary>
        /// 註冊
        /// </summary>
        /// <param name="model">註冊 Req ViewModel</param>
        /// <returns>註冊結果</returns>
        ResponseViewModel Signup(SingupReqViewModel model);

        /// <summary>
        /// 寄送驗證碼
        /// </summary>
        /// <param name="model">寄送驗證碼 Req ViewModel</param>
        /// <returns>寄送結果</returns>
        ResponseViewModel SendVCode(SendVCodeReqViewModel model);

        /// <summary>
        /// 登入
        /// </summary>
        /// <param name="model">登入 Req ViewModel</param>
        /// <returns>登入結果</returns>
        ResponseViewModel Login(LoginReqViewModel model);

        /// <summary>
        /// 更新會員公開資訊
        /// </summary>
        /// <param name="model">更新會員公開資訊 Req viewModel</param>
        /// <returns>更新結果</returns>
        public ResponseViewModel UpdateMemberPublicInfo(UpdateMemberPublicInfoReqViewModel model);
    }
}