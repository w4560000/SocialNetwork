using Microsoft.Extensions.Configuration;
using SocialNetwork.Helper;
using SocialNetwork.Repository;
using System;

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

            (bool IsVCodeValid, VerificationCode vCode) = this.VerificationCodeRepository.CheckVerificationCodeIsValid(model.Mail, model.VCode);

            if (!IsVCodeValid)
                return "驗證碼錯誤!".AsFailResponse();

            this.VerificationCodeRepository.AuthVerificationCodeSuccess(vCode);


            return new ResponseViewModel();
        }
    }
}