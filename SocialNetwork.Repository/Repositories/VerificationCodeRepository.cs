using Dapper;
using SocialNetwork.Helper;
using SocialNetwork.Repository.Base;
using System;
using System.Linq;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 驗證碼 儲存庫
    /// </summary>
    public class VerificationCodeRepository : RepositoryBase<VerificationCode>, IVerificationCodeRepository
    {
        /// <summary>
        /// Construct
        /// </summary>
        /// <param name="userContext">IUserContext</param>
        /// <param name="factory">IPostgreSqlConnectionFactory</param>
        /// <param name="configHelper">IConfigHelper</param>
        public VerificationCodeRepository(
            IUserContext userContext,
            ISQLServerConnectionFactory factory,
            IConfigHelper configHelper) : base(userContext, factory, configHelper)
        {
        }

        /// <summary>
        /// 檢查會員驗證碼是否有效 remove
        /// </summary>
        /// <param name="mail">會員信箱</param>
        /// <param name="vCode">會員驗證碼</param>
        /// <returns>(檢查結果, VerificationCode)</returns>
        public (bool, VerificationCode) CheckVerificationCodeIsValid(string mail, string vCode)
        {
            // 時限 10 分鐘
            DateTime expiryDate = DateTime.Now.AddMinutes(-10);

            VerificationCode verificationCode = this.Connection.GetList<VerificationCode>("WHERE Mail = @mail AND Status = @status AND CreateDate > @expiryDate AND VCode = @vCode",
                                                        new { mail, status = VerificationEnum.NotAuth, expiryDate, vCode }).FirstOrDefault();

            if (verificationCode == null)
                return (false, null);

            return (true, verificationCode);
        }

        /// <summary>
        /// 驗證 驗證碼成功 remove
        /// </summary>
        /// <param name="verificationCode">驗證碼</param>
        public void AuthVerificationCodeSuccess(VerificationCode verificationCode)
        {
            verificationCode.Status = VerificationEnum.AuthSuccess;
            verificationCode.VerificationDate = DateTime.Now;
            this.Connection.Update(verificationCode);
        }
    }
}