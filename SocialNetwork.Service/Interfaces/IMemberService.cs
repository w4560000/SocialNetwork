using SocialNetwork.Helper;
using SocialNetwork.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

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
        /// <param name="model">註冊 Request ViewModel</param>
        /// <returns>註冊結果</returns>
        ResponseViewModel Signup(SingupReqViewModel model);

        /// <summary>
        /// 寄送驗證碼
        /// </summary>
        /// <param name="model">寄送驗證碼 Request ViewModel</param>
        /// <returns>寄送結果</returns>
        ResponseViewModel SendVCode(SendVCodeReqViewModel model);

        /// <summary>
        /// 登入
        /// </summary>
        /// <param name="model">登入 Request ViewModel</param>
        /// <returns>登入結果</returns>
        ResponseViewModel Login(LoginReqViewModel model);

        /// <summary>
        /// Google 第三方登入
        /// </summary>
        /// <param name="model">登入 Request ViewModel</param>
        /// <returns>登入結果</returns>
        ResponseViewModel<GoogleLoginResViewModel> GoogleLogin(GoogleOAuth_UserInfoResult model);

        /// <summary>
        /// 更新會員公開資訊
        /// </summary>
        /// <param name="model">更新會員公開資訊 Request ViewModel</param>
        /// <returns>更新結果</returns>
        ResponseViewModel UpdateMemberPublicInfo(UpdateMemberPublicInfoReqViewModel model);

        /// <summary>
        /// 重設密碼 Step1
        /// 申請重設密碼、建立重設密碼URL
        /// </summary>
        /// <param name="model">重設密碼 Step1 Request ViewModel</param>
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
        /// <param name="model">重設密碼 Step2 Request ViewModel</param>
        /// <returns>重設結果</returns>
        ResponseViewModel ResetPasswordConfirm(ResetPasswordConfirmReqViewModel model);

        /// <summary>
        /// 登出
        /// </summary>
        /// <returns>登出結果</returns>
        ResponseViewModel Logout();

        /// <summary>
        /// 更新會員狀態
        /// </summary>
        /// <param name="model">更新會員狀態 Request ViewModel</param>
        /// <returns>更新結果</returns>
        ResponseViewModel UpdateMemberStatus(UpdateMemberStatusReqViewModel model);

        /// <summary>
        /// 取得當前會員資訊
        /// </summary>
        /// <returns>當前會員資訊</returns>
        ResponseViewModel<GetMemberInfoResViewModel> GetCurrentMemberInfo();

        /// <summary>
        /// 取得會員資訊
        /// </summary>
        /// <param name="memberID">會員編號</param>
        /// <returns>會員資訊</returns>
        ResponseViewModel<GetMemberInfoResViewModel> GetMemberInfo(int memberID);

        /// <summary>
        /// 更新會員資訊
        /// </summary>
        /// <param name="model">更新會員資訊 Request ViewModel</param>
        /// <returns>更新結果</returns>
        Task<ResponseViewModel> UpdateMemberInfoAsync(UpdateMemberInfoReqViewModel model);

        /// <summary>
        /// 密碼變更
        /// </summary>
        /// <param name="model">密碼變更 Request ViewModel</param>
        /// <returns>密碼變更結果</returns>
        ResponseViewModel ChangePassword(ChangePasswordReqViewModel model);

        /// <summary>
        /// 搜尋會員
        /// </summary>
        /// <param name="model">搜尋會員 Request ViewModel</param>
        /// <returns>搜尋結果</returns>
        Task<ResponseViewModel<SearchMemberResViewModel>> SearchMember(SearchMemberReqViewModel model);
    }
}