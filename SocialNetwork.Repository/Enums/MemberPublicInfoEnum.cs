using System;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 會員公開資訊狀態列舉
    /// </summary>
    [Flags]
    public enum MemberPublicInfoEnum
    {
        /// <summary>
        /// 全部不公開
        /// </summary>
        全部不公開 = 0,

        /// <summary>
        /// 公開生日
        /// </summary>
        公開生日 = 1,

        /// <summary>
        /// 公開興趣
        /// </summary>
        公開興趣 = 2,

        /// <summary>
        /// 公開工作
        /// </summary>
        公開工作 = 4,

        /// <summary>
        /// 公開學歷
        /// </summary>
        公開學歷 = 8,

        /// <summary>
        /// 公開生日 | 公開興趣 | 公開工作 | 公開學歷
        /// </summary>
        全部公開 = 公開生日 | 公開興趣 | 公開工作 | 公開學歷
    }
}