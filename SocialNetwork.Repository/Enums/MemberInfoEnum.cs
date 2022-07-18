using System;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 會員資訊狀態
    /// </summary>
    [Flags]
    public enum MemberInfoEnum
    {
        /// <summary>
        /// 生日
        /// </summary>
        生日 = 1,

        /// <summary>
        /// 興趣
        /// </summary>
        興趣 = 2,

        /// <summary>
        /// 工作
        /// </summary>
        工作 = 4,

        /// <summary>
        /// 學歷
        /// </summary>
        學歷 = 8,

        /// <summary>
        /// 生日 | 興趣 | 工作 | 學歷
        /// </summary>
        All = 生日 | 興趣 | 工作 | 學歷
    }
}