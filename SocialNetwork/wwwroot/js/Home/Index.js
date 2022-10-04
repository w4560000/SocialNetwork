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
var memberInfo;
$(function () {
    return __awaiter(this, void 0, void 0, function () {
        var _a, memberBrithday, brithday;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // 輸入框 高度自動伸縮
                    $('.write_post, .msgComment').on("input", function () {
                        var _this = $(this);
                        var currentVal = _this.val();
                        _this.height('auto');
                        _this.height(_this.prop('scrollHeight') + 'px');
                    });
                    if (!$("#query_memberID").val()) return [3 /*break*/, 2];
                    return [4 /*yield*/, GetMemberInfoAPI($("#query_memberID").val())];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, GetCurrentMemberInfoAPI()];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    // 查看別人主頁 or 個人主頁
                    memberInfo = _a;
                    memberBrithday = new Date(memberInfo.Brithday);
                    brithday = "".concat(memberBrithday.getFullYear(), " \u5E74 ").concat(memberBrithday.getMonth() + 1, " \u6708 ").concat(memberBrithday.getDate(), " \u65E5");
                    $('.profile_name').html(memberInfo.NickName);
                    $('.profile_detail_brithday').html(brithday);
                    $('.profile_detail_job').html(memberInfo.Job);
                    $('.profile_detail_internest').html(memberInfo.Interest);
                    $('.profile_detail_education').html(memberInfo.Education);
                    $('.profile_background').attr('src', memberInfo.BackgroundPhotoURL);
                    return [2 /*return*/];
            }
        });
    });
});
/**
 * 發送好友邀請
 * */
function SendFriendInvitation() {
    var model = new CommonMemberViewModel(memberInfo.MemberID);
    SendFriendInvitationAPI("發送好友邀請中", model, "\u78BA\u5B9A\u662F\u5426\u5C0D ".concat(memberInfo.NickName, " \u767C\u9001\u597D\u53CB\u9080\u8ACB?"));
}
/**
 * 判斷好友邀請 (接受 or 拒絕)
 * */
function DecideFriendInvitation(decide) {
    var model = new DecideFriendInvitationReqViewModel(memberInfo.MemberID, decide);
    DecideFriendInvitationAPI("".concat(DecideFriendInvitationEnum[decide], "\u597D\u53CB\u9080\u8ACB\u4E2D"), model, "\u78BA\u5B9A\u662F\u5426".concat(DecideFriendInvitationEnum[decide], " ").concat(memberInfo.NickName, " \u7684\u597D\u53CB\u9080\u8ACB?"));
}
/**
 * 收回好友邀請
 * */
function RevokeFriendInvitation() {
    var model = new CommonMemberViewModel(memberInfo.MemberID);
    RevokeFriendInvitationAPI("\u6536\u56DE\u597D\u53CB\u9080\u8ACB\u4E2D", model, "\u78BA\u5B9A\u662F\u5426\u6536\u56DE ".concat(memberInfo.NickName, "  \u7684\u597D\u53CB\u9080\u8ACB?"));
}
