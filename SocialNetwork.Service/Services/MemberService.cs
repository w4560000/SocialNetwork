using Microsoft.AspNetCore.Http;
using SocialNetwork.Helper;
using SocialNetwork.Repository;
using System;
using System.Linq;

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
        /// Constructor
        /// </summary>
        /// <param name="memberRepository">IMemberRepository</param>
        /// <param name="verificationCode">IVerificationCodeRepository</param>
        /// <param name="httpContextAccessor">IHttpContextAccessor</param>
        /// <param name="jwtHelper">JwtHelper</param>
        /// <param name="userContext">IUserContext</param>
        public MemberService(
            IMemberRepository memberRepository,
            IVerificationCodeRepository verificationCode,
            IHttpContextAccessor httpContextAccessor,
            JwtHelper jwtHelper,
            IUserContext userContext)

        {
            this.MemberRepository = memberRepository;
            this.VerificationCodeRepository = verificationCode;
            this.HttpContext = httpContextAccessor.HttpContext;
            this.JwtHelper = jwtHelper;
            this.UserContext = userContext;
        }

        /// <summary>
        /// 註冊
        /// </summary>
        /// <param name="model">註冊 Req ViewModel</param>
        /// <returns>註冊結果</returns>
        public ResponseViewModel Signup(SingupReqViewModel model)
        {
            bool isMemberExist = this.MemberRepository.RecordCount("WHERE Account = @Account OR Mail = @Mail", new { model.Account, model.Mail }) > 0;

            if (isMemberExist)
                return "會員帳號或信箱已被註冊!".AsFailResponse();

            DateTime expiryDate = DateTime.Now.AddMinutes(-10);
            VerificationCode vCode = this.VerificationCodeRepository
                                         .GetList("WHERE Mail = @mail AND Status = @status AND CreatedAt > @expiryDate AND VCode = @vCode",
                                            new { mail = model.Mail, status = VerificationEnum.NotAuth, expiryDate, vCode = model.VCode }).FirstOrDefault();

            if (vCode == null)
                return "驗證碼錯誤!".AsFailResponse();

            // 更新驗證碼狀態
            vCode.Status = VerificationEnum.AuthSuccess;
            vCode.VerificationDate = DateTime.Now;
            this.VerificationCodeRepository.Update(vCode);

            // 註冊
            var memberID = this.MemberRepository.Add<int>(new Member()
            {
                Account = model.Account,
                NickName = model.NickName,
                Password = model.Password,
                Mail = model.Mail,
                InfoStatus = MemberPublicInfoEnum.全部不公開,
                Status = MemberStatusEnum.離線
            });

            // 寫入登入 Cookie
            this.LoginProcess(new UserInfo() { MemberID = memberID, Account = model.Account, NickName = model.NickName });

            return "註冊成功!".AsSuccessResponse();
        }

        /// <summary>
        /// 寄送驗證碼
        /// </summary>
        /// <param name="model">寄送驗證碼 Req ViewModel</param>
        /// <returns>寄送結果</returns>
        public ResponseViewModel SendVCode(SendVCodeReqViewModel model)
        {
            bool isMemberExist = this.MemberRepository.RecordCount("WHERE Mail = @mail", new { mail = model.Mail }) > 0;

            if (isMemberExist)
                return "此電子郵件已被註冊!".AsFailResponse();

            string vCode = new Random().Next(10000).ToString();
            string mailBody = $"<h1>驗證碼:{vCode}</h1>";

            // 寄送驗證碼
            MailHelper.MailSend(model.Mail, mailBody);
            this.VerificationCodeRepository.DeleteList("WHERE Mail = @mail", new { mail = model.Mail });
            this.VerificationCodeRepository.Add<int>(new VerificationCode()
            {
                Mail = model.Mail,
                VCode = vCode,
                Status = VerificationEnum.NotAuth
            });

            return "寄送驗證碼成功!".AsSuccessResponse();
        }

        /// <summary>
        /// 登入
        /// </summary>
        /// <param name="model">登入 Req ViewModel</param>
        /// <returns>登入結果</returns>
        public ResponseViewModel Login(LoginReqViewModel model)
        {
            var member = this.MemberRepository.GetList("WHERE Account = @Account AND Password = @Password", new { model.Account, model.Password }).FirstOrDefault();

            if (member == null)
                return  "帳號或密碼錯誤!".AsFailResponse();

            LoginProcess(new UserInfo() { MemberID = member.MemberID, Account = member.Account, NickName = member.NickName });

            return "登入成功!".AsSuccessResponse();
        }

        /// <summary>
        /// 更新會員公開資訊
        /// </summary>
        /// <param name="model">更新會員公開資訊 Req viewModel</param>
        /// <returns>更新結果</returns>
        public ResponseViewModel UpdateMemberPublicInfo(UpdateMemberPublicInfoReqViewModel model)
        {
            if (!this.MemberRepository.TryGetEntity(UserContext.User.MemberID, out Member member))
                return CommonExtension.AsSystemFailResponse();

            member.InfoStatus = model.MemberPublicInfo;
            member.Birthday = model.Birthday;
            member.Interest = model.Interest;
            member.Job = model.Job;
            member.Education = model.Education;
            this.MemberRepository.Update(member);

            return "更新成功!".AsSuccessResponse();
        }

        /// <summary>
        /// 登入流程
        /// 1. 設定 UserInfo 轉為 Jwt 存至 Cookie 中
        /// 2. 更新會員狀態
        /// </summary>
        /// <param name="userInfo">使用者資訊</param>
        private void LoginProcess(UserInfo userInfo)
        {
            var token = this.JwtHelper.GenerateToken(userInfo);
            this.HttpContext.Response.Cookies.AddJwtTokenToCookie(token);

            if (this.MemberRepository.TryGetEntity(userInfo.MemberID, out Member member))
            {
                member.Status = MemberStatusEnum.在線;
                this.MemberRepository.Update(member);
            }

            // todo 會員在線狀態 存入 Redis
        }
    }
}