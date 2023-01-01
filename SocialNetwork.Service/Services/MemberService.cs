using Microsoft.AspNetCore.Http;
using SocialNetwork.Helper;
using SocialNetwork.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace SocialNetwork.Service
{
    /// <summary>
    /// MemberService
    /// </summary>
    public class MemberService : IMemberService
    {
        /// <summary>
        /// IMemberRepository
        /// </summary>
        private readonly IMemberRepository MemberRepository;

        /// <summary>
        /// IVerificationCodeRepository
        /// </summary>
        private readonly IVerificationCodeRepository VerificationCodeRepository;

        /// <summary>
        /// IForgotPasswordRepository
        /// </summary>
        private readonly IForgotPasswordRepository ForgotPasswordRepository;

        /// <summary>
        /// IFriendService
        /// </summary>
        private readonly IFriendService FriendService;

        /// <summary>
        /// HttpContext
        /// </summary>
        private readonly HttpContext HttpContext;

        /// <summary>
        /// JwtHelper
        /// </summary>
        private readonly JwtHelper JwtHelper;

        /// <summary>
        /// IUserContext
        /// </summary>
        private readonly IUserContext UserContext;

        /// <summary>
        /// ICacheHelper
        /// </summary>
        private readonly ICacheHelper CacheHelper;

        /// <summary>
        /// ChatHub
        /// </summary>
        private readonly ChatHub ChatHub;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="memberRepository">IMemberRepository</param>
        /// <param name="verificationCodeRepository">IVerificationCodeRepository</param>
        /// <param name="forgotPasswordRepository">IForgotPasswordRepository</param>
        /// <param name="friendService">IFriendService</param>
        /// <param name="httpContextAccessor">IHttpContextAccessor</param>
        /// <param name="jwtHelper">JwtHelper</param>
        /// <param name="userContext">IUserContext</param>
        /// <param name="cacheHelper">ICacheHelper</param>
        /// <param name="chatHub">ChatHub</param>
        public MemberService(
            IMemberRepository memberRepository,
            IVerificationCodeRepository verificationCodeRepository,
            IForgotPasswordRepository forgotPasswordRepository,
            IFriendService friendService,
            IHttpContextAccessor httpContextAccessor,
            JwtHelper jwtHelper,
            IUserContext userContext,
            ICacheHelper cacheHelper,
            ChatHub chatHub)

        {
            this.MemberRepository = memberRepository;
            this.VerificationCodeRepository = verificationCodeRepository;
            this.ForgotPasswordRepository = forgotPasswordRepository;
            this.FriendService = friendService;
            this.HttpContext = httpContextAccessor.HttpContext;
            this.JwtHelper = jwtHelper;
            this.UserContext = userContext;
            this.CacheHelper = cacheHelper;
            this.ChatHub = chatHub;
        }

        /// <summary>
        /// 註冊
        /// </summary>
        /// <param name="model">註冊 Request ViewModel</param>
        /// <returns>註冊結果</returns>
        public ResponseViewModel Signup(SingupReqViewModel model)
        {
            if (model.Password != model.PasswordCheck)
                return "會員密碼與確認密碼不相符".AsFailResponse();

            bool isMemberExist = this.MemberRepository.RecordCount("WHERE Account = @Account OR Mail = @Mail", new { model.Account, model.Mail }) > 0;

            if (isMemberExist)
                return "會員帳號或信箱已被註冊".AsFailResponse();

            DateTime expiryDate = DateTime.Now.AddMinutes(-10);
            VerificationCode vCode = this.VerificationCodeRepository
                                         .GetList("WHERE Mail = @mail AND Status = @status AND CreatedAt > @expiryDate AND VCode = @vCode",
                                            new { mail = model.Mail, status = VerificationEnum.NotAuth, expiryDate, vCode = model.VCode }).FirstOrDefault();

            if (vCode == null)
                return "驗證碼錯誤".AsFailResponse();

            // 更新驗證碼狀態
            vCode.Status = VerificationEnum.AuthSuccess;
            vCode.VerificationDate = DateTime.Now;
            this.VerificationCodeRepository.Update(vCode);

            // 註冊
            var memberEntity = new Member()
            {
                Account = model.Account,
                NickName = model.NickName,
                Password = model.Password,
                Mail = model.Mail,
                ProfilePhotoURL = SystemHelper.DefaultProfilePhoto,
                BackgroundPhotoURL = SystemHelper.DefaultBackgoundPhoto,
                InfoStatus = MemberPublicInfoEnum.全部不公開,
                Status = MemberStatusEnum.離線
            };
            var memberID = this.MemberRepository.Add<int>(memberEntity);

            // 更新會員狀態、寫入 Cookie
            this.SetMemberStatusForCookie(memberID, MemberStatusEnum.在線).GetAwaiter().GetResult();

            return $"{model.NickName} 註冊成功".AsSuccessResponse();
        }

        /// <summary>
        /// 寄送驗證碼
        /// </summary>
        /// <param name="model">寄送驗證碼 Request ViewModel</param>
        /// <returns>寄送結果</returns>
        public ResponseViewModel SendVCode(SendVCodeReqViewModel model)
        {
            bool isMemberExist = this.MemberRepository.RecordCount("WHERE Mail = @mail", new { mail = model.Mail }) > 0;

            if (isMemberExist)
                return "此電子郵件已被註冊".AsFailResponse();

            string vCode = new Random().Next(10000).ToString();
            string mailBody = $"<h1>驗證碼:{vCode}</h1>";

            // 寄送驗證碼
            MailHelper.MailSend("註冊驗證", model.Mail, mailBody);
            this.VerificationCodeRepository.DeleteList("WHERE Mail = @mail", new { mail = model.Mail });
            this.VerificationCodeRepository.Add<int>(new VerificationCode()
            {
                Mail = model.Mail,
                VCode = vCode,
                Status = VerificationEnum.NotAuth
            });

            return "寄送驗證碼成功".AsSuccessResponse();
        }

        /// <summary>
        /// 登入
        /// </summary>
        /// <param name="model">登入 Request ViewModel</param>
        /// <returns>登入結果</returns>
        public ResponseViewModel Login(LoginReqViewModel model)
        {
            var member = this.MemberRepository.GetList("WHERE Account = @Account AND Password = @Password", new { model.Account, model.Password }).FirstOrDefault();

            if (member == null)
                return "帳號或密碼錯誤".AsFailResponse();

            // 更新會員狀態、寫入 Cookie
            this.SetMemberStatusForCookie(member.MemberID, MemberStatusEnum.在線).GetAwaiter().GetResult();

            return $"{member.NickName} 登入成功".AsSuccessResponse();
        }

        /// <summary>
        /// Google 第三方登入
        /// </summary>
        /// <param name="model">登入 Request ViewModel</param>
        /// <returns>登入結果</returns>
        public ResponseViewModel<GoogleLoginResViewModel> GoogleLogin(GoogleOAuth_UserInfoResult model)
        {
            var res = new GoogleLoginResViewModel();
            string account = model.id + "@google";

            var isMailExist = this.MemberRepository.RecordCount("WHERE Account <> @account AND Mail = @email ", new { account, model.email }) > 0;

            if (isMailExist)
                return "該 Google 信箱已有人使用，無法註冊".AsFailResponse(res);

            var member = this.MemberRepository.GetList("WHERE Account = @account ", new { account }).FirstOrDefault();

            // 若是第一次 Google第三方登入 => 自動註冊
            if (member == null)
            {
                member = new Member()
                {
                    Account = account,
                    NickName = model.name,
                    Password = string.Empty,
                    Mail = model.email,
                    ProfilePhotoURL = model.picture,
                    BackgroundPhotoURL = SystemHelper.DefaultBackgoundPhoto,
                    InfoStatus = MemberPublicInfoEnum.全部不公開,
                    Status = MemberStatusEnum.離線
                };
                // 註冊
                var memberID = this.MemberRepository.Add<int>(member);
                member.MemberID = memberID;
                res.IsFirstLogin = true;
            }

            // 更新會員狀態、寫入 Cookie
            this.SetMemberStatusForCookie(member.MemberID, MemberStatusEnum.在線).GetAwaiter().GetResult();

            return $"{member.NickName} 登入成功".AsSuccessResponse(res);
        }

        /// <summary>
        /// 更新會員公開資訊
        /// </summary>
        /// <param name="model">更新會員公開資訊 Request ViewModel</param>
        /// <returns>更新結果</returns>
        public ResponseViewModel UpdateMemberPublicInfo(UpdateMemberPublicInfoReqViewModel model)
        {
            if (!this.MemberRepository.TryGetEntity(UserContext.User.MemberID, out Member member))
                return CommonExtension.AsSystemFailResponse();

            member.InfoStatus = model.InfoStatus;
            member.Brithday = model.Brithday;
            member.Interest = model.Interest;
            member.Job = model.Job;
            member.Education = model.Education;
            this.MemberRepository.Update(member);

            this.SetMemberStatusForCookie(member.MemberID, MemberStatusEnum.在線).GetAwaiter().GetResult();
            return "更新成功".AsSuccessResponse();
        }

        /// <summary>
        /// 重設密碼 Step1
        /// 申請重設密碼、建立重設密碼URL
        /// </summary>
        /// <param name="model">重設密碼 Step1 Request ViewModel</param>
        /// <returns>申請結果</returns>
        public ResponseViewModel ResetPassword(ResetPasswordReqViewModel model)
        {
            ResponseViewModel result = $"我們寄了一封重設密碼的說明到 {model.Mail}，請檢查您的收件夾或垃圾信件。".AsSuccessResponse();
            var member = this.MemberRepository.GetList("WHERE Account = @Account AND Mail = @Mail", new { model.Account, model.Mail })
                                              .FirstOrDefault();

            if (member == null)
                return result;

            var guid = Guid.NewGuid().ToString();
            var forgotPassword = new ForgotPassword()
            {
                MemberID = member.MemberID,
                Guid = guid
            };

            this.ForgotPasswordRepository.Add<int>(forgotPassword);

            string forgorPasswordSubmitStyle = @"
display: table-cell;
text-align: center;
vertical-align :middle;
cursor: pointer;
border-radius: 4px;
text-decoration: none;
width: 130px;
height: 40px;
font-size: 15pt;
border-radius: 5px;
background-color: #F2A1A1;
color: #FFFFFF;
font-weight: 700;
outline: 0;";
            string mailBody = $@"
<body>
    <h2>嗨 {member.NickName}</h2>
    <p>您可點選底下的連結來重設 IKKON 密碼。若您未曾要求過重設密碼，請忽略本電子郵件。</p>
    <a href='https://localhost:44371/Member/ResetPassword/{guid}' style='{forgorPasswordSubmitStyle}'>
        重設密碼
    </a>
</body>";

            // 寄送重設密碼郵件
            MailHelper.MailSend("重設密碼", model.Mail, mailBody);

            return result;
        }

        /// <summary>
        /// 檢查重設密碼Guid是否有效
        /// </summary>
        /// <param name="guid">重設密碼Guid</param>
        /// <returns>檢查結果</returns>
        public bool CheckResetPasswordGuid(string guid)
        {
            return this.ForgotPasswordRepository.RecordCount("WHERE Guid = @guid", new { guid }) > 0;
        }

        /// <summary>
        /// 重設密碼 Step2
        /// </summary>
        /// <param name="model">重設密碼 Step2 Request ViewModel</param>
        /// <returns>重設結果</returns>

        public ResponseViewModel ResetPasswordConfirm(ResetPasswordConfirmReqViewModel model)
        {
            var fotgotPassword = this.ForgotPasswordRepository.GetList("WHERE Guid = @Guid", new { model.Guid }).FirstOrDefault();

            if (fotgotPassword == null)
                return CommonExtension.AsSystemFailResponse();

            var member = this.MemberRepository.GetList("WHERE MemberID = @MemberID", new { fotgotPassword.MemberID }).FirstOrDefault();

            if (member == null)
                return CommonExtension.AsSystemFailResponse();

            member.Password = model.Password;
            this.MemberRepository.Update(member);
            this.ForgotPasswordRepository.Delete(fotgotPassword);

            return "重設成功".AsSuccessResponse();
        }

        /// <summary>
        /// 登出
        /// </summary>
        /// <returns>登出結果</returns>
        public ResponseViewModel Logout()
        {
            this.SetMemberStatusForCookie(this.UserContext.User.MemberID, MemberStatusEnum.離線, isLogout: true).GetAwaiter().GetResult();

            return "登出成功".AsSuccessResponse();
        }

        /// <summary>
        /// 更新會員狀態
        /// </summary>
        /// <param name="model">更新會員狀態 Request ViewModel</param>
        /// <returns>更新結果</returns>
        public ResponseViewModel UpdateMemberStatus(UpdateMemberStatusReqViewModel model)
        {
            this.SetMemberStatusForCookie(this.UserContext.User.MemberID, model.Status).GetAwaiter().GetResult();

            return "更新狀態成功".AsSuccessResponse();
        }

        /// <summary>
        /// 取得當前會員資訊
        /// </summary>
        /// <returns>當前會員資訊</returns>
        public ResponseViewModel<GetMemberInfoResViewModel> GetCurrentMemberInfo()
        {
            if (!this.MemberRepository.TryGetEntity(this.UserContext.User.MemberID, out Member member))
                return CommonExtension.AsSystemFailResponse<GetMemberInfoResViewModel>();

            var memberInfo = new GetMemberInfoResViewModel()
            {
                MemberID = member.MemberID,
                NickName = member.NickName,
                ProfilePhotoURL = member.ProfilePhotoURL,
                BackgroundPhotoURL = member.BackgroundPhotoURL,
                Brithday = member.Brithday,
                Interest = member.Interest,
                Job = member.Job,
                Education = member.Education,
                InfoStatus = member.InfoStatus,
                IsOriginalMember = member.Account.Split("@").Last() != "google"
            };

            return CommonExtension.AsSuccessResponse("取得當前會員資訊成功", memberInfo);
        }

        /// <summary>
        /// 取得會員資訊
        /// </summary>
        /// <param name="memberID">會員編號</param>
        /// <returns>會員資訊</returns>
        public ResponseViewModel<GetMemberInfoResViewModel> GetMemberInfo(int memberID)
        {
            if (!this.MemberRepository.TryGetEntity(memberID, out Member member))
                return CommonExtension.AsSystemFailResponse<GetMemberInfoResViewModel>();

            List<string> oAuthList = new List<string>() { "google" };

            var memberInfo = new GetMemberInfoResViewModel()
            {
                MemberID = member.MemberID,
                NickName = member.NickName,
                ProfilePhotoURL = member.ProfilePhotoURL,
                BackgroundPhotoURL = member.BackgroundPhotoURL,
                Brithday = member.InfoStatus.HasFlag(MemberPublicInfoEnum.公開生日) ? member.Brithday : null,
                Interest = member.InfoStatus.HasFlag(MemberPublicInfoEnum.公開興趣) ? member.Interest : string.Empty,
                Job = member.InfoStatus.HasFlag(MemberPublicInfoEnum.公開工作) ? member.Job : string.Empty,
                Education = member.InfoStatus.HasFlag(MemberPublicInfoEnum.公開學歷) ? member.Education : MemberEducationEnum.秘密,
                InfoStatus = member.InfoStatus,
                IsOriginalMember = oAuthList.All(a => a != member.Account.Split("@").Last())
            };

            return CommonExtension.AsSuccessResponse("取得會員資訊成功", memberInfo);
        }

        /// <summary>
        /// 密碼變更
        /// </summary>
        /// <param name="model">密碼變更 Request ViewModel</param>
        /// <returns>密碼變更結果</returns>
        public ResponseViewModel ChangePassword(ChangePasswordReqViewModel model)
        {
            if (model.NewPassword != model.NewPasswordCheck)
                return "新密碼與新密碼確認不相符".AsFailResponse();

            if (!this.MemberRepository.TryGetEntity(UserContext.User.MemberID, out Member member))
                return CommonExtension.AsSystemFailResponse();

            if (member.Password != model.OldPassword)
                return "舊密碼錯誤".AsFailResponse();

            member.Password = model.NewPassword;
            this.MemberRepository.Update(member);

            return "密碼變更成功".AsSuccessResponse();
        }

        /// <summary>
        /// 更新會員資訊
        /// </summary>
        /// <param name="model">更新會員資訊 Request ViewModel</param>
        /// <returns>更新結果</returns>
        public async Task<ResponseViewModel> UpdateMemberInfoAsync(UpdateMemberInfoReqViewModel model)
        {
            if (!this.MemberRepository.TryGetEntity(UserContext.User.MemberID, out Member member))
                return CommonExtension.AsSystemFailResponse();

            string backgroundPhotoUrl = string.Empty;
            string profilePhotoUrl = string.Empty;

            if (model.BackgroundPhoto != null)
            {
                // 上傳主頁背景
                var backgroundPhotoFile = new PhotoFileDto()
                {
                    FileName = $"{this.UserContext.User.MemberID}_{nameof(UpdateMemberInfoReqViewModel.BackgroundPhoto)}",
                    FileExtension = Path.GetExtension(model.BackgroundPhoto.FileName),
                    FileByte = await model.BackgroundPhoto.GetBytes()
                };

                // 上傳 Azure Blob
                await AzureHelper.UpLoadImageAsync(AzureBlobDirectoryEnum.BackgoundPhoto, backgroundPhotoFile);

                backgroundPhotoUrl = AzureHelper.GetImage(AzureBlobDirectoryEnum.BackgoundPhoto, backgroundPhotoFile);
            }

            if (model.ProfilePhoto != null)
            {
                // 上傳頭像
                var profilePhotoFile = new PhotoFileDto()
                {
                    FileName = $"{this.UserContext.User.MemberID}_{nameof(UpdateMemberInfoReqViewModel.ProfilePhoto)}",
                    FileExtension = Path.GetExtension(model.ProfilePhoto.FileName),
                    FileByte = await model.ProfilePhoto.GetBytes()
                };

                // 上傳 Azure Blob
                await AzureHelper.UpLoadImageAsync(AzureBlobDirectoryEnum.ProfilePhoto, profilePhotoFile);

                profilePhotoUrl = AzureHelper.GetImage(AzureBlobDirectoryEnum.ProfilePhoto, profilePhotoFile);
            }

            member.NickName = model.NickName;
            member.BackgroundPhotoURL = string.IsNullOrEmpty(backgroundPhotoUrl) ? member.BackgroundPhotoURL : backgroundPhotoUrl;
            member.ProfilePhotoURL = string.IsNullOrEmpty(profilePhotoUrl) ? member.ProfilePhotoURL : profilePhotoUrl;
            member.Brithday = model.Brithday;
            member.Interest = model.Interest;
            member.Job = model.Job;
            member.Education = model.Education;
            member.InfoStatus = model.InfoStatus;

            this.MemberRepository.Update(member);

            await this.SetMemberStatusForCookie(member.MemberID, MemberStatusEnum.在線);
            return "更新成功".AsSuccessResponse();
        }

        /// <summary>
        /// 更新會員狀態
        /// 1. 設定 UserInfo 轉為 Jwt 存至 Cookie 中
        /// 2. 更新會員狀態
        /// </summary>
        /// <param name="memberID">會員編號</param>
        /// <param name="status">會員狀態</param>
        /// <param name="isLogout">是否為登出</param>
        private async Task SetMemberStatusForCookie(int memberID, MemberStatusEnum status, bool isLogout = false)
        {
            if (this.MemberRepository.TryGetEntity(memberID, out Member member))
            {
                member.Status = status;
                this.MemberRepository.Update(member);

                var userInfo = new UserInfo()
                {
                    MemberID = member.MemberID,
                    Account = member.Account,
                    NickName = member.NickName,
                    ProfilePhotoUrl = member.ProfilePhotoURL,
                    Status = member.Status
                };

                if (isLogout)
                {
                    this.HttpContext.Response.Cookies.ExpireCookies();
                }
                else
                {
                    var token = this.JwtHelper.GenerateToken(userInfo);
                    this.HttpContext.Response.Cookies.AddJwtTokenToCookie(token);
                }

                // 會員在線狀態 存入 Redis 暫時不存
                await this.CacheHelper.ResetAsync($"Member:{userInfo.MemberID}", () => userInfo);

                var firendList = this.FriendService.GetFriendList(userInfo.MemberID);

                await this.ChatHub.ReflashFriendStatus_Send(
                    firendList.Data.Select(s => s.MemberID).ToList(),
                    new GetFriendListResViewModel()
                    {
                        MemberID = userInfo.MemberID,
                        NickName = userInfo.NickName,
                        Status = userInfo.Status,
                        ProfilePhotoURL = userInfo.ProfilePhotoUrl
                    });
            }
        }
    }
}