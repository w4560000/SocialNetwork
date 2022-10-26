import { API, Enum, Request, Response, Common } from "../Common/Index.js";

export const ResetPasswordPage = {
    Init: () => {
        $('#resetPassword_password').keyup((e) => Common.RemoveErrorInput(e.target));
        $('#resetPassword_confirmPassword').keyup((e) => Common.RemoveErrorInput(e.target));
    },
    /** 重設密碼 */
    ResetPasswordConfirm: () => {
        let errorMsg = {
            resetPassword_password: '您尚未填寫 新密碼',
            resetPassword_confirmPassword: '您尚未填寫 確認密碼'
        };

        let error = Common.Validate(errorMsg);

        // 驗證特殊邏輯
        if (!error) {
            if ($("#resetPassword_password").val() != $("#resetPassword_confirmPassword").val()) {
                error = '新密碼與確認密碼不相符';
                $('#resetPassword_password').addClass('input-error');
                $('#resetPassword_confirmPassword').addClass('input-error');
            }
        }

        if (error) {
            Common.SweetAlertErrorMsg(error);
            return;
        }

        let model = new Request.ResetPasswordConfirmReqViewModel(
            $("#resetPassword_password").val() as string,
            $("#resetPassword_confirmPassword").val() as string,
            $("#resetPassword_guid").val() as string
        );
        let successFuc = (res) => {
            Common.SweetAlertRedirect('/Member/Login', '登入頁');
        };
        let errorFuc = (res) => { };

        API.ResetPasswordConfirmAPI("重設密碼中", model, successFuc, errorFuc);
    }
}

window["ResetPasswordPage"] = ResetPasswordPage;