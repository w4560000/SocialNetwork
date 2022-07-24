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
        /// Constructor
        /// </summary>
        /// <param name="memberRepository">IMemberRepository</param>
        /// <param name="verificationCode">IVerificationCodeRepository</param>
        /// <param name="httpContextAccessor">IHttpContextAccessor</param>
        /// <param name="jwtHelper">JwtHelper</param>
        public MemberService(
            IMemberRepository memberRepository,
            IVerificationCodeRepository verificationCode,
            IHttpContextAccessor httpContextAccessor,
            JwtHelper jwtHelper)
        {
            this.MemberRepository = memberRepository;
            this.VerificationCodeRepository = verificationCode;
            this.HttpContext = httpContextAccessor.HttpContext;
            this.JwtHelper = jwtHelper;
        }

        /// <summary>
        /// 註冊
        /// </summary>
        /// <returns>註冊結果</returns>
        public ResponseViewModel Signup(SingupReqViewModel model)
        {
            bool isMemberExist = this.MemberRepository.CheckMemberExist(model.Account, model.Mail);

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
                InfoStatus = MemberInfoEnum.All,
                Status = MemberStatusEnum.離線
            });

            // 寫入登入 Cookie
            this.SetUserInfoToCookie(new UserInfo() { MemberID = memberID, Account = model.Account, NickName = model.NickName });

            return "註冊成功".AsSuccessResponse();
        }

        /// <summary>
        /// 寄送驗證碼
        /// </summary>
        /// <returns>註冊結果</returns>
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

            return "寄送驗證碼成功".AsSuccessResponse();
        }

        /// <summary>
        /// 設定 UserInfo 轉為 Jwt 存至 Cookie 中
        /// </summary>
        /// <param name="userInfo">使用者資訊</param>
        private void SetUserInfoToCookie(UserInfo userInfo)
        {
            var token = this.JwtHelper.GenerateToken(userInfo);
            this.HttpContext.Response.Cookies.AddJwtTokenToCookie(token);
        }
    }
}