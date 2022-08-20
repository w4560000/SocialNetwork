var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.Init = function (user) {
        this.MemberID = user.MemberID;
        this.Account = user.Account;
        this.NickName = user.NickName;
        this.ProfilePhotoUrl = user.ProfilePhotoUrl;
        this.Status = user.Status;
        return this;
    };
    return User;
}());
$(document).ready(function () {
});
var user;
$(function () {
    // 點選其他 element 時 自動隱藏展開的會員狀態
    $("body").click(function (event) {
        var currentElemetClass = ($(event.target).attr('class'));
        if (!currentElemetClass.includes('index_status_select')) {
            if ($('#memberStatus_1').is(':visible')) {
                $('.meunContent > ul').children('li').toggle();
                $('.index_status_select').toggleClass('index_status_select_up');
            }
        }
    });
    $(".index_status").on("click", ".index_status_select", function () {
        $(this).toggleClass('index_status_select_up');
        $(this).closest(".meunContent > ul").children('li').toggle();
    });
    $(".index_status").on("click", "li", function () {
        var _a;
        var allOptions = $(".meunContent > ul").children('li');
        allOptions.removeClass('selected');
        $(this).addClass('selected');
        $(".meunContent > ul").children('.index_status_select').html($(this).html());
        $('.index_status_select').toggleClass('index_status_select_up');
        var currentSelectStatus = (_a = $(this).attr('id')) === null || _a === void 0 ? void 0 : _a.split('_')[1];
        var model = new UpdateMemberStatusReqViewModel(parseInt(currentSelectStatus));
        var successFunc = function () { };
        var errorFunc = function () { };
        UpdateMemberStatusAPI(model, successFunc, errorFunc);
        allOptions.toggle();
    });
    // 載入會員狀態
    $("ul").children('.index_status_select').html($('#memberStatus_' + user.Status).html());
    for (var i = 0; i < 20; i++) {
        $('.friend_content').append("<div class=\"friend\">" +
            "<div class=\"friend_img_container\">" +
            "<img class=\"friend_img\" src=\"".concat(user.ProfilePhotoUrl, "\"/>") +
            "</div>" +
            "<div class=\"friend_name\">QQ123</div>");
    }
});
/** 登出 */
function Logout() {
    var successFunc = function () {
        Common.SweetAlertRedirect("/Member/Login", "登入頁");
    };
    var errorFunc = function () { };
    LogoutAPI("登出中", successFunc, errorFunc, '確定是否登出?');
}
/**
 * 載入會員資料
 * @param _user 會員資料
 */
function UserInit(_user) {
    user = new User().Init(_user);
}
