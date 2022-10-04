var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * 封裝基礎 Http Get
 * @param loadingMsg Loading 顯示文字
 * @param api api 路徑
 * @param successFunc 回應成功 Func
 * @param errorFunc 回應失敗 Func
 * @param isNotification 是否快顯通知
 * @param isShowSuccessMsg 是否顯示回應成功訊息
 */
function BaseGetAPI(loadingMsg, api, successFunc, errorFunc, isNotification, isShowSuccessMsg) {
    if (isNotification === void 0) { isNotification = false; }
    if (isShowSuccessMsg === void 0) { isShowSuccessMsg = true; }
    return new Promise(function (resolve, reject) {
        if (loadingMsg)
            Common.SweetAlertLoading(loadingMsg);
        $.ajax({
            method: "Get",
            url: api,
            success: function (res) {
                if (res.Status == ResponseStatusEnum.Success) {
                    if (isShowSuccessMsg) {
                        if (isNotification)
                            Common.SweetAlertNotification(true, res.Message);
                        else
                            Common.SweetAlertSuccess(res, successFunc);
                    }
                    resolve(res.Data);
                }
                else {
                    if (isNotification)
                        Common.SweetAlertNotification(false, res.Message);
                    else
                        Common.SweetAlertError(res, errorFunc);
                }
                reject('error');
            },
            error: function (e) {
                console.log(e);
                Common.SweetAlertErrorMsg("伺服器異常", errorFunc);
                reject(e);
            }
        });
    });
}
/**
 * 封裝基礎 Http Post (無 Request Param 、 有 Response Data )
 * @param loadingMsg Loading 顯示文字
 * @param api api 路徑
 * @param model 傳送參數 Model
 * @param successFunc 回應成功 Func
 * @param errorFunc 回應失敗 Func
 * @param isNotification 是否快顯通知
 * @param isShowSuccessMsg 是否顯示回應成功訊息
 */
function BasePostAPIV1(loadingMsg, api, successFunc, errorFunc, isNotification, isShowSuccessMsg) {
    if (isNotification === void 0) { isNotification = false; }
    if (isShowSuccessMsg === void 0) { isShowSuccessMsg = true; }
    return new Promise(function (resolve, reject) {
        if (loadingMsg)
            Common.SweetAlertLoading(loadingMsg);
        $.ajax({
            method: "POST",
            url: api,
            headers: {
                "RequestVerificationToken": $("#RequestVerificationToken").val()
            },
            async: false,
            success: function (res) {
                if (res.Status == ResponseStatusEnum.Success) {
                    if (isShowSuccessMsg) {
                        if (isNotification)
                            Common.SweetAlertNotification(true, res.Message);
                        else
                            Common.SweetAlertSuccess(res, successFunc);
                    }
                    resolve(res.Data);
                }
                else {
                    if (isNotification)
                        Common.SweetAlertNotification(false, res.Message);
                    else
                        Common.SweetAlertError(res, errorFunc);
                    reject('error');
                }
            },
            error: function (e) {
                console.log(e);
                Common.SweetAlertErrorMsg("伺服器異常", errorFunc);
                reject(e);
            }
        });
    });
}
/**
 * 封裝基礎 Http Post (有 Request Param 、 有 Response Data )
 * @param loadingMsg Loading 顯示文字
 * @param api api 路徑
 * @param model 傳送參數 Model
 * @param successFunc 回應成功 Func
 * @param errorFunc 回應失敗 Func
 * @param isNotification 是否快顯通知
 * @param isShowSuccessMsg 是否顯示回應成功訊息
 */
function BasePostAPIV2(loadingMsg, api, model, successFunc, errorFunc, isNotification, isShowSuccessMsg) {
    if (isNotification === void 0) { isNotification = false; }
    if (isShowSuccessMsg === void 0) { isShowSuccessMsg = true; }
    return new Promise(function (resolve, reject) {
        if (loadingMsg)
            Common.SweetAlertLoading(loadingMsg);
        $.ajax({
            method: "POST",
            url: api,
            headers: {
                "RequestVerificationToken": $("#RequestVerificationToken").val()
            },
            data: JSON.stringify(model),
            dataType: "json",
            contentType: "application/json",
            async: false,
            success: function (res) {
                if (res.Status == ResponseStatusEnum.Success) {
                    if (isShowSuccessMsg) {
                        if (isNotification)
                            Common.SweetAlertNotification(true, res.Message);
                        else
                            Common.SweetAlertSuccess(res, successFunc);
                    }
                    resolve(res.Data);
                }
                else {
                    if (isNotification)
                        Common.SweetAlertNotification(false, res.Message);
                    else
                        Common.SweetAlertError(res, errorFunc);
                    reject('error');
                }
            },
            error: function (e) {
                console.log(e);
                Common.SweetAlertErrorMsg("伺服器異常", errorFunc);
                reject(e);
            }
        });
    });
}
/**
 * 封裝基礎 Http Post (有 Request Param 、 無 Response Data )
 * @param loadingMsg Loading 顯示文字
 * @param api api 路徑
 * @param model 傳送參數 Model
 * @param successFunc 回應成功 Func
 * @param errorFunc 回應失敗 Func
 * @param isNotification 是否快顯通知
 * @param isShowSuccessMsg 是否顯示回應成功訊息
 */
function BasePostAPIV3(loadingMsg, api, model, successFunc, errorFunc, isNotification, isShowSuccessMsg) {
    if (isNotification === void 0) { isNotification = false; }
    if (isShowSuccessMsg === void 0) { isShowSuccessMsg = true; }
    if (loadingMsg)
        Common.SweetAlertLoading(loadingMsg);
    $.ajax({
        method: "POST",
        url: api,
        headers: {
            "RequestVerificationToken": $("#RequestVerificationToken").val()
        },
        data: JSON.stringify(model),
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            if (res.Status == ResponseStatusEnum.Success) {
                if (isShowSuccessMsg) {
                    if (isNotification)
                        Common.SweetAlertNotification(true, res.Message);
                    else
                        Common.SweetAlertSuccess(res, successFunc);
                }
            }
            else {
                if (isNotification)
                    Common.SweetAlertNotification(false, res.Message);
                else
                    Common.SweetAlertError(res, errorFunc);
            }
        },
        error: function (e) {
            console.log(e);
            Common.SweetAlertErrorMsg("伺服器異常", errorFunc);
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
    if (loadingMsg)
        Common.SweetAlertLoading(loadingMsg);
    $.ajax({
        method: "POST",
        url: api,
        headers: {
            "RequestVerificationToken": $("#RequestVerificationToken").val()
        },
        data: formData,
        dataType: "json",
        processData: false,
        contentType: false,
        success: function (res) {
            if (res.Status == ResponseStatusEnum.Success) {
                if (isNotification)
                    Common.SweetAlertNotification(true, res.Message);
                else
                    Common.SweetAlertSuccess(res, successFunc);
            }
            else {
                if (isNotification)
                    Common.SweetAlertNotification(false, res.Message);
                else
                    Common.SweetAlertError(res, errorFunc);
            }
        },
        error: function (e) {
            console.log(e);
            Common.SweetAlertErrorMsg("伺服器異常", errorFunc);
        }
    });
}
/**
 * 登入 API
 */
function LoginAPI(loadingMsg, model, successFunc, errorFunc) {
    BasePostAPIV3(loadingMsg, "/MemberApi/Login", model, successFunc, errorFunc);
}
/**
 * Google 第三方登入 API
 */
function GoogleLoginAPI(loadingMsg, model, successFunc, errorFunc) {
    BasePostAPIV3(loadingMsg, "/MemberApi/GoogleLogin", model, successFunc, errorFunc);
}
/**
 * 寄送驗證碼 API
 */
function SendVCodeAPI(loadingMsg, model, successFunc, errorFunc) {
    BasePostAPIV3(loadingMsg, "/MemberApi/SendVCode", model, successFunc, errorFunc);
}
/**
 * 註冊 API
 */
function SignupAPI(loadingMsg, model, successFunc, errorFunc) {
    BasePostAPIV3(loadingMsg, "/MemberApi/Signup", model, successFunc, errorFunc);
}
/**
 * 更新會員公開資訊 API
 */
function UpdateMemberPublicInfoAPI(loadingMsg, model, successFunc, errorFunc) {
    BasePostAPIV3(loadingMsg, "/MemberApi/UpdateMemberPublicInfo", model, successFunc, errorFunc);
}
/**
 * 重設密碼 Step1 API
 * 申請重設密碼、建立重設密碼URL
 */
function ResetPasswordAPI(loadingMsg, model) {
    var successFunc = function () { };
    var errorFunc = function () { };
    BasePostAPIV3(loadingMsg, "/MemberApi/ResetPassword", model, successFunc, errorFunc);
}
/**
 * 重設密碼 Step2 API
 */
function ResetPasswordConfirmAPI(loadingMsg, model, successFunc, errorFunc) {
    BasePostAPIV3(loadingMsg, "/MemberApi/ResetPasswordConfirm", model, successFunc, errorFunc);
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
function UpdateMemberStatusAPI(model) {
    var successFunc = function () { };
    var errorFunc = function () { };
    BasePostAPIV3('', "/MemberApi/UpdateMemberStatus", model, successFunc, errorFunc);
}
/**
 * 取得當前會員資訊 API
 */
function GetCurrentMemberInfoAPI() {
    return __awaiter(this, void 0, void 0, function () {
        var successFunc, errorFunc, isNotification, isShowSuccessMsg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    successFunc = function () { };
                    errorFunc = function () { };
                    isNotification = false;
                    isShowSuccessMsg = false;
                    return [4 /*yield*/, BaseGetAPI('', "/MemberApi/GetCurrentMemberInfo", successFunc, errorFunc, isNotification, isShowSuccessMsg)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * 取得會員資訊 API
 */
function GetMemberInfoAPI(memberID) {
    return __awaiter(this, void 0, void 0, function () {
        var successFunc, errorFunc, isNotification, isShowSuccessMsg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    successFunc = function () { };
                    errorFunc = function () { };
                    isNotification = false;
                    isShowSuccessMsg = false;
                    return [4 /*yield*/, BaseGetAPI('', "/MemberApi/GetMemberInfo/".concat(memberID), successFunc, errorFunc, isNotification, isShowSuccessMsg)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * 更新會員資訊 API
 */
function UpdateMemberInfoAPI(loadingMsg, formData, successFunc, errorFunc, confirmTitle) {
    Common.SweetAlertConfirm(confirmTitle, function () { return BasePostAPIByFormData(loadingMsg, "/MemberApi/UpdateMemberInfo", formData, successFunc, errorFunc); });
}
/**
 * 密碼變更 API
 */
function ChangePasswordAPI(loadingMsg, model, successFunc, errorFunc, confirmTitle) {
    Common.SweetAlertConfirm(confirmTitle, function () { return BasePostAPIV3(loadingMsg, "/MemberApi/ChangePassword", model, successFunc, errorFunc); });
}
// Post
/**
 * 發佈貼文 API
 */
function PublishPostAPI(loadingMsg, formData, successFunc, errorFunc, confirmTitle) {
    Common.SweetAlertConfirm(confirmTitle, function () { return BasePostAPIByFormData(loadingMsg, "/PostApi/PublishPost", formData, successFunc, errorFunc); });
}
// Friend
/**
 * 取得好友清單 API
 */
function GetFriendListAPI() {
    return __awaiter(this, void 0, void 0, function () {
        var successFunc, errorFunc, isNotification, isShowSuccessMsg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    successFunc = function () { };
                    errorFunc = function () { };
                    isNotification = false;
                    isShowSuccessMsg = false;
                    return [4 /*yield*/, BasePostAPIV1('', "/FriendApi/GetFriendList", successFunc, errorFunc, isNotification, isShowSuccessMsg)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * 取得好友邀請清單 API
 */
function GetFriendInvitationListAPI() {
    return __awaiter(this, void 0, void 0, function () {
        var successFunc, errorFunc, isNotification, isShowSuccessMsg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    successFunc = function () { };
                    errorFunc = function () { };
                    isNotification = false;
                    isShowSuccessMsg = false;
                    return [4 /*yield*/, BasePostAPIV1('', "/FriendApi/GetFriendInvitationList", successFunc, errorFunc, isNotification, isShowSuccessMsg)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * 取得您送出的好友邀請清單 API
 */
function GetSendFriendInvitationListAPI() {
    return __awaiter(this, void 0, void 0, function () {
        var successFunc, errorFunc, isNotification, isShowSuccessMsg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    successFunc = function () { };
                    errorFunc = function () { };
                    isNotification = false;
                    isShowSuccessMsg = false;
                    return [4 /*yield*/, BasePostAPIV1('', "/FriendApi/GetSendFriendInvitationList", successFunc, errorFunc, isNotification, isShowSuccessMsg)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * 發送好友邀請 API
 */
function SendFriendInvitationAPI(loadingMsg, model, confirmTitle) {
    var successFunc = function () { };
    var errorFunc = function () { };
    Common.SweetAlertConfirm(confirmTitle, function () { return BasePostAPIV3(loadingMsg, "/FriendApi/SendFriendInvitation", model, successFunc, errorFunc); });
}
/**
 * 判斷好友邀請 (接受 or 拒絕) API
 */
function DecideFriendInvitationAPI(loadingMsg, model, confirmTitle) {
    var successFunc = function () { };
    var errorFunc = function () { };
    Common.SweetAlertConfirm(confirmTitle, function () { return BasePostAPIV3(loadingMsg, "/FriendApi/DecideFriendInvitation", model, successFunc, errorFunc); });
}
/**
 * 收回好友邀請 API
 */
function RevokeFriendInvitationAPI(loadingMsg, model, confirmTitle) {
    var successFunc = function () { };
    var errorFunc = function () { };
    Common.SweetAlertConfirm(confirmTitle, function () { return BasePostAPIV3(loadingMsg, "/FriendApi/RevokeFriendInvitation", model, successFunc, errorFunc); });
}
/**
 * 刪除好友 API
 */
function DeleteFriendAPI(loadingMsg, model, confirmTitle) {
    var successFunc = function () { };
    var errorFunc = function () { };
    Common.SweetAlertConfirm(confirmTitle, function () { return BasePostAPIV3(loadingMsg, "/FriendApi/DeleteFriend", model, successFunc, errorFunc); });
}
