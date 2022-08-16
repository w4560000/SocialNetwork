class User {
    MemberID: number;
    Account: string;
    NickName: string;
    ProfilePhotoUrl: string;
    Status: MemberStatusEnum;

    public Init(user): User {
        this.MemberID = user.MemberID;
        this.Account = user.Account;
        this.NickName = user.NickName;
        this.ProfilePhotoUrl = user.ProfilePhotoUrl;
        this.Status = user.Status;

        return this;
    }
}

var user;
$(function () {

    // 控制 SVG CSS
    Common.ControllSVG();

    // 點選其他 element 時 自動隱藏展開的會員狀態
    $("body").click((event) => {
        var currentElemetClass = ($(event.target).attr('class'));
        if (currentElemetClass !== 'index_status_select') {
            if ($('#memberStatus_1').is(':visible')) {
                $(".meunContent > ul").children('li').toggle();
            }
        }
    });

    $(".index_status").on("click", ".index_status_select", function () {
        $(this).closest(".meunContent > ul").children('li').toggle();
    });

    $(".index_status").on("click", "li", function () {
        var allOptions = $(".meunContent > ul").children('li');
        allOptions.removeClass('selected');
        $(this).addClass('selected');
        $(".meunContent > ul").children('.index_status_select').html($(this).html());

        let currentSelectStatus = $(this).attr('id')?.split('_')[1] as string;
        let model = new UpdateMemberStatusReqViewModel(parseInt(currentSelectStatus) as MemberStatusEnum);
        let successFunc = () => { };
        let errorFunc = () => { };
        UpdateMemberStatusAPI(model, successFunc, errorFunc);
        allOptions.toggle();
    });

    // 載入會員狀態
    $("ul").children('.index_status_select').html($('#memberStatus_' + user.Status).html());
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
