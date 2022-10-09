var memberInfo: GetMemberInfoResViewModel;

$(async function () {

    // 查看別人主頁 or 個人主頁
    memberInfo = $("#query_memberID").val() ? await GetMemberInfoAPI($("#query_memberID").val() as number) : await GetCurrentMemberInfoAPI();
    
    var memberBrithday = new Date(memberInfo.Brithday);
    var brithday = `${memberBrithday.getFullYear()} 年 ${memberBrithday.getMonth() + 1} 月 ${memberBrithday.getDate()} 日`;

    $('.div_homePage_topBar').html('個人主頁');
    $('.profile_name').html(memberInfo.NickName);
    $('.profile_detail_brithday').html(brithday);
    $('.profile_detail_job').html(memberInfo.Job);
    $('.profile_detail_internest').html(memberInfo.Interest);
    $('.profile_detail_education').html(memberInfo.Education);
    $('.profile_photo').attr('src', memberInfo.ProfilePhotoURL);
    $('.profile_background').attr('src', memberInfo.BackgroundPhotoURL);

    await ReflashFriendStatus();

    // 控制 Img Default Style
    Common.ControllImgDefaultStyle();
}); 

/**
 * 刷新好友狀態
 * */
async function ReflashFriendStatus() {
    // 若為別人主頁
    if ($("#query_memberID").val()) {
        $('.div_homePage_topBar').html(`${memberInfo.NickName}的個人主頁`);

        let model = new CommonMemberViewModel(memberInfo.MemberID);
        var firendStatus = await GetFriendStatusAPI(model);
        $('.div_sendMsg').hide();

        switch (firendStatus.FriendStatus) {
            case FriendStatusEnum.非好友:
                $('.div_addFriend').css('width', '100px');
                $('.div_addFriend').css('background-color', '#F2A1A1');
                $('.addFriend_icon').show();
                $('.lbl_addFriend').click(SendFriendInvitation)
                    .html('加好友');
                $('.lbl_addFriend').css('padding-left', '30px');
                break;
            case FriendStatusEnum.已寄送好友邀請:
                $('.div_addFriend').css('width', '110px');
                $('.div_addFriend').css('background-color', 'rgba(0, 0, 0, 0.3)');
                $('.addFriend_icon').hide();
                $('.lbl_addFriend').click(RevokeFriendInvitation)
                    .html('收回好友邀請');
                $('.lbl_addFriend').css('padding-left', '0px');

                break;
            case FriendStatusEnum.已接收好友邀請:

                $('.lbl_addFriend').click(() =>
                    Common.SweetAlertConfirm(`是否接受 ${memberInfo.NickName} \n的好友邀請?`,
                        () => DecideFriendInvitation(DecideFriendInvitationEnum.接受),
                        () => DecideFriendInvitation(DecideFriendInvitationEnum.拒絕), '拒絕'))
                    .html('回覆');
                break;
            case FriendStatusEnum.為好友:
                $('.div_sendMsg').show();
                $('.div_addFriend').css('width', '110px');
                $('.div_addFriend').css('background-color', 'rgba(0, 0, 0, 0.3)');
                $('.addFriend_icon').attr('src', '/images/deleteFriend.svg');
                $('.lbl_addFriend').click(DeleteFriend)
                    .html('刪除好友');
                break;

        }
        $('.div_addFriend').show();
        Common.ControllSVG();
    }
}

/**
 * 發送好友邀請
 * */
function SendFriendInvitation() {
    let model = new CommonMemberViewModel(memberInfo.MemberID);
    let successFunc = () => ReflashFriendStatus();

    SendFriendInvitationAPI(model, successFunc, `確定是否對 ${memberInfo.NickName} \n發送好友邀請?`);
}

/**
 * 判斷好友邀請 (接受 or 拒絕)
 * */
function DecideFriendInvitation(decide: DecideFriendInvitationEnum) {
    let model = new DecideFriendInvitationReqViewModel(memberInfo.MemberID, decide);
    let successFunc = () => ReflashFriendStatus();

    DecideFriendInvitationAPI(model, successFunc, `確定是否${DecideFriendInvitationEnum[decide]} ${memberInfo.NickName} \n的好友邀請?`);
}

/**
 * 收回好友邀請
 * */
function RevokeFriendInvitation() {
    let model = new CommonMemberViewModel(memberInfo.MemberID);
    let successFunc = () => ReflashFriendStatus();

    RevokeFriendInvitationAPI(model, successFunc, `確定是否收回 ${memberInfo.NickName} \n的好友邀請?`);
}

/**
 * 刪除好友
 * */
function DeleteFriend() {
    let model = new CommonMemberViewModel(memberInfo.MemberID);
    let successFunc = () => ReflashFriendStatus();

    DeleteFriendAPI(model, successFunc, `確定是否刪除與 ${memberInfo.NickName} \n的好友關係?`);
}

/**
 * todo 聊天室
 * */
function SendMsg() {
    alert('聊天 todo');
}