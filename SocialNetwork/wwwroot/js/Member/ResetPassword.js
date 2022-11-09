var ResetPasswordPage = {
    Init: function () {
        $('#resetPassword_password').keyup(function (e) { return Common.RemoveErrorInput(e.target); });
        $('#resetPassword_confirmPassword').keyup(function (e) { return Common.RemoveErrorInput(e.target); });
    },
    /** 重設密碼 */
    ResetPasswordConfirm: function () {
        var errorMsg = {
            resetPassword_password: '您尚未填寫 新密碼',
            resetPassword_confirmPassword: '您尚未填寫 確認密碼'
        };
        var error = Common.Validate(errorMsg);
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
        var model = new ResetPasswordConfirmReqViewModel($("#resetPassword_password").val(), $("#resetPassword_confirmPassword").val(), $("#resetPassword_guid").val());
        var successFuc = function (res) {
            Common.SweetAlertRedirect('/Member/Login', '登入頁');
        };
        var errorFuc = function (res) { };
        ResetPasswordConfirmAPI("重設密碼中", model, successFuc, errorFuc);
    }
};
