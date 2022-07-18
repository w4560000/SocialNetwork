function LoginAPI(model, success, error) {
    $.post("/Member/Login", model, function (res) {
        if (res.Status == ResponseStatusEnum.Success)
            success();
        else
            error();
    });
}
function SendVCodeAPI(model, success, error) {
    $.post("/Member/SendVCode", model, function (res) {
        debugger;
        if (res.Status == ResponseStatusEnum.Success)
            success(res);
        else
            error(res);
    });
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
var SingupReqViewModel = /** @class */ (function () {
    function SingupReqViewModel(account, password) {
        this.Account = account;
        this.Password = password;
    }
    return SingupReqViewModel;
}());
var SendVCodeReqViewModel = /** @class */ (function () {
    function SendVCodeReqViewModel(mail) {
        this.Mail = mail;
    }
    return SendVCodeReqViewModel;
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
