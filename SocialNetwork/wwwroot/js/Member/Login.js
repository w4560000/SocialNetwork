$(function () {
    // 日期選擇元件
    Common.DatepickerInit($('#birthday_datepicker'));
    // 控制 SVG CSS
    Common.ControllSVG();
    $('#login_account').keyup(function (e) { return Common.RemoveErrorInput(e.target); });
    $('#login_password').keyup(function (e) { return Common.RemoveErrorInput(e.target); });
    $('#singup_name').keyup(function (e) { return Common.RemoveErrorInput(e.target); });
    $('#singup_account').keyup(function (e) { return Common.RemoveErrorInput(e.target); });
    $('#singup_password').keyup(function (e) { return Common.RemoveErrorInput(e.target); });
    $('#singup_passwordCheck').keyup(function (e) { return Common.RemoveErrorInput(e.target); });
    $('#singup_mail').keyup(function (e) { return Common.RemoveErrorInput(e.target); });
    $('#singup_vCode').keyup(function (e) { return Common.RemoveErrorInput(e.target); });
});
/** 登入 */
function Login() {
    var errorMsg = {
        login_account: '請輸入帳號',
        login_password: '請輸入密碼'
    };
    var error = Common.Validate(errorMsg);
    if (error) {
        Common.SweetAlertError(error);
        return;
    }
    var model = new LoginReqViewModel($('#login_account').val(), $('#login_password').val());
    var successFunc = function () {
        Common.SweetAlertRedirect("/Home/Index", "首頁");
    };
    var errorFunc = function () { };
    LoginAPI("登入中", model, successFunc, errorFunc);
}
/** Google 第三方登入 */
function GoogleLogin() {
    var client = google.accounts.oauth2.initCodeClient({
        client_id: '303901313937-vtppba8h2st6brqtcpgm0ti380890a5o.apps.googleusercontent.com',
        scope: 'profile email',
        ux_mode: 'popup',
        callback: function (response) {
            var successFuc = function () {
                Common.SweetAlertRedirect("/Home/Index", "首頁");
            };
            var errorFunc = function () { };
            var model = new GoogleLoginReqViewModel(response.code);
            GoogleLoginAPI("登入中", model, successFuc, errorFunc);
        },
    });
    client.requestCode();
}
/** 寄送驗證碼 */
function SendVCode() {
    var model = new SendVCodeReqViewModel($('#singup_mail').val());
    var successFunc = function () { };
    var errorFunc = function () {
        $('#singup_mail').addClass('input-error');
    };
    SendVCodeAPI("寄送驗證碼中", model, successFunc, errorFunc);
}
/** 註冊 */
function Singup() {
    var errorMsg = {
        singup_name: '您尚未填寫 會員名稱',
        singup_account: '您尚未填寫 會員帳號',
        singup_password: '您尚未填寫 會員密碼',
        singup_passwordCheck: '您尚未填寫 確認密碼',
        singup_mail: '您尚未填寫 電子郵件',
        singup_vCode: '您尚未填寫 驗證碼'
    };
    var error = Common.Validate(errorMsg);
    // 驗證特殊邏輯
    if (!error) {
        var regexAccountValidation = new RegExp('^.[A-Za-z0-9]+$');
        if ($("#singup_account").val().length < 6 || !regexAccountValidation.test(($("#singup_account").val()))) {
            error = '會員帳號需至少為6碼的英數字';
            $('#singup_account').addClass('input-error');
        }
        else if ($("#singup_password").val() != $("#singup_passwordCheck").val()) {
            error = '會員密碼與確認密碼不相符';
            $('#singup_password').addClass('input-error');
            $('#singup_passwordCheck').addClass('input-error');
        }
    }
    if (error) {
        Common.SweetAlertError(error);
        return;
    }
    var model = new SignupReqViewModel($("#singup_name").val(), $("#singup_account").val(), $("#singup_password").val(), $("#singup_passwordCheck").val(), $("#singup_mail").val(), $("#singup_vCode").val());
    var successFunc = function () {
        Common.Popup('MemberInfo');
    };
    var errorFunc = function () { };
    SignupAPI("註冊中", model, successFunc, errorFunc);
}
/** 更新會員公開資訊 */
function UpdateMemberPublicInfo() {
    var memberPublicInfo = 0;
    $('.InfoIcon').each(function (i) {
        if (this.src.includes('InfoPublic')) {
            memberPublicInfo += Number($(this).attr('memberpublicinfoflag'));
        }
    });
    if (!$('#birthday_datepicker').val()) {
        Common.SweetAlertError('請選擇生日');
        return;
    }
    var model = new UpdateMemberPublicInfoReqViewModel(new Date($('#birthday_datepicker').val()), $('#infoInternest').val(), $('#infoJob').val(), $('#infoEducation').val(), memberPublicInfo);
    var successFunc = function () {
        Common.SweetAlertRedirect('/Home/Index', '首頁');
    };
    var errorFunc = function () { };
    UpdateMemberPublicInfoAPI("更新會員資訊中", model, successFunc, errorFunc);
}
/**
 * 會員資料公開或隱藏
 * @param e HTMLImageElement
 */
function InfoIconToggle(e) {
    var hideImage = "/images/InfoHide.png";
    var publicImage = "/images/InfoPublic.png";
    e.src = e.src.includes(publicImage) ? hideImage : publicImage;
}
/** 忘記密碼 申請重設密碼*/
function ResetPassword() {
    var errorMsg = {
        forgotPassword_account: '您尚未填寫 會員帳號',
        forgotPassword_mail: '您尚未填寫 電子郵件'
    };
    var error = Common.Validate(errorMsg);
    if (error) {
        Common.SweetAlertError(error);
        return;
    }
    var model = new ResetPasswordReqViewModel($('#forgotPassword_account').val(), $('#forgotPassword_mail').val());
    var successFunc = function () { };
    var errorFunc = function () { };
    ResetPasswordAPI("寄送重設密碼郵件中", model, successFunc, errorFunc);
}
