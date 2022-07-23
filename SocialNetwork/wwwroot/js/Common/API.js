function BaseAPI(api, model, successFunc, errorFunc) {
    $.post(api, model, function (res) {
        if (res.Status == ResponseStatusEnum.Success) {
            Common.SweetAlertSuccess(res.Message, successFunc);
        }
        else {
            Common.SweetAlertError(res.Message, errorFunc);
        }
    });
}
function LoginAPI(model, successFunc, errorFunc) {
    BaseAPI("/Member/Login", model, successFunc, errorFunc);
}
function SendVCodeAPI(model, successFunc, errorFunc) {
    BaseAPI("/Member/SendVCode", model, successFunc, errorFunc);
}
function SignupAPI(model, successFunc, errorFunc) {
    BaseAPI("/Member/Signup", model, successFunc, errorFunc);
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
