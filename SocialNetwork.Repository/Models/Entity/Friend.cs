﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// A class which represents the Friend table.
    /// </summary>
    [Table("Friend")]
    public partial class Friend : IEditColumn
    {
        /// <summary>
        /// PK
        /// </summary>
        [Key]
        public virtual int Key { get; set; }

        /// <summary>
        /// 會員編號
        /// </summary>
        public virtual int MemberID { get; set; }

        /// <summary>
        /// 關聯好友的會員編號
        /// </summary>
        public virtual int FriendMemberID { get; set; }

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