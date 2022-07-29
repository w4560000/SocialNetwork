$(function () {

    // 日期選擇元件
    Common.DatepickerInit($('#birthday_datepicker'));

    // 控制 SVG CSS
    Common.ControllSVG();

    $('#login_account').keyup((e) => Common.RemoveErrorInput(e.target));
    $('#login_password').keyup((e) => Common.RemoveErrorInput(e.target));

    $('#singup_name').keyup((e) => Common.RemoveErrorInput(e.target));
    $('#singup_account').keyup((e) => Common.RemoveErrorInput(e.target));
    $('#singup_password').keyup((e) => Common.RemoveErrorInput(e.target));
    $('#singup_passwordCheck').keyup((e) => Common.RemoveErrorInput(e.target));
    $('#singup_mail').keyup((e) => Common.RemoveErrorInput(e.target));
    $('#singup_vCode').keyup((e) => Common.RemoveErrorInput(e.target));
});

/** 登入 */
function Login() {
    let errorMsg = {
        login_account: '請輸入帳號',
        login_password: '請輸入密碼'
    };

    let error = Common.Validate(errorMsg);

    if (error) {
        Common.SweetAlertError(error);
        return;
    }

    let model = new LoginReqViewModel($('#login_account').val() as string, $('#login_password').val() as string);
    let successFuc = () => {
        window.location.href = "/Home/Index";
    };
    let errorFuc = (res) => { };
    LoginAPI("登入中", model, successFuc, errorFuc);
}

/** 寄送驗證碼 */
function SendVCode() {
    let model = new SendVCodeReqViewModel($('#singup_mail').val() as string);
    let successFuc = (res) => { };
    let errorFuc = (res) => {
        $('#singup_mail').addClass('input-error');
    };

    SendVCodeAPI("寄送驗證碼中", model, successFuc, errorFuc);
}

/** 註冊 */
function Singup() {
    let errorMsg = {
        singup_name: '您尚未填寫 會員名稱',
        singup_account: '您尚未填寫 會員帳號',
        singup_password: '您尚未填寫 會員密碼',
        singup_passwordCheck: '您尚未填寫 確認密碼',
        singup_mail: '您尚未填寫 電子郵件',
        singup_vCode: '您尚未填寫 驗證碼'
    };

    let error = Common.Validate(errorMsg);

    // 驗證特殊邏輯
    if (!error) {
        let regexAccountValidation = new RegExp('^.[A-Za-z0-9]+$');
        if (($("#singup_account").val() as string).length < 6 || !regexAccountValidation.test(($("#singup_account").val()) as string)) {
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

    let model = new SignupReqViewModel(
        $("#singup_name").val() as string,
        $("#singup_account").val() as string,
        $("#singup_password").val() as string,
        $("#singup_passwordCheck").val() as string,
        $("#singup_mail").val() as string,
        $("#singup_vCode").val() as string
    );
    let successFuc = (res) => {
        Common.Popup('MemberInfo');
    };
    let errorFuc = (res) => { };

    SignupAPI("註冊中", model, successFuc, errorFuc);
}

/** 更新會員公開資訊 */
function UpdateMemberPublicInfo() {
    let memberPublicInfo = 0;

    $('.InfoIcon').each(function (i) {
        if ((<HTMLImageElement>this).src.includes('InfoPublic')) {
            memberPublicInfo += Number($(this).attr('memberpublicinfoflag'));
        }
    });

    if (!$('#birthday_datepicker').val()) {
        Common.SweetAlertError('請選擇生日');
        return;
    }

    let model = new UpdateMemberPublicInfoReqViewModel(
        new Date($('#birthday_datepicker').val() as string),
        $('#infoInternest').val() as string,
        $('#infoJob').val() as string,
        $('#infoEducation').val() as string,
        memberPublicInfo);
    let successFuc = (res) => {
        Common.SweetAlertRedirect('/Home/Index', '首頁');
    };
    let errorFuc = (res) => { };

    UpdateMemberPublicInfoAPI("更新會員資訊中", model, successFuc, errorFuc);
}

/**
 * 會員資料公開或隱藏
 * @param e HTMLImageElement
 */
function InfoIconToggle(e: HTMLImageElement) {
    var hideImage = "/images/InfoHide.png";
    var publicImage = "/images/InfoPublic.png";
    e.src = e.src.includes(publicImage) ? hideImage : publicImage;
}

/** 忘記密碼 申請重設密碼*/
function ResetPassword() {
    let errorMsg = {
        forgotPassword_account: '您尚未填寫 會員帳號',
        forgotPassword_mail: '您尚未填寫 電子郵件'
    };

    let error = Common.Validate(errorMsg);

    if (error) {
        Common.SweetAlertError(error);
        return;
    }

    let model = new ResetPasswordReqViewModel(
        $('#forgotPassword_account').val() as string,
        $('#forgotPassword_mail').val() as string);
    let successFuc = (res) => { };
    let errorFuc = (res) => { };

    ResetPasswordAPI("寄送重設密碼郵件中", model, successFuc, errorFuc);
}