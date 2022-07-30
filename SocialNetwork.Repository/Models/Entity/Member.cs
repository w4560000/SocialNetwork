using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// Member
    /// </summary>
    [Table("Member")]
    public partial class Member : IEditColumn
    {
        /// <summary>
        /// PK 會員編號
        /// </summary>
        [Key]
        public virtual int MemberID { get; set; }

        /// <summary>
        /// 會員帳號
        /// </summary>
        public virtual string Account { get; set; }

        /// <summary>
        /// 會員暱稱
        /// </summary>
        public virtual string NickName { get; set; }

        /// <summary>
        /// 密碼
        /// </summary>
        public virtual string Password { get; set; }

        /// <summary>
        /// 電子郵件
        /// </summary>
        public virtual string Mail { get; set; }

        /// <summary>
        /// 大頭貼路徑
        /// </summary>
        public virtual string ProfilePhotoURL { get; set; }

        /// <summary>
        /// 背景圖路徑
        /// </summary>
        public virtual string BackgoundPhotoURL { get; set; }

        /// <summary>
        /// 生日
        /// </summary>
        public virtual DateTime? Birthday { get; set; }

        /// <summary>
        /// 興趣
        /// </summary>
        public virtual string Interest { get; set; }

        /// <summary>
        /// 工作
        /// </summary>
        public virtual string Job { get; set; }

        /// <summary>
        /// 學歷
        /// </summary>
        public virtual string Education { get; set; }

        /// <summary>
        /// 資訊狀態
        /// </summary>
        public virtual MemberPublicInfoEnum InfoStatus { get; set; }

        /// <summary>
        /// 會員狀態
        /// </summary>
        public virtual MemberStatusEnum Status { get; set; }

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