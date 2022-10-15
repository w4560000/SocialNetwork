﻿$(async function () {
    await ToggleTab("MyFriend");
});

/**
 * 切換 Tab
 * @param tab tab名稱
 */
async function ToggleTab(tab: string) {
    await SetFriendManagementTab($(`.div_firend_tab_name_container[Tab ='${tab}']`).get(0) as HTMLElement);
}
/**
 * 切換好友管理 Tab
 * @param e HTMLElement
 * */
async function SetFriendManagementTab(e: HTMLElement) {
    $('.div_firend_tab_name_container').each(function () {
        $(this).removeClass('div_firend_tab_name_container_color');
    });
    
    var tab = $(e).attr('tab');
    $(`.div_firend_tab_name_container[Tab="${tab}"]`).addClass('div_firend_tab_name_container_color');

    switch (tab) {
        case 'MyFriend':
            $('.MyFriend').empty();

            var friendList = await GetFriendListAPI();
            friendList.forEach((f) => $('.MyFriend').append(MyFriendHtmlTemplate(f)));
            
            $('.MyFriend').show();
            $('.FriendInvitation').hide();
            $('.SendFriendInvitation').hide();
            break;
        case 'FriendInvitation':
            $('.FriendInvitation').empty();

            var friendInvitatioinList = await GetFriendInvitationListAPI();
            friendInvitatioinList.forEach((f) => $('.FriendInvitation').append(FriendInvitationHtmlTemplate(f)));

            $('.MyFriend').hide();
            $('.FriendInvitation').show();
            $('.SendFriendInvitation').hide();
            break;
        case 'SendFriendInvitation':
            $('.SendFriendInvitation').empty();

            var sendFriendInvitatioinList = await GetSendFriendInvitationListAPI();
            sendFriendInvitatioinList.forEach((f) => $('.SendFriendInvitation').append(SendFriendInvitationHtmlTemplate(f)));

            $('.MyFriend').hide();
            $('.FriendInvitation').hide();
            $('.SendFriendInvitation').show();
            break;
    }

    // 控制 Img Default Style
    Common.ControllImgDefaultStyle();
}

/**
 * 我的好友 Html Template
 * @param member 會員
 */
function MyFriendHtmlTemplate(member: GetFriendListResViewModel) {
    return `
<div class="div_friend_profile" style="height: 360px;">
    <a href="/Home/HomePage/${member.MemberID}" target="_blank">
        <img class="div_friend_img" src="${member.ProfilePhotoURL}">
    </a>
    <div class="div_friend_name_content">
        <a class="div_friend_name" href="/Home/HomePage/${member.MemberID}" target="_blank">${member.NickName}</a>
    </div>
    <input class="div_frient_button_gray" type="button" value="移除好友" onclick="Friend.DeleteFriend(${member.MemberID}, '${member.NickName}', () => ToggleTab('MyFriend'))"/>
</div>
  `;
}

/**
 * 好友邀請 Html Template
 * @param member 會員
 */
function FriendInvitationHtmlTemplate(member: GetFriendListResViewModel) {
    return `
<div class="div_friend_profile">
    <a href="/Home/HomePage/${member.MemberID}" target="_blank">
        <img class="div_friend_img" src="${member.ProfilePhotoURL}">
    </a>
    <div class="div_friend_name_content">
        <a class="div_friend_name" href="/Home/HomePage/${member.MemberID}" target="_blank">${member.NickName}</a>
    </div>
    <input class="div_frient_button_pink" type="button" value="接受" onclick="Friend.DecideFriendInvitation(${member.MemberID}, '${member.NickName}', ${DecideFriendInvitationEnum.接受}, () => ToggleTab('FriendInvitation'))"/>
    <input class="div_frient_button_gray" type="button" value="拒絕" onclick="Friend.DecideFriendInvitation(${member.MemberID}, '${member.NickName}', ${DecideFriendInvitationEnum.拒絕}, () => ToggleTab('FriendInvitation'))"/>
</div>
  `;
}

/**
 * 您送出的好友邀請 Html Template
 * @param member 會員
 */
function SendFriendInvitationHtmlTemplate(member: GetFriendListResViewModel) {
    return `
<div class="div_friend_profile" style="height: 360px;">
    <a href="/Home/HomePage/${member.MemberID}" target="_blank">
        <img class="div_friend_img" src="${member.ProfilePhotoURL}">
    </a>
    <div class="div_friend_name_content">
        <a class="div_friend_name" href="/Home/HomePage/${member.MemberID}" target="_blank">${member.NickName}</a>
    </div>
    <input class="div_frient_button_gray" type="button" value="收回邀請" onclick="Friend.RevokeFriendInvitation(${member.MemberID}, '${member.NickName}', () => ToggleTab('SendFriendInvitation'))"/>
</div>
  `;
}