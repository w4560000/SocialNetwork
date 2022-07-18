using Microsoft.Extensions.Configuration;
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
        /// Constructor
        /// </summary>
        /// <param name="memberRepository">IMemberRepository</param>
        /// <param name="verificationCode">IVerificationCodeRepository</param>
        public MemberService(
            IMemberRepository memberRepository,
            IVerificationCodeRepository verificationCode)
        {
            this.MemberRepository = memberRepository;
            this.VerificationCodeRepository = verificationCode;
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
                                         .GetList("WHERE Mail = @mail AND Status = @status AND CreateDate > @expiryDate AND VCode = @vCode",
                                            new { mail = model.Mail, status = VerificationEnum.NotAuth, expiryDate, vCode = model.VCode }).FirstOrDefault();

            if (vCode == null)
                return "驗證碼錯誤!".AsFailResponse();


            // 更新驗證碼狀態
            vCode.Status = VerificationEnum.AuthSuccess;
            vCode.VerificationDate = DateTime.Now;
            this.VerificationCodeRepository.Update(vCode);
            

            // todo 註冊


            return "註冊成功".AsSuccessResponse();
        }

        /// <summary>
        /// 寄送驗證碼
        /// </summary>
        /// <returns>註冊結果</returns>
        public ResponseViewModel SendVCode(SendVCodeReqViewModel model)
        {
            bool isMemberExist = this.MemberRepository.RecordCount("WHERE Mail = @mail", new { mail = model .Mail}) > 0;

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
    }
}