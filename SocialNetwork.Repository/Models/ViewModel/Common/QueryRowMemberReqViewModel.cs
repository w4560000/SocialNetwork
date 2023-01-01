using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 查詢資料筆數 Member Request ViewModel
    /// </summary>
    public class QueryRowMemberReqViewModel
    {
        /// <summary>
        /// 會員編號
        /// </summary>
        [Required(ErrorMessage = "請輸入會員編號")]
        public int MemberID { get; set; }

        /// <summary>
        /// 查詢 RowNo
        /// </summary>
        public int QueryRowNo { get; set; } = 1;
    }
}