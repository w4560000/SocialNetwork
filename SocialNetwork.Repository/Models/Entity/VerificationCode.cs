using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialNetwork.Repository
{
	/// <summary>
	/// VerificationCode
	/// </summary>
	[Table("VerificationCode")]
	public partial class VerificationCode :IEditColumn
	{
		/// <summary>
		/// PK
		/// </summary>
		[Key]
		public virtual int Key { get; set; }

		/// <summary>
		/// 電子郵件
		/// </summary>
		public virtual string Mail { get; set; }

		/// <summary>
		/// 驗證碼
		/// </summary>
		public virtual string VCode { get; set; }

		/// <summary>
		/// 狀態
		/// </summary>
		public virtual VerificationEnum Status { get; set; }

		/// <summary>
		/// 驗證日期
		/// </summary>
		public virtual DateTime? VerificationDate { get; set; }

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