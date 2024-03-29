﻿var memberInfo: GetMemberInfoResViewModel;

const HomePage = {
    Init: async () => {
        // 查看別人主頁 or 個人主頁
        memberInfo = $("#query_memberID").val() != 0 ? await GetMemberInfoAPI($("#query_memberID").val() as number) : await GetCurrentMemberInfoAPI();

        let brithday = "";
        if (memberInfo.Brithday !== null) {
            let memberBrithday = new Date(memberInfo.Brithday);
            brithday = `${memberBrithday.getFullYear()} 年 ${memberBrithday.getMonth() + 1} 月 ${memberBrithday.getDate()} 日`;
        }

        $('.div_homePage_topBar').html('個人主頁');
        $('.profile_name').html(memberInfo.NickName);
        $('.profile_detail_brithday').html(brithday);
        $('.profile_detail_job').html(memberInfo.Job);
        $('.profile_detail_internest').html(memberInfo.Interest);
        $('.profile_detail_education').html(MemberEducationEnum[memberInfo.Education]);
        $('.profile_photo').attr('src', memberInfo.ProfilePhotoURL);
        $('.profile_background').attr('src', memberInfo.BackgroundPhotoURL);

        await HomePage.ReflashFriendStatus();

        // 別人的個人主頁 隱藏發文區塊
        if ($("#query_memberID").val() != 0) {
            $('.div_mypost').remove();
        }

        // 控制 Img Default Style
        Common.ControllImgDefaultStyle();
    },
    /**
     * 刷新好友狀態
     * */
    ReflashFriendStatus: async () => {
        // 若為別人主頁
        if ($("#query_memberID").val() != 0) {
            $('.div_homePage_topBar').html(`${memberInfo.NickName}的個人主頁`);

            let model = new CommonMemberViewModel(memberInfo.MemberID);
            let firendStatus = await GetFriendStatusAPI(model);
            $('.div_sendMsg').hide();

            switch (firendStatus.FriendStatus) {
                case FriendStatusEnum.非好友:
                    $('.div_addFriend').css('width', '100px');
                    $('.div_addFriend').css('background-color', '#F2A1A1');
                    $('.addFriend_icon').show();
                    $('.lbl_addFriend').click(() => Friend.SendFriendInvitation(memberInfo.MemberID, memberInfo.NickName, () => HomePage.ReflashFriendStatus()))
                        .html('加好友');
                    $('.lbl_addFriend').css('padding-left', '30px');
                    break;
                case FriendStatusEnum.已寄送好友邀請:
                    $('.div_addFriend').css('width', '110px');
                    $('.div_addFriend').css('background-color', 'rgba(0, 0, 0, 0.3)');
                    $('.addFriend_icon').hide();
                    $('.lbl_addFriend').click(() => Friend.RevokeFriendInvitation(memberInfo.MemberID, memberInfo.NickName, () => HomePage.ReflashFriendStatus()))
                        .html('收回好友邀請');
                    $('.lbl_addFriend').css('padding-left', '0px');

                    break;
                case FriendStatusEnum.已接收好友邀請:

                    $('.lbl_addFriend').click(() =>
                        Common.SweetAlertConfirm(`是否接受 ${memberInfo.NickName} \n的好友邀請?`,
                            () => Friend.DecideFriendInvitation(memberInfo.MemberID, memberInfo.NickName, DecideFriendInvitationEnum.接受, () => HomePage.ReflashFriendStatus()),
                            () => Friend.DecideFriendInvitation(memberInfo.MemberID, memberInfo.NickName, DecideFriendInvitationEnum.拒絕, () => HomePage.ReflashFriendStatus()), '拒絕'))
                        .html('回覆');
                    break;
                case FriendStatusEnum.為好友:
                    $('.div_sendMsg').show();
                    $('.div_addFriend').css('width', '110px');
                    $('.div_addFriend').css('background-color', 'rgba(0, 0, 0, 0.3)');
                    $('.addFriend_icon').attr('src', '/images/deleteFriend.svg');
                    $('.lbl_addFriend').click(() => Friend.DeleteFriend(memberInfo.MemberID, memberInfo.NickName, () => HomePage.ReflashFriendStatus()))
                        .html('刪除好友');
                    break;

            }
            $('.div_addFriend').show();
            Common.ControllSVG();
        }
    },
    /**
     * todo 聊天室
     * */
    SendMsg: () => {
        alert('聊天 todo');
    }
}

window["HomePage"] = HomePage;
window["Friend"] = Friend;