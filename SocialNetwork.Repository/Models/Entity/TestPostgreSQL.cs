using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 測試
    /// </summary>
    [Table("test")]
    public class TestPostgreSQL
    {
        [Key]
        public int testid { get; set; }

        public string testname { get; set; }
    }
}