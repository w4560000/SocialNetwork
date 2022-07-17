function LoginAPI(account, password) {
    $.post("/Member/Login", new LoginViewModel(account, password), function (res) {
        if (res.Status == ResponseStatusEnum.Success)
            // 導主頁
            window.location.href = "/Home/Index";
        else
            Popup('loginError');
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
var LoginViewModel = /** @class */ (function () {
    function LoginViewModel(account, password) {
        this.Account = account;
        this.Password = password;
    }
    return LoginViewModel;
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
