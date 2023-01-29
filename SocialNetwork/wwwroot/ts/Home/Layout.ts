var user: User;
var chatHubConnection: ChatHubConnection;

const LayoutPage = {
    Init: async (_user: User) => {
        user = new User().Init(_user);
        chatHubConnection = new ChatHubConnection();
        chatHubConnection.connect(LayoutPage.ReflashFriendStatus);

        $("body").click((event) => {
            let currentElemetClass = ($(event.target).attr('class')) as string;

            // 點選其他 element 時 自動隱藏展開的會員狀態
            if (currentElemetClass === undefined || (currentElemetClass !== undefined && !currentElemetClass.includes('index_status_select'))) {
                if ($('#memberStatus_1').is(':visible')) {
                    $('.menuContent > ul').children('li').toggle();
                    $('.index_status_select').toggleClass('index_status_select_up');
                }
            }

            // 點選其他 element 時 自動隱藏展開的貼文選項
            if (currentElemetClass === undefined || (currentElemetClass !== undefined && !currentElemetClass.includes('postAction'))) {
                let ul = $(`.ul_postAction[postkey=${tempSelectPostKey}]`);
                if (ul.is(':visible')) {
                    ul.toggle();
                }
            }

            // 點選其他 element 時 自動隱藏搜尋會員區塊
            if (currentElemetClass === undefined || (currentElemetClass !== undefined && !currentElemetClass.includes('member_search '))) {
                if ($('.member_search_result').is(':visible')) {
                    $('.member_search_result').hide();
                    $('.member_search_content').empty();
                }
            }
        });

        // 展開 會員狀態下拉
        $(".index_status").on("click", ".index_status_select", function () {
            $(this).toggleClass('index_status_select_up');
            $(this).closest(".menuContent > ul").children('li').toggle();
        });

        // 更新會員狀態
        $(".index_status").on("click", "li", function () {
            let allOptions = $(".menuContent > ul").children('li');
            allOptions.removeClass('selected');
            $(this).addClass('selected');
            $(".menuContent > ul").children('.index_status_select').html($(this).html());
            $('.index_status_select').toggleClass('index_status_select_up');

            let currentSelectStatus = $(this).attr('id')?.split('_')[1] as string;
            let model = new UpdateMemberStatusReqViewModel(parseInt(currentSelectStatus) as MemberStatusEnum);
            UpdateMemberStatusAPI(model);
            allOptions.toggle();
        });

        // 載入會員狀態
        $("ul").children('.index_status_select').html($('#memberStatus_' + user.Status).html());

        // 載入聊天室好友清單
        let friendList = await GetFriendListAPI();
        LayoutPage.ReflashFriendList(friendList);

        // 綁定會員搜尋輸入框 input Event
        $('.member_search').on('input focus', async function (e) {
            let _this = $(this);
            if (!_this.val()) {
                $('.member_search_result').hide();
                $('.member_search_content').empty();
                return;
            }

            let model = new SearchMemberReqViewModel(_this.val() as string);
            let searchMemberResult = await SearchMemberAPI(model);
            
            if (searchMemberResult.FriendList.length > 0 || searchMemberResult.MemberList.length > 0) {
                $('.member_search_content').empty();
                let searchMemberHtml = '';

                searchMemberResult.FriendList.forEach(f => searchMemberHtml += LayoutPage.SearchMemberHtmlTemplate(f, true));
                searchMemberResult.MemberList.forEach(f => searchMemberHtml += LayoutPage.SearchMemberHtmlTemplate(f));
                $('.member_search_content').append(searchMemberHtml);
                $('.member_search_result').fadeIn();

                // 控制 Img Default Style
                Common.ControllImgDefaultStyle();
            }
            else {
                $('.member_search_result').fadeOut();
                $('.member_search_content').empty();
            }
        });

        // 控制 Img Default Style
        Common.ControllImgDefaultStyle();

        // 設定 Menu 底色 (根據當前頁面)
        LayoutPage.SetMenuColor();
    },

    /** 登出 */
    Logout: () => {
        let successFunc = () => {
            setTimeout(() => Common.SweetAlertRedirect("/Member/Login", "登入頁"));
            
        };
        let errorFunc = () => { };
        LogoutAPI("登出中", successFunc, errorFunc, '確定是否登出?');
    },

    /**
     * 設定 Menu 底色 (根據當前頁面)
     * */
    SetMenuColor: () => {
        $('.index_menuTextBackground').each(function () {
            $(this).removeClass('index_menuTextBackground_color');
        });

        let pathName = window.location.pathname;

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
    ReflashFriendStatus: (friend: GetFriendListResViewModel) => {
        
        $(`.friend_content > .friend[MemberID=${friend.MemberID}]`).empty();
        $(`.friend_content > .friend[MemberID=${friend.MemberID}]`).append(LayoutPage.MyFriendChatDetailHtmlTemplate(friend));

        // 控制 Img Default Style
        Common.ControllImgDefaultStyle();
    },

    /**
     * 刷新聊天室好友清單
     * @param friendList 好友清單
     */
    ReflashFriendList: (friendList: Array<GetFriendListResViewModel>) => {
        $('.friend_content').empty();

        // 聊天室載入好友清單
        friendList.forEach(f => $('.friend_content').append(LayoutPage.MyFriendChatHtmlTemplate(f)));
    },

    /**
     * 聊天室好友 Html Template
     * @param friend 好友資料
     */
    MyFriendChatHtmlTemplate: (friend: GetFriendListResViewModel) => {
        return `
    <div class="friend" MemberID="${friend.MemberID}">
        ${LayoutPage.MyFriendChatDetailHtmlTemplate(friend)}
    </div>`;
    },

    /**
     * 聊天室好友 Detail Html Template
     * @param friend 好友資料
     */
    MyFriendChatDetailHtmlTemplate: (friend: GetFriendListResViewModel) => {
        return `
    <div class="friend_img_container">
        <span class="friend_img_status_color friend_img_status_color_${friend.Status}"></span>
        <img class="friend_img" src="${friend.ProfilePhotoURL}" />
    </div> 
    <div class="friend_name">${friend.NickName}</div>`;
    },

    /**
     * 搜尋會員 Html Template
     * @param friend 好友資料
     */
    SearchMemberHtmlTemplate: (member: SearchMemberInfoResViewModel, isFriend: boolean = false) => {
        return `
    <div class="member_search_list" onclick="LayoutPage.RedirectToMemberIndex(${member.MemberID})">
        <div class="member_img_container">
            <img class="member_img" src="${member.ProfilePhotoURL}" />
        </div>
        <div class="member_search_info">
            <div class="member_name">${member.NickName}</div>
            ${isFriend ? '<div class="member_friend">朋友</div>' : ''}
        </div>
    </div>`;
    },

    /**
     * 轉導到該會員個人頁
     * @param memberID 會員編號
     */
    RedirectToMemberIndex: (memberID: number) => {
        window.location.href = `/Home/HomePage/${memberID}`;
    }
}

window["LayoutPage"] = LayoutPage;