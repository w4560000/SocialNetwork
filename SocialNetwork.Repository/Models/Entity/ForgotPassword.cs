using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// ForgotPassword
    /// </summary>
    [Table("ForgotPassword")]
    public partial class ForgotPassword : IEditColumn
    {
        /// <summary>
        /// PK
        /// </summary>
        [Key]
        public virtual int Key { get; set; }

        /// <summary>
        /// GUID
        /// </summary>
        public virtual string Guid { get; set; }

        /// <summary>
        /// 會員編號
        /// </summary>
        public virtual int MemberID { get; set; }

        /// <summary>
        /// 建立日期
        /// </summary>
        public virtual DateTime CreatedAt { get; set; }

        /// <summary>
        /// 建立人員
        /// </summary>
        public virtual int CreatedBy { get; set; }

        /// <summary>
        /// 更新日期
        /// </summary>
        public virtual DateTime UpdatedAt { get; set; }

        /// <summary>
        /// 更新人員
        /// </summary>
        public virtual int UpdatedBy { get; set; }
    }
}