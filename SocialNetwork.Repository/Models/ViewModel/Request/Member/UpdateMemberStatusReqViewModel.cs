using SocialNetwork.Helper;
using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 更新會員狀態 Request ViewModel
    /// </summary>
    public class UpdateMemberStatusReqViewModel
    {
        /// <summary>
        /// 會員狀態
        /// </summary>
        [Required(ErrorMessage = "請輸入會員狀態")]
        [EnumDataType(typeof(MemberStatusEnum), ErrorMessage = "請輸入會員狀態")]
        public MemberStatusEnum Status { get; set; }
    }
}