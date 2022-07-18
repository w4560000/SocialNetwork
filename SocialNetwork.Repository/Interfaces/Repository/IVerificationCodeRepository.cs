using SocialNetwork.Repository.Base;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// IVerificationCodeRepository
    /// </summary>
    public interface IVerificationCodeRepository : IGenericRepository<VerificationCode>
    {
        /// <summary>
        /// 檢查會員驗證碼是否有效
        /// </summary>
        /// <param name="mail">會員信箱</param>
        /// <param name="vCode">會員驗證碼</param>
        /// <returns>(檢查結果, VerificationCode)</returns>
        (bool, VerificationCode) CheckVerificationCodeIsValid(string mail, string vCode);

        /// <summary>
        /// 驗證 驗證碼成功
        /// </summary>
        /// <param name="verificationCode">驗證碼</param>
        void AuthVerificationCodeSuccess(VerificationCode verificationCode);
    }
}