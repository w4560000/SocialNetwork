using System.Collections.Generic;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 搜尋會員
    /// </summary>
    public class SearchMemberResViewModel
    {
        /// <summary>
        /// 好友清單
        /// </summary>
        public List<SearchMemberInfoResViewModel> FriendList { get; set; } = new List<SearchMemberInfoResViewModel>();

        /// <summary>
        /// 陌生會員清單
        /// </summary>
        public List<SearchMemberInfoResViewModel> MemberList { get; set; } = new List<SearchMemberInfoResViewModel>();
    }
}