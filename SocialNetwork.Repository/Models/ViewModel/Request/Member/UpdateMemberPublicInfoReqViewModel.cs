using System;
using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 更新會員公開資訊 Request ViewModel
    /// </summary>
    public class UpdateMemberPublicInfoReqViewModel
    {
        /// <summary>
        /// 生日
        /// </summary>
        public DateTime? Brithday { get; set; }

        /// <summary>
        /// 興趣
        /// </summary>
        public string Interest { get; set; }

        /// <summary>
        /// 工作
        /// </summary>
        public string Job { get; set; }

        /// <summary>
        /// 學歷
        /// </summary>
        [Required(ErrorMessage = "請輸入學歷")]
        [EnumDataType(typeof(MemberEducationEnum), ErrorMessage = "請輸入學歷")]
        public MemberEducationEnum Education { get; set; }

        /// <summary>
        /// 會員公開資訊狀態
        /// </summary>
        [Required(ErrorMessage = "請輸入會員公開資訊狀態")]
        [EnumDataType(typeof(MemberPublicInfoEnum), ErrorMessage = "請輸入會員公開資訊狀態")]
        public MemberPublicInfoEnum InfoStatus { get; set; }
    }
}