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
import { API, Enum, Request, Common } from "../Common/CommonInferface.js";
import { user } from "../Home/Layout.js";
var tempBackgroundFile;
var tempProfilePhotoFile;
export var MemberSettingPage = {
    Init: function () { return __awaiter(void 0, void 0, void 0, function () {
        var memberInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // 日期選擇元件
                    Common.DatepickerInit($('#brithday_datepicker'), function (dateText, inst) {
                        var date = "".concat(inst.selectedYear, " \u5E74 ").concat(inst.selectedMonth + 1, " \u6708 ").concat(inst.selectedDay, " \u65E5");
                        $("#infoBrithday").val(date);
                    });
                    return [4 /*yield*/, API.GetCurrentMemberInfoAPI()];
                case 1:
                    memberInfo = _a.sent();
                    // 載入 會員資訊
                    $('.profile_background').attr('src', memberInfo.BackgroundPhotoURL);
                    $('.InfoIcon').each(function () {
                        var memberPublicInfoFlag = Number($(this).attr('memberpublicinfoflag'));
                        var src = Common.HasFlag(memberInfo.InfoStatus, memberPublicInfoFlag) ? "/images/InfoPublic.png" : "/images/InfoHide.png";
                        $(this).attr("src", src);
                    });
                    $('#brithday_datepicker').datepicker('setDate', new Date(memberInfo.Brithday));
                    $('.ui-datepicker-current-day').click();
                    $('#infoInternest').val(memberInfo.Interest);
                    $('#infoJob').val(memberInfo.Job);
                    $('#infoEducation').val(memberInfo.Education);
                    $('.profile_changeName').val(user.NickName);
                    // 非原生帳號 隱藏變更密碼版面
                    if (user.IsOriginalMember === false) {
                        $('#div_password_change_bar').remove();
                        $('.div_password_change').remove();
                    }
                    Common.ControllSVG();
                    return [2 /*return*/];
            }
        });
    }); },
    /**
     * 更換主頁背景、頭像預覽
     * @param e HTMLInputElement
     */
    UploadProfile_Change: function (e) {
        if (e.files) {
            var isUploadBackground = e.id == 'profile_changeBackground';
            var errorMsgTitle = isUploadBackground ? '主頁背景' : '頭像';
            var fileList = Array.from(e.files);
            if (fileList.length > 1) {
                e.files = null;
                Common.SweetAlertErrorMsg("".concat(errorMsgTitle, "\u7121\u6CD5\u4E0A\u50B3\u591A\u7B46"));
                return;
            }
            if (fileList.every(function (e) { return Common.ValidateUploadPhotoExtension(e); }) === false) {
                e.files = null;
                Common.SweetAlertErrorMsg("".concat(errorMsgTitle, "\u50C5\u9650\u4E0A\u50B3 .jpg\u3001.jpeg\u3001.png\u3001.webp\u3001.svg\u3001.gif"));
                return;
            }
            if (fileList.every(function (e) { return Common.ValidateUploadPhotoSize(e) === false; })) {
                e.files = null;
                Common.SweetAlertErrorMsg("".concat(errorMsgTitle, "\u5716\u7247\u5927\u5C0F\u4E0D\u5F97\u8D85\u904E 5 MB"));
                return;
            }
            // 預覽主頁背景
            if (isUploadBackground === true) {
                $('.profile_background').prop('src', URL.createObjectURL(fileList[0]));
                tempBackgroundFile = fileList[0];
            }
            // 預覽頭像
            else {
                $('.profile_photo').prop('src', URL.createObjectURL(fileList[0]));
                tempProfilePhotoFile = fileList[0];
            }
            // 控制 Img Default Style
            Common.ControllImgDefaultStyle();
        }
    },
    /**
     * 修改名稱
     * */
    ChangeName_Click: function () {
        $('.profile_changeName').val(user.NickName);
        $('.profile_OldName').hide();
        $('.profile_changeName_container').hide();
        $('.profile_changeName').show();
        $('.profile_changeName_cancel').show();
        $('.profile_changeName').focus();
    },
    /**
     * 取消修改名稱
     * */
    ChangeName_Cancel: function () {
        $('.profile_OldName').show();
        $('.profile_changeName_container').show();
        $('.profile_changeName').hide();
        $('.profile_changeName_cancel').hide();
        $('.profile_changeName').val(user.NickName);
    },
    /**
     * 更新個人資訊
     * 會員主頁背景、頭像、公開資訊
     * */
    UpdateMemberInfo: function () {
        var infoStatus = 0;
        $('.InfoIcon').each(function (i) {
            if (this.src.includes('InfoPublic')) {
                infoStatus += Number($(this).attr('memberpublicinfoflag'));
            }
        });
        if (!$('#brithday_datepicker').val()) {
            Common.SweetAlertErrorMsg('請選擇生日');
            return;
        }
        var formData = new FormData();
        formData.append('NickName', $('.profile_changeName').val());
        formData.append('BackgroundPhoto', tempBackgroundFile);
        formData.append('ProfilePhoto', tempProfilePhotoFile);
        formData.append('Brithday', $('#brithday_datepicker').val());
        formData.append('Interest', $('#infoInternest').val());
        formData.append('Job', $('#infoJob').val());
        formData.append('Education', $('#infoEducation').val());
        formData.append('InfoStatus', infoStatus.toString());
        var successFunc = function (res) {
            if (res.Status == Enum.ResponseStatusEnum.Success) {
                // 更新左側 Menu 頭像
                if (tempProfilePhotoFile !== undefined)
                    $('.index_profilePhoto').attr('src', URL.createObjectURL(tempProfilePhotoFile));
                if ($('.profile_OldName').is(":hidden")) {
                    $('.profile_OldName').show();
                    $('.profile_changeName_container').show();
                    $('.profile_changeName').hide();
                    $('.profile_changeName_cancel').hide();
                    $('.profile_OldName').html($('.profile_changeName').val());
                    $('.index_nickName').html($('.profile_changeName').val());
                }
            }
        };
        var errorFunc = function () { };
        API.UpdateMemberInfoAPI("更新個人資訊中", formData, successFunc, errorFunc, '確定是否更新?');
    },
    /** 變更密碼 */
    ChangePassword: function () {
        var errorMsg = {
            oldPassword: '請輸入舊密碼',
            newPassword: '請輸入新密碼',
            newPasswordCheck: '請輸入新密碼確認'
        };
        var error = Common.Validate(errorMsg);
        if (error) {
            Common.SweetAlertErrorMsg(error);
            return;
        }
        var model = new Request.ChangePasswordReqViewModel($('#oldPassword').val(), $('#newPassword').val(), $('#newPasswordCheck').val());
        var successFunc = function () {
            $('#oldPassword').val('');
            $('#newPassword').val('');
            $('#newPasswordCheck').val('');
        };
        var errorFunc = function () { };
        API.ChangePasswordAPI("變更密碼中", model, successFunc, errorFunc, "確定是否執行變更密碼?");
    }
};
window["MemberSettingPage"] = MemberSettingPage;
window["Common"] = Common;
