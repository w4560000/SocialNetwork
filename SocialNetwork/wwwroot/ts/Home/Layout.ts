﻿import { API, Enum, Request, Response, Common, ViewModel } from "../Common/Index.js";
import { ChatHubConnection }  from "../Common/ChatHubConnection.js";

export var user: ViewModel.User;
var chatHubConnection: ChatHubConnection = new ChatHubConnection();

export const LayoutPage = {
    Init: async () => {
        chatHubConnection.connect(LayoutPage.ReflashFriendStatus);

        // 點選其他 element 時 自動隱藏展開的會員狀態
        $("body").click((event) => {
            var currentElemetClass = ($(event.target).attr('class')) as string;
            if (currentElemetClass !== undefined && !currentElemetClass.includes('index_status_select')) {
                if ($('#memberStatus_1').is(':visible')) {
                    $('.meunContent > ul').children('li').toggle();
                    $('.index_status_select').toggleClass('index_status_select_up');
                }
            }
        });

        // 展開 會員狀態下拉
        $(".index_status").on("click", ".index_status_select", function () {
            $(this).toggleClass('index_status_select_up');
            $(this).closest(".meunContent > ul").children('li').toggle();
        });

        // 更新會員狀態
        $(".index_status").on("click", "li", function () {
            var allOptions = $(".meunContent > ul").children('li');
            allOptions.removeClass('selected');
            $(this).addClass('selected');
            $(".meunContent > ul").children('.index_status_select').html($(this).html());
            $('.index_status_select').toggleClass('index_status_select_up');

            let currentSelectStatus = $(this).attr('id')?.split('_')[1] as string;
            let model = new Request.UpdateMemberStatusReqViewModel(parseInt(currentSelectStatus) as Enum.MemberStatusEnum);
            API.UpdateMemberStatusAPI(model);
            allOptions.toggle();
        });

        // 載入會員狀態
        $("ul").children('.index_status_select').html($('#memberStatus_' + user.Status).html());

        // 載入聊天室好友清單
        var friendList = await API.GetFriendListAPI();
        LayoutPage.ReflashFriendList(friendList);

        // 控制 Img Default Style
        Common.ControllImgDefaultStyle();

        // 建立 chatHubConnection 連線
        //chatHubConnection.connect(LayoutPage.ReflashFriendStatus);

        // 設定 Menu 底色 (根據當前頁面)
        LayoutPage.SetMenuColor();
    },
    /** 登出 */
    Logout: () => {
        let successFunc = () => {
            Common.SweetAlertRedirect("/Member/Login", "登入頁");
        };
        let errorFunc = () => { };
        API.LogoutAPI("登出中", successFunc, errorFunc, '確定是否登出?');
    },
    /**
     * 載入會員資料
     * @param _user 會員資料
     */
    UserInit: (_user: ViewModel.User) => {
        user = new ViewModel.User().Init(_user);
    },
    /**
     * 設定 Menu 底色 (根據當前頁面)
     * */
    SetMenuColor: () => {
        $('.index_menuTextBackground').each(function () {
            $(this).removeClass('index_menuTextBackground_color');
        });

        var pathName = window.location.pathname;

        switch (pathName) {
            case '/':
            case '/Home/Index':
                $('.index_menuTextBackground[Action="Index"]').addClass('index_menuTextBackground_color');
                break;
            case '/Home/HomePage':
                $('.index_menuTextBackground[Action="HomePage"]').addClass('index_menuTextBackground_color');
                break;
            case '/Home/MemberSetting':
                $('.index_menuTextBackground[Action="MemberSetting"]').addClass('index_menuTextBackground_color');
                break;
            case '/Home/FriendManagement':
                $('.index_menuTextBackground[Action="FriendManagement"]').addClass('index_menuTextBackground_color');
                break;
        }
    },
    /**
     * 刷新聊天室好友狀態 (ChatHubConnection)
     * */
    ReflashFriendStatus: (friend: Response.GetFriendListResViewModel) => {
        
        $(`.friend_content > .friend[MemberID=${friend.MemberID}]`).empty();
        $(`.friend_content > .friend[MemberID=${friend.MemberID}]`).append(LayoutPage.MyFriendChatDetailHtmlTemplate(friend));

        // 控制 Img Default Style
        Common.ControllImgDefaultStyle();
    },
    /**
     * 刷新聊天室好友清單
     * @param friendList 好友清單
     */
    ReflashFriendList: (friendList: Array<Response.GetFriendListResViewModel>) => {
        $('.friend_content').empty();

        // 聊天室載入好友清單
        friendList.forEach(f => $('.friend_content').append(LayoutPage.MyFriendChatHtmlTemplate(f)));
    },
    /**
     * 聊天室好友 Html Template
     * @param friend 好友資料
     */
    MyFriendChatHtmlTemplate: (friend: Response.GetFriendListResViewModel) => {
        return `
    <div class="friend" MemberID="${friend.MemberID}">
        ${LayoutPage.MyFriendChatDetailHtmlTemplate(friend)}
    </div>
  `;
    },
    /**
     * 聊天室好友 Detail Html Template
     * @param friend 好友資料
     */
    MyFriendChatDetailHtmlTemplate: (friend: Response.GetFriendListResViewModel) => {
        return `
    <div class="friend_img_container">
        <span class="friend_img_status_color friend_img_status_color_${friend.Status}"></span>
        <img class="friend_img" src="${friend.ProfilePhotoURL}" />
    </div> 
    <div class="friend_name">${friend.NickName}</div>
  `;
    }
}

window["LayoutPage"] = LayoutPage;