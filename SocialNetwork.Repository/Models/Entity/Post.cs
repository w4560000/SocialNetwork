using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// Post
    /// </summary>
    [Table("Post")]
    public partial class Post : IEditColumn
    {
        [Key]
        public virtual int PostKey { get; set; }
        public virtual int MemberID { get; set; }
        public virtual string PostContent { get; set; }
        public virtual string PostImageUrl { get; set; }
        public virtual DateTime CreatedAt { get; set; }
        public virtual int CreatedBy { get; set; }
        public virtual DateTime UpdatedAt { get; set; }
        public virtual int UpdatedBy { get; set; }
    }
}