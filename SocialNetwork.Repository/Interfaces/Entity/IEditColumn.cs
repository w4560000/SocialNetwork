using System;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 編輯欄位界面
    /// </summary>
    public interface IEditColumn
    {
        /// <summary>
        /// 建立時間
        /// </summary>
        DateTime CreatedAt { get; set; }

        /// <summary>
        /// 建立人員
        /// </summary>
        int CreatedBy { get; set; }

        /// <summary>
        /// 修改時間
        /// </summary>
        DateTime UpdatedAt { get; set; }

        /// <summary>
        /// 修改人員
        /// </summary>
        int UpdatedBy { get; set; }
    }
}