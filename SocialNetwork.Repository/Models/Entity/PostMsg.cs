using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// PostMsg
    /// </summary>
    [Table("PostMsg")]
    public partial class PostMsg : IEditColumn
    {
        [Key]
        public virtual int MsgKey { get; set; }

        public virtual int PostKey { get; set; }
        public virtual int MemberID { get; set; }
        public virtual string MsgContent { get; set; }
        public virtual DateTime CreatedAt { get; set; }
        public virtual int CreatedBy { get; set; }
        public virtual DateTime UpdatedAt { get; set; }
        public virtual int UpdatedBy { get; set; }
    }
}