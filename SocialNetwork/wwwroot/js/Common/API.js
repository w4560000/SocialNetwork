function BaseAPI(loadingMsg, api, model, successFunc, errorFunc) {
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
                Common.SweetAlertSuccess(res.Message, successFunc);
            }
            else {
                Common.SweetAlertError(res.Message, errorFunc);
            }
        },
        error: function (e) {
            Common.SweetAlertError("伺服器異常", errorFunc);
        }
    });
}
function LoginAPI(loadingMsg, model, successFunc, errorFunc) {
    BaseAPI(loadingMsg, "/MemberApi/Login", model, successFunc, errorFunc);
}
function SendVCodeAPI(loadingMsg, model, successFunc, errorFunc) {
    BaseAPI(loadingMsg, "/MemberApi/SendVCode", model, successFunc, errorFunc);
}
function SignupAPI(loadingMsg, model, successFunc, errorFunc) {
    BaseAPI(loadingMsg, "/MemberApi/Signup", model, successFunc, errorFunc);
}
/// <summary>
/// 共用回應 ViewModel
/// </summary>
/// <typeparam name="T"></typeparam>
var ResponseViewModel = /** @class */ (function () {
    function ResponseViewModel() {
    }
    return ResponseViewModel;
}());
var LoginReqViewModel = /** @class */ (function () {
    function LoginReqViewModel(account, password) {
        this.Account = account;
        this.Password = password;
    }
    return LoginReqViewModel;
}());
var SendVCodeReqViewModel = /** @class */ (function () {
    function SendVCodeReqViewModel(mail) {
        this.Mail = mail;
    }
    return SendVCodeReqViewModel;
}());
var SignupReqViewModel = /** @class */ (function () {
    function SignupReqViewModel(nickName, account, password, passwordCheck, mail, vCode) {
        this.NickName = nickName;
        this.Account = account;
        this.Password = password;
        this.PasswordCheck = passwordCheck;
        this.Mail = mail;
        this.VCode = vCode;
    }
    return SignupReqViewModel;
}());
var ResponseStatusEnum;
(function (ResponseStatusEnum) {
    /// <summary>
    /// Error
    /// </summary>
    ResponseStatusEnum[ResponseStatusEnum["Error"] = 0] = "Error";
    /// <summary>
    /// Success
    /// </summary>
    ResponseStatusEnum[ResponseStatusEnum["Success"] = 1] = "Success";
})(ResponseStatusEnum || (ResponseStatusEnum = {}));
