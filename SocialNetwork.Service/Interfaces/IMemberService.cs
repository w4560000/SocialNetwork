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
        /// <returns>註冊結果</returns>
        ResponseViewModel Signup(SingupReqViewModel model);
    }
}