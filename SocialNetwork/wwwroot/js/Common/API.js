/**
 * 封裝基礎 Http Get
 * @param loadingMsg Loading 顯示文字
 * @param api api 路徑
 * @param successFunc 回應成功 Func
 * @param errorFunc 回應失敗 Func
 */
function BaseGetAPI(loadingMsg, api, successFunc, errorFunc, isNotification) {
    if (isNotification === void 0) { isNotification = false; }
    if (loadingMsg)
        Common.SweetAlertLoading(loadingMsg);
    $.ajax({
        method: "Get",
        url: api,
        success: function (res) {
            if (res.Status == ResponseStatusEnum.Success) {
                if (isNotification)
                    Common.SweetAlertNotification(true, res.Message);
                else
                    Common.SweetAlertSuccess(res.Message, successFunc);
            }
            else {
                if (isNotification)
                    Common.SweetAlertNotification(false, res.Message);
                else
                    Common.SweetAlertError(res.Message, errorFunc);
            }
        },
        error: function (e) {
            Common.SweetAlertError("伺服器異常", errorFunc);
        }
    });
}
/**
 * 封裝基礎 Http Post
 * @param loadingMsg Loading 顯示文字
 * @param api api 路徑
 * @param model 傳送參數 Model
 * @param successFunc 回應成功 Func
 * @param errorFunc 回應失敗 Func
 * @param isNotification 是否顯示快顯
 */
function BasePostAPI(loadingMsg, api, model, successFunc, errorFunc, isNotification) {
    if (isNotification === void 0) { isNotification = false; }
    if (loadingMsg)
        Common.SweetAlertLoading(loadingMsg);
    $.ajax({
        method: "POST",
        url: api,
        data: JSON.stringify(model),
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            if (res.Status == ResponseStatusEnum.Success) {
                if (isNotification)
                    Common.SweetAlertNotification(true, res.Message);
                else
                    Common.SweetAlertSuccess(res.Message, successFunc);
            }
            else {
                if (isNotification)
                    Common.SweetAlertNotification(false, res.Message);
                else
                    Common.SweetAlertError(res.Message, errorFunc);
            }
        },
        error: function (e) {
            Common.SweetAlertError("伺服器異常", errorFunc);
        }
    });
}
/**
 * 封裝基礎 Http Post By FormData
 * @param loadingMsg Loading 顯示文字
 * @param api api 路徑
 * @param formData 傳送參數 FormData
 * @param successFunc 回應成功 Func
 * @param errorFunc 回應失敗 Func
 * @param isNotification 是否顯示快顯
 */
function BasePostAPIByFormData(loadingMsg, api, formData, successFunc, errorFunc, isNotification) {
    if (isNotification === void 0) { isNotification = false; }
    debugger;
    if (loadingMsg)
        Common.SweetAlertLoading(loadingMsg);
    $.ajax({
        method: "POST",
        url: api,
        data: formData,
        dataType: "json",
        processData: false,
        contentType: false,
        success: function (res) {
            if (res.Status == ResponseStatusEnum.Success) {
                if (isNotification)
                    Common.SweetAlertNotification(true, res.Message);
                else
                    Common.SweetAlertSuccess(res.Message, successFunc);
            }
            else {
                if (isNotification)
                    Common.SweetAlertNotification(false, res.Message);
                else
                    Common.SweetAlertError(res.Message, errorFunc);
            }
        },
        error: function (e) {
            Common.SweetAlertError("伺服器異常", errorFunc);
        }
    });
}
/**
 * 登入 API
 */
function LoginAPI(loadingMsg, model, successFunc, errorFunc) {
    BasePostAPI(loadingMsg, "/MemberApi/Login", model, successFunc, errorFunc);
}
/**
 * Google 第三方登入 API
 */
function GoogleLoginAPI(loadingMsg, model, successFunc, errorFunc) {
    BasePostAPI(loadingMsg, "/MemberApi/GoogleLogin", model, successFunc, errorFunc);
}
/**
 * 寄送驗證碼 API
 */
function SendVCodeAPI(loadingMsg, model, successFunc, errorFunc) {
    BasePostAPI(loadingMsg, "/MemberApi/SendVCode", model, successFunc, errorFunc);
}
/**
 * 註冊 API
 */
function SignupAPI(loadingMsg, model, successFunc, errorFunc) {
    BasePostAPI(loadingMsg, "/MemberApi/Signup", model, successFunc, errorFunc);
}
/**
 * 更新會員公開資訊 API
 */
function UpdateMemberPublicInfoAPI(loadingMsg, model, successFunc, errorFunc) {
    BasePostAPI(loadingMsg, "/MemberApi/UpdateMemberPublicInfo", model, successFunc, errorFunc);
}
/**
 * 重設密碼 Step1 API
 * 申請重設密碼、建立重設密碼URL
 */
function ResetPasswordAPI(loadingMsg, model, successFunc, errorFunc) {
    BasePostAPI(loadingMsg, "/MemberApi/ResetPassword", model, successFunc, errorFunc);
}
/**
 * 重設密碼 Step2 API
 */
function ResetPasswordConfirmAPI(loadingMsg, model, successFunc, errorFunc) {
    BasePostAPI(loadingMsg, "/MemberApi/ResetPasswordConfirm", model, successFunc, errorFunc);
}
/**
 * 登出 API
 */
function LogoutAPI(loadingMsg, successFunc, errorFunc, confirmTitle) {
    Common.SweetAlertConfirm(confirmTitle, function () { return BaseGetAPI(loadingMsg, "/MemberApi/Logout", successFunc, errorFunc); });
}
/**
 * 更新會員狀態 API
 */
function UpdateMemberStatusAPI(model, successFunc, errorFunc) {
    var isNotification = true;
    BasePostAPI('', "/MemberApi/UpdateMemberStatus", model, successFunc, errorFunc, isNotification);
}
// Post
/**
 * 發佈貼文 API
 */
function PublishPostAPI(loadingMsg, formData, successFunc, errorFunc, confirmTitle) {
    Common.SweetAlertConfirm(confirmTitle, function () { return BasePostAPIByFormData(loadingMsg, "/PostApi/PublishPost", formData, successFunc, errorFunc); });
}
