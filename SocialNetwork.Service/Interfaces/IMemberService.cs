using SocialNetwork.Helper;
using SocialNetwork.Repository;
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
        public ResponseViewModel Signup(SingupReqViewModel model);

        /// <summary>
        /// 寄送驗證碼
        /// </summary>
        /// <param name="model">寄送驗證碼 Request ViewModel</param>
        /// <returns>寄送結果</returns>
        public ResponseViewModel SendVCode(SendVCodeReqViewModel model);

        /// <summary>
        /// 登入
        /// </summary>
        /// <param name="model">登入 Request ViewModel</param>
        /// <returns>登入結果</returns>
        public ResponseViewModel Login(LoginReqViewModel model);

        /// <summary>
        /// Google 第三方登入
        /// </summary>
        /// <param name="model">登入 Request ViewModel</param>
        /// <returns>登入結果</returns>
        public ResponseViewModel<GoogleLoginResViewModel> GoogleLogin(GoogleOAuth_UserInfoResult model);

        /// <summary>
        /// 更新會員公開資訊
        /// </summary>
        /// <param name="model">更新會員公開資訊 Request ViewModel</param>
        /// <param name="nickName">暱稱</param>
        /// <param name="backgroundPhotoURL">主頁背景URL</param>
        /// <param name="profilePhotoURL">頭像URL</param>
        /// <returns>更新結果</returns>
        public ResponseViewModel UpdateMemberPublicInfo(
            IUpdateMemberPublicInfoReqViewModel model,
            string nickName = null,
            string backgroundPhotoURL = null,
            string profilePhotoURL = null);

        /// <summary>
        /// 重設密碼 Step1
        /// 申請重設密碼、建立重設密碼URL
        /// </summary>
        /// <param name="model">重設密碼 Step1 Request ViewModel</param>
        /// <returns>申請結果</returns>
        public ResponseViewModel ResetPassword(ResetPasswordReqViewModel model);

        /// <summary>
        /// 檢查重設密碼Guid是否有效
        /// </summary>
        /// <param name="guid">重設密碼Guid</param>
        /// <returns>檢查結果</returns>
        public bool CheckResetPasswordGuid(string guid);

        /// <summary>
        /// 重設密碼 Step2
        /// </summary>
        /// <param name="model">重設密碼 Step2 Request ViewModel</param>
        /// <returns>重設結果</returns>
        public ResponseViewModel ResetPasswordConfirm(ResetPasswordConfirmReqViewModel model);

        /// <summary>
        /// 登出
        /// </summary>
        /// <returns>登出結果</returns>
        public ResponseViewModel Logout();

        /// <summary>
        /// 更新會員狀態
        /// </summary>
        /// <param name="model">更新會員狀態 Request ViewModel</param>
        /// <returns>更新結果</returns>
        public ResponseViewModel UpdateMemberStatus(UpdateMemberStatusReqViewModel model);

        /// <summary>
        /// 取得當前會員資訊
        /// </summary>
        /// <returns>當前會員資訊</returns>
        public ResponseViewModel<GetMemberInfoResViewModel> GetCurrentMemberInfo();

        /// <summary>
        /// 取得會員資訊
        /// </summary>
        /// <param name="memberID">會員編號</param>
        /// <returns>會員資訊</returns>
        public ResponseViewModel<GetMemberInfoResViewModel> GetMemberInfo(int memberID);

        /// <summary>
        /// 更新會員資訊
        /// </summary>
        /// <param name="model">更新會員資訊 Request ViewModel</param>
        /// <returns>更新結果</returns>
        public Task<ResponseViewModel> UpdateMemberInfoAsync(UpdateMemberInfoReqViewModel model);

        /// <summary>
        /// 密碼變更
        /// </summary>
        /// <param name="model">密碼變更 Request ViewModel</param>
        /// <returns>密碼變更結果</returns>
        public ResponseViewModel ChangePassword(ChangePasswordReqViewModel model);
    }
}