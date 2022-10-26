import { API, Enum, Request, Response, Common } from "../Common/Index.js";

export const LoginPage = {
    Init: () => {
        // 日期選擇元件
        Common.DatepickerInit(
            $('#brithday_datepicker'),
            (dateText: string, inst: any) => {
                $("#year").val(inst.selectedYear);
                $("#month").val(inst.selectedMonth + 1);
                $("#day").val(inst.selectedDay);
            });

        $('#login_account').keyup((e) => Common.RemoveErrorInput(e.target));
        $('#login_password').keyup((e) => Common.RemoveErrorInput(e.target));

        $('#singup_name').keyup((e) => Common.RemoveErrorInput(e.target));
        $('#singup_account').keyup((e) => Common.RemoveErrorInput(e.target));
        $('#singup_password').keyup((e) => Common.RemoveErrorInput(e.target));
        $('#singup_passwordCheck').keyup((e) => Common.RemoveErrorInput(e.target));
        $('#singup_mail').keyup((e) => Common.RemoveErrorInput(e.target));
        $('#singup_vCode').keyup((e) => Common.RemoveErrorInput(e.target));
    },
    /** 登入 */
    Login: () => {
        let errorMsg = {
            login_account: '請輸入帳號',
            login_password: '請輸入密碼'
        };

        let error = Common.Validate(errorMsg);

        if (error) {
            Common.SweetAlertErrorMsg(error);
            return;
        }

        let model = new Request.LoginReqViewModel($('#login_account').val() as string, $('#login_password').val() as string);
        let successFunc = () => {
            Common.SweetAlertRedirect("/Home/Index", "首頁");
        };
        let errorFunc = () => { };
        API.LoginAPI("登入中", model, successFunc, errorFunc);
    },
    /** Google 第三方登入 */
    GoogleLogin: () => {
        const client = google.accounts.oauth2.initCodeClient({
            client_id: '303901313937-vtppba8h2st6brqtcpgm0ti380890a5o.apps.googleusercontent.com',
            scope: 'profile email',
            ux_mode: 'popup',
            callback: (response: any) => {
                let successFuc = (res: Response.ResponseViewModel<Response.GoogleLoginResViewModel>) => {
                    // 首次第三方登入 才需要設定個人公開資訊
                    if (res.Data?.IsFirstLogin === true) {
                        Common.Popup('MemberInfo');
                        return;
                    }

                    Common.SweetAlertRedirect("/Home/Index", "首頁");
                };
                let errorFunc = () => { };
                let model = new Request.GoogleLoginReqViewModel(response.code);
                API.GoogleLoginAPI("登入中", model, successFuc, errorFunc);
            },
        });
        client.requestCode();
    },
    /** 寄送驗證碼 */
    SendVCode: () => {
        let model = new Request.SendVCodeReqViewModel($('#singup_mail').val() as string);
        let successFunc = () => { };
        let errorFunc = () => {
            $('#singup_mail').addClass('input-error');
        };

        API.SendVCodeAPI("寄送驗證碼中", model, successFunc, errorFunc);
    },
    /** 註冊 */
    Singup: () => {
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
            Common.SweetAlertErrorMsg(error);
            return;
        }

        let model = new Request.SignupReqViewModel(
            $("#singup_name").val() as string,
            $("#singup_account").val() as string,
            $("#singup_password").val() as string,
            $("#singup_passwordCheck").val() as string,
            $("#singup_mail").val() as string,
            $("#singup_vCode").val() as string
        );
        let successFunc = () => {
            Common.Popup('MemberInfo');
        };
        let errorFunc = () => { };

        API.SignupAPI("註冊中", model, successFunc, errorFunc);
    },
    /** 更新會員公開資訊 */
    UpdateMemberPublicInfo: () => {
        let infoStatus = 0;

        $('.InfoIcon').each(function (i) {
            if ((<HTMLImageElement>this).src.includes('InfoPublic')) {
                infoStatus += Number($(this).attr('memberpublicinfoflag'));
            }
        });

        if (!$('#brithday_datepicker').val()) {
            Common.SweetAlertErrorMsg('請選擇生日');
            return;
        }

        let model = new Request.UpdateMemberPublicInfoReqViewModel(
            new Date($('#brithday_datepicker').val() as string),
            $('#infoInternest').val() as string,
            $('#infoJob').val() as string,
            $('#infoEducation').val() as string,
            infoStatus);
        let successFunc = () => {
            Common.SweetAlertRedirect('/Home/Index', '首頁');
        };
        let errorFunc = () => { };

        API.UpdateMemberPublicInfoAPI("更新會員資訊中", model, successFunc, errorFunc);
    },
    /** 忘記密碼 申請重設密碼*/
    ResetPassword: () => {
        let errorMsg = {
            forgotPassword_account: '您尚未填寫 會員帳號',
            forgotPassword_mail: '您尚未填寫 電子郵件'
        };

        let error = Common.Validate(errorMsg);

        if (error) {
            Common.SweetAlertErrorMsg(error);
            return;
        }

        let model = new Request.ResetPasswordReqViewModel(
            $('#forgotPassword_account').val() as string,
            $('#forgotPassword_mail').val() as string);

        API.ResetPasswordAPI("寄送重設密碼郵件中", model);
    }
}

window["LoginPage"] = LoginPage;
window["Common"] = Common;