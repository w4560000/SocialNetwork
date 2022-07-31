function BaseGetAPI(loadingMsg, api, successFunc, errorFunc) {
    if (loadingMsg)
        Common.SweetAlertLoading(loadingMsg);
    $.ajax({
        method: "Get",
        url: api,
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
function BasePostAPI(loadingMsg, api, model, successFunc, errorFunc) {
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
    BasePostAPI(loadingMsg, "/MemberApi/Login", model, successFunc, errorFunc);
}
function GoogleLoginAPI(loadingMsg, model, successFunc, errorFunc) {
    BasePostAPI(loadingMsg, "/MemberApi/GoogleLogin", model, successFunc, errorFunc);
}
function SendVCodeAPI(loadingMsg, model, successFunc, errorFunc) {
    BasePostAPI(loadingMsg, "/MemberApi/SendVCode", model, successFunc, errorFunc);
}
function SignupAPI(loadingMsg, model, successFunc, errorFunc) {
    BasePostAPI(loadingMsg, "/MemberApi/Signup", model, successFunc, errorFunc);
}
function UpdateMemberPublicInfoAPI(loadingMsg, model, successFunc, errorFunc) {
    BasePostAPI(loadingMsg, "/MemberApi/UpdateMemberPublicInfo", model, successFunc, errorFunc);
}
function ResetPasswordAPI(loadingMsg, model, successFunc, errorFunc) {
    BasePostAPI(loadingMsg, "/MemberApi/ResetPassword", model, successFunc, errorFunc);
}
function ResetPasswordConfirmAPI(loadingMsg, model, successFunc, errorFunc) {
    BasePostAPI(loadingMsg, "/MemberApi/ResetPasswordConfirm", model, successFunc, errorFunc);
}
function LogoutAPI(loadingMsg, successFunc, errorFunc) {
    BaseGetAPI(loadingMsg, "/MemberApi/Logout", successFunc, errorFunc);
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
var GoogleLoginReqViewModel = /** @class */ (function () {
    function GoogleLoginReqViewModel(code) {
        this.Code = code;
    }
    return GoogleLoginReqViewModel;
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
var UpdateMemberPublicInfoReqViewModel = /** @class */ (function () {
    function UpdateMemberPublicInfoReqViewModel(birthday, interest, job, education, memberPublicInfo) {
        this.Birthday = birthday;
        this.Interest = interest;
        this.Job = job;
        this.Education = education;
        this.MemberPublicInfo = memberPublicInfo;
    }
    return UpdateMemberPublicInfoReqViewModel;
}());
var ResetPasswordReqViewModel = /** @class */ (function () {
    function ResetPasswordReqViewModel(account, mail) {
        this.Account = account;
        this.Mail = mail;
    }
    return ResetPasswordReqViewModel;
}());
var ResetPasswordConfirmReqViewModel = /** @class */ (function () {
    function ResetPasswordConfirmReqViewModel(password, passwordCheck, guid) {
        this.Password = password;
        this.PasswordCheck = passwordCheck;
        this.Guid = guid;
    }
    return ResetPasswordConfirmReqViewModel;
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
var MemberPublicInfoEnum;
(function (MemberPublicInfoEnum) {
    /// <summary>
    /// 全部不公開
    /// </summary>
    MemberPublicInfoEnum[MemberPublicInfoEnum["\u5168\u90E8\u4E0D\u516C\u958B"] = 0] = "\u5168\u90E8\u4E0D\u516C\u958B";
    /// <summary>
    /// 公開生日
    /// </summary>
    MemberPublicInfoEnum[MemberPublicInfoEnum["\u516C\u958B\u751F\u65E5"] = 1] = "\u516C\u958B\u751F\u65E5";
    /// <summary>
    /// 公開興趣
    /// </summary>
    MemberPublicInfoEnum[MemberPublicInfoEnum["\u516C\u958B\u8208\u8DA3"] = 2] = "\u516C\u958B\u8208\u8DA3";
    /// <summary>
    /// 公開工作
    /// </summary>
    MemberPublicInfoEnum[MemberPublicInfoEnum["\u516C\u958B\u5DE5\u4F5C"] = 4] = "\u516C\u958B\u5DE5\u4F5C";
    /// <summary>
    /// 公開學歷
    /// </summary>
    MemberPublicInfoEnum[MemberPublicInfoEnum["\u516C\u958B\u5B78\u6B77"] = 8] = "\u516C\u958B\u5B78\u6B77";
    /// <summary>
    /// 公開生日 | 公開興趣 | 公開工作 | 公開學歷
    /// </summary>
    MemberPublicInfoEnum[MemberPublicInfoEnum["\u5168\u90E8\u516C\u958B"] = 15] = "\u5168\u90E8\u516C\u958B";
})(MemberPublicInfoEnum || (MemberPublicInfoEnum = {}));
