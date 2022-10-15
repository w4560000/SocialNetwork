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
$(function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ToggleTab("MyFriend")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
/**
 * 切換 Tab
 * @param tab tab名稱
 */
function ToggleTab(tab) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, SetFriendManagementTab($(".div_firend_tab_name_container[Tab ='".concat(tab, "']")).get(0))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * 切換好友管理 Tab
 * @param e HTMLElement
 * */
function SetFriendManagementTab(e) {
    return __awaiter(this, void 0, void 0, function () {
        var tab, _a, friendList, friendInvitatioinList, sendFriendInvitatioinList;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    $('.div_firend_tab_name_container').each(function () {
                        $(this).removeClass('div_firend_tab_name_container_color');
                    });
                    tab = $(e).attr('tab');
                    $(".div_firend_tab_name_container[Tab=\"".concat(tab, "\"]")).addClass('div_firend_tab_name_container_color');
                    _a = tab;
                    switch (_a) {
                        case 'MyFriend': return [3 /*break*/, 1];
                        case 'FriendInvitation': return [3 /*break*/, 3];
                        case 'SendFriendInvitation': return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 7];
                case 1:
                    $('.MyFriend').empty();
                    return [4 /*yield*/, GetFriendListAPI()];
                case 2:
                    friendList = _b.sent();
                    friendList.forEach(function (f) { return $('.MyFriend').append(MyFriendHtmlTemplate(f)); });
                    $('.MyFriend').show();
                    $('.FriendInvitation').hide();
                    $('.SendFriendInvitation').hide();
                    return [3 /*break*/, 7];
                case 3:
                    $('.FriendInvitation').empty();
                    return [4 /*yield*/, GetFriendInvitationListAPI()];
                case 4:
                    friendInvitatioinList = _b.sent();
                    friendInvitatioinList.forEach(function (f) { return $('.FriendInvitation').append(FriendInvitationHtmlTemplate(f)); });
                    $('.MyFriend').hide();
                    $('.FriendInvitation').show();
                    $('.SendFriendInvitation').hide();
                    return [3 /*break*/, 7];
                case 5:
                    $('.SendFriendInvitation').empty();
                    return [4 /*yield*/, GetSendFriendInvitationListAPI()];
                case 6:
                    sendFriendInvitatioinList = _b.sent();
                    sendFriendInvitatioinList.forEach(function (f) { return $('.SendFriendInvitation').append(SendFriendInvitationHtmlTemplate(f)); });
                    $('.MyFriend').hide();
                    $('.FriendInvitation').hide();
                    $('.SendFriendInvitation').show();
                    return [3 /*break*/, 7];
                case 7:
                    // 控制 Img Default Style
                    Common.ControllImgDefaultStyle();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * 我的好友 Html Template
 * @param member 會員
 */
function MyFriendHtmlTemplate(member) {
    return "\n<div class=\"div_friend_profile\" style=\"height: 360px;\">\n    <a href=\"/Home/HomePage/".concat(member.MemberID, "\" target=\"_blank\">\n        <img class=\"div_friend_img\" src=\"").concat(member.ProfilePhotoURL, "\">\n    </a>\n    <div class=\"div_friend_name_content\">\n        <a class=\"div_friend_name\" href=\"/Home/HomePage/").concat(member.MemberID, "\" target=\"_blank\">").concat(member.NickName, "</a>\n    </div>\n    <input class=\"div_frient_button_gray\" type=\"button\" value=\"\u79FB\u9664\u597D\u53CB\" onclick=\"Friend.DeleteFriend(").concat(member.MemberID, ", '").concat(member.NickName, "', () => ToggleTab('MyFriend'))\"/>\n</div>\n  ");
}
/**
 * 好友邀請 Html Template
 * @param member 會員
 */
function FriendInvitationHtmlTemplate(member) {
    return "\n<div class=\"div_friend_profile\">\n    <a href=\"/Home/HomePage/".concat(member.MemberID, "\" target=\"_blank\">\n        <img class=\"div_friend_img\" src=\"").concat(member.ProfilePhotoURL, "\">\n    </a>\n    <div class=\"div_friend_name_content\">\n        <a class=\"div_friend_name\" href=\"/Home/HomePage/").concat(member.MemberID, "\" target=\"_blank\">").concat(member.NickName, "</a>\n    </div>\n    <input class=\"div_frient_button_pink\" type=\"button\" value=\"\u63A5\u53D7\" onclick=\"Friend.DecideFriendInvitation(").concat(member.MemberID, ", '").concat(member.NickName, "', ").concat(DecideFriendInvitationEnum.接受, ", () => ToggleTab('FriendInvitation'))\"/>\n    <input class=\"div_frient_button_gray\" type=\"button\" value=\"\u62D2\u7D55\" onclick=\"Friend.DecideFriendInvitation(").concat(member.MemberID, ", '").concat(member.NickName, "', ").concat(DecideFriendInvitationEnum.拒絕, ", () => ToggleTab('FriendInvitation'))\"/>\n</div>\n  ");
}
/**
 * 您送出的好友邀請 Html Template
 * @param member 會員
 */
function SendFriendInvitationHtmlTemplate(member) {
    return "\n<div class=\"div_friend_profile\" style=\"height: 360px;\">\n    <a href=\"/Home/HomePage/".concat(member.MemberID, "\" target=\"_blank\">\n        <img class=\"div_friend_img\" src=\"").concat(member.ProfilePhotoURL, "\">\n    </a>\n    <div class=\"div_friend_name_content\">\n        <a class=\"div_friend_name\" href=\"/Home/HomePage/").concat(member.MemberID, "\" target=\"_blank\">").concat(member.NickName, "</a>\n    </div>\n    <input class=\"div_frient_button_gray\" type=\"button\" value=\"\u6536\u56DE\u9080\u8ACB\" onclick=\"Friend.RevokeFriendInvitation(").concat(member.MemberID, ", '").concat(member.NickName, "', () => ToggleTab('SendFriendInvitation'))\"/>\n</div>\n  ");
}
