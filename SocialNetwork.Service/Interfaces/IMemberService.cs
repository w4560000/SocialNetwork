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
        /// Google 第三方登入
        /// </summary>
        /// <param name="model">登入 Req ViewModel</param>
        /// <returns>登入結果</returns>
        ResponseViewModel GoogleLogin(GoogleOAuth_UserInfoResult model);

        /// <summary>
        /// 更新會員公開資訊
        /// </summary>
        /// <param name="model">更新會員公開資訊 Req viewModel</param>
        /// <returns>更新結果</returns>
        ResponseViewModel UpdateMemberPublicInfo(UpdateMemberPublicInfoReqViewModel model);

        /// <summary>
        /// 重設密碼 Step1
        /// 申請重設密碼、建立重設密碼URL
        /// </summary>
        /// <param name="model">重設密碼 Step1 Req ViewModel</param>
        /// <returns>申請結果</returns>
        ResponseViewModel ResetPassword(ResetPasswordReqViewModel model);

        /// <summary>
        /// 檢查重設密碼Guid是否有效
        /// </summary>
        /// <param name="guid">重設密碼Guid</param>
        /// <returns>檢查結果</returns>
        bool CheckResetPasswordGuid(string guid);

        /// <summary>
        /// 重設密碼 Step2
        /// </summary>
        /// <param name="model">重設密碼 Step2 Req ViewModel</param>
        /// <returns>重設結果</returns>
        ResponseViewModel ResetPasswordConfirm(ResetPasswordConfirmReqViewModel model);

    }
}