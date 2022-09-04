using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SocialNetwork.Repository
{
	/// <summary>
	/// A class which represents the FriendInvitation table.
	/// </summary>
	[Table("FriendInvitation")]
	public partial class FriendInvitation
	{
        /// <summary>
        /// PK
        /// </summary>
		[Key]
		public virtual int Key { get; set; }

        /// <summary>
        /// 傳送方 會員編號
        /// </summary>
		public virtual int SendMemberID { get; set; }

        /// <summary>
        /// 接收方 會員編號
        /// </summary>
		public virtual int ReceiveMemberID { get; set; }

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
