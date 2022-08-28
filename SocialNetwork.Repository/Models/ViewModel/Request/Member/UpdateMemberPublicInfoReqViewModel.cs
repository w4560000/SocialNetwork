using System;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 更新會員公開資訊 Request ViewModel
    /// </summary>
    public class UpdateMemberPublicInfoReqViewModel : IUpdateMemberPublicInfoReqViewModel
    {
        /// <summary>
        /// 生日
        /// </summary>
        public DateTime Brithday { get; set; }

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
        public string Education { get; set; }

        /// <summary>
        /// 會員公開資訊狀態
        /// </summary>
        public MemberPublicInfoEnum InfoStatus { get; set; }
    }
}