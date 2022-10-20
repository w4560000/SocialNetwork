class User {
    MemberID: number;
    Account: string;
    NickName: string;
    ProfilePhotoUrl: string;
    Status: MemberStatusEnum;
    IsOriginalMember: boolean;

    public Init(user: User): User {
        this.MemberID = user.MemberID;
        this.Account = user.Account;
        this.NickName = user.NickName;
        this.ProfilePhotoUrl = user.ProfilePhotoUrl;
        this.Status = user.Status;

        let oAuthList = ["google"];
        this.IsOriginalMember = oAuthList.every(a => a != user.Account.split('@').pop());

        return this;
    }
}

var user: User;
$(async function () {
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
        let model = new UpdateMemberStatusReqViewModel(parseInt(currentSelectStatus) as MemberStatusEnum);
        UpdateMemberStatusAPI(model);
        allOptions.toggle();
    });

    // 載入會員狀態
    $("ul").children('.index_status_select').html($('#memberStatus_' + user.Status).html());

    var friendList = await GetFriendListAPI();

    // 聊天室載入好友清單
    friendList.forEach(f => $('.friend_content').append(MyFriendChatHtmlTemplate(f)));

    // 控制 Img Default Style
    Common.ControllImgDefaultStyle();

    // 設定 Menu 底色 (根據當前頁面)
    SetMenuColor();
});

/** 登出 */
function Logout() {
    let successFunc = () => {
        Common.SweetAlertRedirect("/Member/Login", "登入頁");
    };
    let errorFunc = () => { };
    LogoutAPI("登出中", successFunc, errorFunc, '確定是否登出?');
}

/**
 * 載入會員資料
 * @param _user 會員資料
 */
function UserInit(_user) {
    user = new User().Init(_user);
}

/**
 * 設定 Menu 底色 (根據當前頁面)
 * */
function SetMenuColor() {
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
}

/**
 * 聊天室好友 Html Template
 * @param member 會員
 */
function MyFriendChatHtmlTemplate(friend: GetFriendListResViewModel) {
    return `
<div class="friend">
    <div class="friend_img_container">
        <img class="friend_img" src = "${friend.ProfilePhotoURL}" />
    </div> 
<div class="friend_name">${friend.NickName}</div>
  `;
}