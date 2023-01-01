using System;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 取得會員資訊 Response ViewModel
    /// </summary>
    public class GetMemberInfoResViewModel
    {
        /// <summary>
        /// 會員編號
        /// </summary>
        public int MemberID { get; set; }

        /// <summary>
        /// 暱稱
        /// </summary>
        public string NickName { get; set; }

        /// <summary>
        /// 大頭貼路徑
        /// </summary>
        public string ProfilePhotoURL { get; set; }

        /// <summary>
        /// 背景圖路徑
        /// </summary>
        public string BackgroundPhotoURL { get; set; }

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
        public MemberEducationEnum Education { get; set; }
        
        /// <summary>
        /// 公開狀態
        /// </summary>
        public MemberPublicInfoEnum InfoStatus { get; set; }

        /// <summary>
        /// 是否為原生帳號 (非第三方界接帳號)
        /// </summary>
        public bool IsOriginalMember { get; set; }
    }
}