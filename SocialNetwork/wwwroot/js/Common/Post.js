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
var _this = this;
var tempSelectPostKey = 0;
var tempQueryRowNo = 1;
var lightSliderInstance;
var _postType;
var Post = {
    /**
     * 初始化
     * @param postType 貼文類型
     */
    Init: function (postType) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tempQueryRowNo = 1;
                    $('.div_post').remove();
                    _postType = postType;
                    return [4 /*yield*/, Post.LoadPost()];
                case 1:
                    _a.sent();
                    //$(".postAction").on("focus", function (event) {
                    //    debugger
                    //    $(this).children('.ul_postAction').show();
                    //});
                    //$(".postAction").blur(function (event) {
                    //    debugger
                    //    $(this).children('.ul_postAction').hide();
                    //});
                    $(window).scroll(function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var scrollTop, documentHeight, windowHeight;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        scrollTop = $(document).scrollTop();
                                        documentHeight = $(document).height();
                                        windowHeight = $(window).height();
                                        if (!(scrollTop == (documentHeight - windowHeight))) return [3 /*break*/, 2];
                                        return [4 /*yield*/, Post.LoadPost()];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        });
                    });
                    return [2 /*return*/];
            }
        });
    }); },
    /**
     * 重新載入貼文
     * */
    ReLoadPost: function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tempQueryRowNo = 1;
                    $('.div_post').remove();
                    return [4 /*yield*/, Post.LoadPost()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); },
    /**
     * 載入貼文
     * @param postType 貼文類型
     * */
    LoadPost: function () { return __awaiter(_this, void 0, void 0, function () {
        var postData, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(this._postType === PostTypeEnum.首頁)) return [3 /*break*/, 2];
                    return [4 /*yield*/, GetIndexPostAPI(new QueryRowMemberReqViewModel(user.MemberID, tempQueryRowNo))];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, GetHomePagePostAPI(new QueryRowMemberReqViewModel(user.MemberID, tempQueryRowNo))];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    postData = _a;
                    if (postData.length !== 0) {
                        postData.forEach(function (f) {
                            if (!$('.div_post').length)
                                $('#post').append(Post.PostHtmlTemplate(f));
                            else
                                $('.div_post').last().after(Post.PostHtmlTemplate(f));
                            Common.InitLightSlider($(".PostPhoto[PostKey='".concat(f.PostKey, "']")));
                        });
                        Common.HideLoading();
                        Common.ShowLoading($('.div_post').last());
                    }
                    else {
                        Common.HideLoading();
                    }
                    tempQueryRowNo += 3;
                    // 控制 Img Default Style
                    Common.ControllImgDefaultStyle();
                    return [2 /*return*/];
            }
        });
    }); },
    /**
     * 貼文 Html Template
     * @param model 貼文 ViewModel
     */
    PostHtmlTemplate: function (model) {
        return "\n<div class=\"div_post\" PostKey=\"".concat(model.PostKey, "\" MemberID=\"").concat(model.MemberID, "\">\n    <div class=\"div_post_content\">\n        <div class=\"post_content_topBar\">\n            <div class=\"postPhoto_container\">\n                <img class=\"postPhoto\" src=\"").concat(model.ProfilePhotoUrl, "\" />\n            </div>\n            <div class=\"postProfile\">\n                <div>").concat(model.NickName, "</div>\n                <span class=\"time\"title=\"").concat(Common.DateFormat(model.PostDateTime.toString()), "\">").concat(Post.PostDateTimeFilter(model.PostDateTime.toString()), "</span>\n            </div>\n            <div class=\"postAction\" tabindex=\"-1\" PostKey=\"").concat(model.PostKey, "\" onclick=\"Post.TogglePostAction(this)\">\u22EE\n            <ul class=\"ul_postAction\" PostKey=\"").concat(model.PostKey, "\">\n                <li><a PostKey=\"").concat(model.PostKey, "\">\u522A\u9664</a></li>\n                <li><a PostKey=\"").concat(model.PostKey, "\">\u7DE8\u8F2F</a></li>\n            </ul>\n            </div>\n        </div>\n        <div class=\"post_body\">\n            ").concat(model.PostKey, " %% <!-- todo remove -->\n            ").concat(model.PostContent, "\n            <div>\n                <ul class=\"PostPhoto\" PostKey=\"").concat(model.PostKey, "\">\n                    ").concat(Post.PostImageHtmlTemplate(model.PostImageUrlList), "\n                </ul>\n            </div>\n        </div>\n        <div class=\"post_footerBar\">\n            <div class=\"post_footer_container\">\n                <div class=\"post_footer_img\">\n                    <img class=\"postLike\" src=\"/images/post/thumb_up_black_24dp.svg\" />\n                </div>\n                <span class=\"post_footer_number\">").concat(model.GoodQuantity, "</span>\n            </div>\n            <div class=\"post_footer_container\">\n                <div class=\"post_footer_img\">\n                    <img class=\"postMsg\" src=\"/images/post/textsms_black_24dp.svg\" />\n                </div>\n                <span class=\"post_footer_number\">").concat(model.TotalPostMsgCount, "</span>\n            </div>\n            <div class=\"post_footer_container\">\n                <img class=\"postShare\" src=\"/images/post/share_black_24dp.svg\" />\n            </div>\n        </div>\n    </div>\n    <div class=\"div_post_msg_send\">\n        <div class=\"post_msgPhoto_container\">\n            <img class=\"post_msgPhoto\" src=\"").concat(model.ProfilePhotoUrl, "\">\n        </div>\n        <div class=\"post_msg_comment\">\n            <textarea class=\"msgComment\" placeholder=\"\u7559\u8A00...\"></textarea>\n        </div>\n        <div class=\"post_msg_submit\">\n            <img class=\"msgSend\" src=\"/images/post/send_black_24dp.svg\">\n        </div>\n    </div>\n\n    ").concat(Post.ShowPostMsg(model.PostKey, model.PostMsgList, model.TotalPostMsgCount), "\n</div>\n  ");
    },
    /**
     * 貼文圖片 Html Template
     * @param postImageUrlList 貼文圖片 URL 清單
     */
    PostImageHtmlTemplate: function (postImageUrlList) {
        var html = '';
        if (postImageUrlList.length == 0)
            return html;
        postImageUrlList.forEach(function (f) {
            html += "\n            <li data-src='".concat(f, "' data-thumb='").concat(f, "'>\n                <img src='").concat(f, "' style='max-height: 100%; max-width: 100%;' />\n            </li>");
        });
        return html;
    },
    /**
     * 貼文留言顯示
     * @param PostMsgList
     */
    ShowPostMsg: function (postKey, postMsgList, totalPostMsgCount) {
        var html = '';
        postMsgList.slice(0, 3).forEach(function (f) {
            html += Post.PostMsgHtmlTemplate(f);
        });
        if (totalPostMsgCount > 3)
            html += "\n            <div class=\"div_post_moreMsg\" PostKey=\"".concat(postKey, "\">\n                <div class=\"container_moreMsg\" onclick=\"Post.ShowAllPostMsg(").concat(postKey, ")\">\n                    <img class=\"moreMsg\" src=\"/images/more_msg.svg\" />\n                        <span>\u67E5\u770B\u5176\u5B83\u7559\u8A00</span>\n                    <img class=\"moreMsg\" src=\"/images/more_msg.svg\" />\n                </div>\n            </div>\n");
        return html;
    },
    /**
     * 貼文留言 Html Template
     */
    PostMsgHtmlTemplate: function (model) {
        return "\n    <div class=\"div_post_msg\" MsgKey=\"".concat(model.MsgKey, " MemberID=\"").concat(model.MemberID, "\">\n        <div class=\"post_msgPhoto_container\">\n            <img class=\"post_msgPhoto\" src=\"").concat(model.ProfilePhotoUrl, "\">\n        </div>\n        <div class=\"postMsgProfile\">\n            <div>\n                <span>").concat(model.NickName, "</span>\n                <span class=\"msgContent\" style=\"margin-left:5px;\"> ").concat(model.MsgContent, "</span>\n            </div>\n            <span class=\"time\" title=\"").concat(Common.DateFormat(model.PostMsgDateTime.toString()), "\">").concat(Post.PostDateTimeFilter(model.PostMsgDateTime.toString()), "</span>\n        </div>\n    </div>\n  ");
    },
    /**
     * 貼文選項開關
     * @param e HTMLSpanElement
     */
    TogglePostAction: function (e) {
        tempSelectPostKey = parseInt($(e).attr('postkey'));
        $(e).children('ul').toggle();
    },
    /**
     * 顯示該貼文所有留言
     * @param postkey 貼文編號
     */
    ShowAllPostMsg: function (postkey) { return __awaiter(_this, void 0, void 0, function () {
        var allPostMsgList, postMsgHtmlTemplateList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, GetPostAllMsgAPI(new CommonPostViewModel(postkey))];
                case 1:
                    allPostMsgList = _a.sent();
                    if (allPostMsgList.length > 0) {
                        $(".div_post[postkey=".concat(postkey, "] > .div_post_msg")).remove();
                        postMsgHtmlTemplateList = '';
                        allPostMsgList.forEach(function (f) { return postMsgHtmlTemplateList += Post.PostMsgHtmlTemplate(f); });
                        $(".div_post[postkey=".concat(postkey, "] > .div_post_msg_send")).after(postMsgHtmlTemplateList);
                    }
                    $(".div_post_moreMsg[postkey=".concat(postkey, "]")).remove();
                    // 控制 Img Default Style
                    Common.ControllImgDefaultStyle();
                    return [2 /*return*/];
            }
        });
    }); },
    /**
     * Source Code 參考
     * https://www.cnblogs.com/miangao/p/13229050.html
     *
     * 發布時間轉換字串顯示
     * 改寫成
     * ● 當天(24小時內)顯示"XX秒/分鐘/小時前"。
     * ● 前一天(48小時內)顯示"昨天 XX:XX"。
     * ● 前兩天(72小時內)顯示"前天 XX:XX"。
     * ● 72小時以上顯示年月日，範例：2021/06/04。
     * @param postDateTimeStr 發布時間
     */
    PostDateTimeFilter: function (postDateTimeStr) {
        var postDateTime = new Date(postDateTimeStr);
        var publishTime = postDateTime.getTime() / 1000, d_seconds, d_minutes, d_hours, d_days, timeNow = new Date().getTime() / 1000, d, Y = postDateTime.getFullYear(), M = (postDateTime.getMonth() + 1).toString().padStart(2, '0'), D = postDateTime.getDate().toString().padStart(2, '0'), H = postDateTime.getHours().toString().padStart(2, '0'), m = postDateTime.getMinutes().toString().padStart(2, '0'), s = postDateTime.getSeconds().toString().padStart(2, '0');
        d = timeNow - publishTime;
        d_days = Math.floor(d / 86400);
        d_hours = Math.floor(d / 3600);
        d_minutes = Math.floor(d / 60);
        d_seconds = Math.floor(d);
        if (d_hours >= 72) {
            return "".concat(Y, "/").concat(M, "/").concat(D);
        }
        else if (d_hours < 72 && d_hours >= 48) {
            return "\u524D\u5929 ".concat(H, ":").concat(m);
        }
        else if (d_hours < 48 && d_hours >= 24) {
            return "\u6628\u5929 ".concat(H, ":").concat(m);
        }
        else if (d_hours < 24 && d_minutes >= 60) {
            return "".concat(d_hours, "\u5C0F\u6642\u524D");
        }
        else if (d_minutes < 60 && d_seconds >= 60) {
            return "".concat(d_minutes, "\u5206\u9418\u524D");
        }
        else {
            return "".concat(d_seconds, "\u79D2\u524D");
        }
    }
};
