var memberInfo: GetMemberInfoResViewModel;

$(async function () {

    // 輸入框 高度自動伸縮
    $('.write_post, .msgComment').on("input", function () {
        let _this = $(this);
        var currentVal = _this.val() as string;

        _this.height('auto');
        _this.height(_this.prop('scrollHeight') + 'px');
    });

    // 查看別人主頁 or 個人主頁
    memberInfo = $("#query_memberID").val() ? await GetMemberInfoAPI($("#query_memberID").val() as number) : await GetCurrentMemberInfoAPI();
    
    var memberBrithday = new Date(memberInfo.Brithday);
    var brithday = `${memberBrithday.getFullYear()} 年 ${memberBrithday.getMonth() + 1} 月 ${memberBrithday.getDate()} 日`;

    $('.profile_name').html(memberInfo.NickName);
    $('.profile_detail_brithday').html(brithday);
    $('.profile_detail_job').html(memberInfo.Job);
    $('.profile_detail_internest').html(memberInfo.Interest);
    $('.profile_detail_education').html(memberInfo.Education);
    $('.profile_background').attr('src', memberInfo.BackgroundPhotoURL);
}); 

/**
 * 發送好友邀請
 * */
function SendFriendInvitation() {
    let model = new CommonMemberViewModel(memberInfo.MemberID);

    SendFriendInvitationAPI("發送好友邀請中", model, `確定是否對 ${memberInfo.NickName} 發送好友邀請?`);
}

/**
 * 判斷好友邀請 (接受 or 拒絕)
 * */
function DecideFriendInvitation(decide: DecideFriendInvitationEnum) {
    let model = new DecideFriendInvitationReqViewModel(memberInfo.MemberID, decide);
    
    DecideFriendInvitationAPI(`${DecideFriendInvitationEnum[decide]}好友邀請中`, model, `確定是否${DecideFriendInvitationEnum[decide]} ${memberInfo.NickName} 的好友邀請?`);
}

/**
 * 收回好友邀請
 * */
function RevokeFriendInvitation() {
    let model = new CommonMemberViewModel(memberInfo.MemberID);

    RevokeFriendInvitationAPI(`收回好友邀請中`, model, `確定是否收回 ${memberInfo.NickName}  的好友邀請?`);
}