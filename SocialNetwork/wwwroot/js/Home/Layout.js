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
var user;
$(function () {
    //$("ul").children('.index_status_select').html($(this).html());
    // 控制 SVG CSS
    Common.ControllSVG();
    //$("body").on("click", function (event) {
    //    debugger
    //    alert(event.target.id);
    //});
    $("body").click(function (event) {
        var currentElemetClass = ($(event.target).attr('class'));
        if (currentElemetClass !== 'index_status_select') {
            if ($('#memberStatus_1').is(':visible')) {
                $("ul").children('li').toggle();
            }
        }
    });
    $(".index_status").on("click", ".index_status_select", function () {
        $(this).closest("ul").children('li').toggle();
    });
    $(".index_status").on("click", "li", function () {
        var allOptions = $("ul").children('li');
        allOptions.removeClass('selected');
        $(this).addClass('selected');
        $("ul").children('.index_status_select').html($(this).html());
        allOptions.toggle();
    });
    $("ul").children('.index_status_select').html($('#memberStatus_' + user.Status).html());
});
/** 登入 */
function Logout() {
    var successFunc = function () {
        Common.SweetAlertRedirect("/Member/Login", "登入頁");
    };
    var errorFunc = function (res) { };
    LogoutAPI("登出中", successFunc, errorFunc);
}
function UserInit(_user) {
    user = new User().Init(_user);
}