$(function () {
    // 控制 SVG CSS
    Common.ControllSVG();

    $("ul").on("click", ".index_status_select", function () {
        $(this).closest("ul").children('li').toggle();
    });

    $("ul").on("click", "li", function () {
        var allOptions = $("ul").children('li');
        allOptions.removeClass('selected');
        $(this).addClass('selected');
        $("ul").children('.index_status_select').html($(this).html());
        allOptions.toggle();
    });
});

/** 登入 */
function Logout() {
    let successFunc = () => {
        Common.SweetAlertRedirect("/Member/Login", "登入頁");
    };
    let errorFunc = (res) => { };
    LogoutAPI("登出中", successFunc, errorFunc);
}