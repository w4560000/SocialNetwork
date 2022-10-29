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
import { API, Request, Common, ViewModel } from "../Common/Index.js";
import { ChatHubConnection } from "../Common/ChatHubConnection.js";
export var user;
var chatHubConnection = new ChatHubConnection();
export var LayoutPage = {
    Init: function () { return __awaiter(void 0, void 0, void 0, function () {
        var friendList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    chatHubConnection.connect(LayoutPage.ReflashFriendStatus);
                    // 點選其他 element 時 自動隱藏展開的會員狀態
                    $("body").click(function (event) {
                        var currentElemetClass = ($(event.target).attr('class'));
                        if (currentElemetClass !== undefined && !currentElemetClass.includes('index_status_select')) {
                            if ($('#memberStatus_1').is(':visible')) {
                                $('.meunContent > ul').children('li').toggle();
                                $('.index_status_select').toggleClass('index_status_select_up');
                            }
                        }
                    });
                    // 展開 會員狀態下拉
                    $(".index_status").on("click", ".index_status_select", function () {
                        $(this).toggleClass('index_status_select_up');
                        $(this).closest(".meunContent > ul").children('li').toggle();
                    });
                    // 更新會員狀態
                    $(".index_status").on("click", "li", function () {
                        var _a;
                        var allOptions = $(".meunContent > ul").children('li');
                        allOptions.removeClass('selected');
                        $(this).addClass('selected');
                        $(".meunContent > ul").children('.index_status_select').html($(this).html());
                        $('.index_status_select').toggleClass('index_status_select_up');
                        var currentSelectStatus = (_a = $(this).attr('id')) === null || _a === void 0 ? void 0 : _a.split('_')[1];
                        var model = new Request.UpdateMemberStatusReqViewModel(parseInt(currentSelectStatus));
                        API.UpdateMemberStatusAPI(model);
                        allOptions.toggle();
                    });
                    // 載入會員狀態
                    $("ul").children('.index_status_select').html($('#memberStatus_' + user.Status).html());
                    return [4 /*yield*/, API.GetFriendListAPI()];
                case 1:
                    friendList = _a.sent();
                    LayoutPage.ReflashFriendList(friendList);
                    // 控制 Img Default Style
                    Common.ControllImgDefaultStyle();
                    // 建立 chatHubConnection 連線
                    //chatHubConnection.connect(LayoutPage.ReflashFriendStatus);
                    // 設定 Menu 底色 (根據當前頁面)
                    LayoutPage.SetMenuColor();
                    return [2 /*return*/];
            }
        });
    }); },
    /** 登出 */
    Logout: function () {
        var successFunc = function () {
            Common.SweetAlertRedirect("/Member/Login", "登入頁");
        };
        var errorFunc = function () { };
        API.LogoutAPI("登出中", successFunc, errorFunc, '確定是否登出?');
    },
    /**
     * 載入會員資料
     * @param _user 會員資料
     */
    UserInit: function (_user) {
        user = new ViewModel.User().Init(_user);
    },
    /**
     * 設定 Menu 底色 (根據當前頁面)
     * */
    SetMenuColor: function () {
        $('.index_menuTextBackground').each(function () {
            $(this).removeClass('index_menuTextBackground_color');
        });
        var pathName = window.location.pathname;
        switch (pathName) {
            case '/':
            case '/Home/Index':
                $('.index_menuTextBackground[Action="Index"]').addClass('index_menuTextBackground_color');
                break;
            case '/Home/HomePage':
                $('.index_menuTextBackground[Action="HomePage"]').addClass('index_menuTextBackground_color');
                break;
            case '/Home/MemberSetting':
                $('.index_menuTextBackground[Action="MemberSetting"]').addClass('index_menuTextBackground_color');
                break;
            case '/Home/FriendManagement':
                $('.index_menuTextBackground[Action="FriendManagement"]').addClass('index_menuTextBackground_color');
                break;
        }
    },
    /**
     * 刷新聊天室好友狀態 (ChatHubConnection)
     * */
    ReflashFriendStatus: function (friend) {
        $(".friend_content > .friend[MemberID=".concat(friend.MemberID, "]")).empty();
        $(".friend_content > .friend[MemberID=".concat(friend.MemberID, "]")).append(LayoutPage.MyFriendChatDetailHtmlTemplate(friend));
        // 控制 Img Default Style
        Common.ControllImgDefaultStyle();
    },
    /**
     * 刷新聊天室好友清單
     * @param friendList 好友清單
     */
    ReflashFriendList: function (friendList) {
        $('.friend_content').empty();
        // 聊天室載入好友清單
        friendList.forEach(function (f) { return $('.friend_content').append(LayoutPage.MyFriendChatHtmlTemplate(f)); });
    },
    /**
     * 聊天室好友 Html Template
     * @param friend 好友資料
     */
    MyFriendChatHtmlTemplate: function (friend) {
        return "\n    <div class=\"friend\" MemberID=\"".concat(friend.MemberID, "\">\n        ").concat(LayoutPage.MyFriendChatDetailHtmlTemplate(friend), "\n    </div>\n  ");
    },
    /**
     * 聊天室好友 Detail Html Template
     * @param friend 好友資料
     */
    MyFriendChatDetailHtmlTemplate: function (friend) {
        return "\n    <div class=\"friend_img_container\">\n        <span class=\"friend_img_status_color friend_img_status_color_".concat(friend.Status, "\"></span>\n        <img class=\"friend_img\" src=\"").concat(friend.ProfilePhotoURL, "\" />\n    </div> \n    <div class=\"friend_name\">").concat(friend.NickName, "</div>\n  ");
    }
};
window["LayoutPage"] = LayoutPage;
