var tempSelectPostKey = 0;
var Post = {
    Init: function () {
        //$(".postAction").on("focus", function (event) {
        //    debugger
        //    $(this).children('.ul_postAction').show();
        //});
        //$(".postAction").blur(function (event) {
        //    debugger
        //    $(this).children('.ul_postAction').hide();
        //});
    },
    /**
     * 貼文 Html Template
     */
    PostHtmlTemplate: function (model) {
        return "\n<div class=\"div_post\" PostKey=\"".concat(model.PostKey, "\" MemberID=\"").concat(model.MemberID, "\">\n    <div class=\"div_post_content\">\n        <div class=\"post_content_topBar\">\n            <div class=\"postPhoto_container\">\n                <img class=\"postPhoto\" src=\"").concat(model.ProfilePhotoUrl, "\">\n            </div>\n            <div class=\"postProfile\">\n                <div>").concat(model.NickName, "</div>\n                <span class=\"time\"title=\"").concat(Common.DateFormat(model.PostDateTime.toString()), "\">").concat(Post.PostDateTimeFilter(model.PostDateTime.toString()), "</span>\n            </div>\n            <div class=\"postAction\" tabindex=\"-1\" PostKey=\"").concat(model.PostKey, "\" onclick=\"Post.TogglePostAction(this)\">\u22EE\n            <ul class=\"ul_postAction\" PostKey=\"").concat(model.PostKey, "\">\n                <li><a PostKey=\"").concat(model.PostKey, "\">\u522A\u9664</a></li>\n                <li><a PostKey=\"").concat(model.PostKey, "\">\u7DE8\u8F2F</a></li>\n            </ul>\n            </div>\n        </div>\n        <div class=\"post_body\">\n            ").concat(model.PostContent, "\n            <div id=\"wrapper\">\n                <ul class=\"example\">\n                    ").concat(Post.PostImageHtmlTemplate(model.PostImageUrlList), "\n                </ul>\n            </div>\n        </div>\n        <div class=\"post_footerBar\">\n            <div class=\"post_footer_container\">\n                <div class=\"post_footer_img\">\n                    <img class=\"postLike\" src=\"/images/post/thumb_up_black_24dp.svg\" />\n                </div>\n                <span class=\"post_footer_number\">").concat(model.GoodQuantity, "</span>\n            </div>\n            <div class=\"post_footer_container\">\n                <div class=\"post_footer_img\">\n                    <img class=\"postMsg\" src=\"/images/post/textsms_black_24dp.svg\" />\n                </div>\n                <span class=\"post_footer_number\">").concat(model.TotalPostMsgCount, "</span>\n            </div>\n            <div class=\"post_footer_container\">\n                <img class=\"postShare\" src=\"/images/post/share_black_24dp.svg\" />\n            </div>\n        </div>\n    </div>\n    <div class=\"div_post_msg_send\">\n        <div class=\"post_msgPhoto_container\">\n            <img class=\"post_msgPhoto\" src=\"").concat(model.ProfilePhotoUrl, "\">\n        </div>\n        <div class=\"post_msg_comment\">\n            <textarea class=\"msgComment\" placeholder=\"\u7559\u8A00...\"></textarea>\n        </div>\n        <div class=\"post_msg_submit\">\n            <img class=\"msgSend\" src=\"/images/post/send_black_24dp.svg\">\n        </div>\n    </div>\n\n    ").concat(Post.ShowPostMsg(model.PostKey, model.PostMsgList, model.TotalPostMsgCount), "\n</div>\n  ");
    },
    /**
     * 貼文圖片 Html Template
     * @param PostMsgList
     */
    PostImageHtmlTemplate: function (postImageUrlList) {
        var html = '';
        if (postImageUrlList.length == 0)
            return html;
        postImageUrlList.forEach(function (f) {
            html += "\n            <li data-src=\"".concat(f, "\" data-thumb=\"").concat(f, "\">\n                <img src=\"").concat(f, "\" style=\"max-height: 100%; max-width: 100%;\"/>\n            </li>");
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
            html += "\n            <div class=\"div_post_moreMsg\" PostKey=\"".concat(postKey, "\">\n                <div class=\"container_moreMsg\">\n                    <img class=\"moreMsg\" src=\"/images/more_msg.svg\" />\n                        <span>\u67E5\u770B\u5176\u5B83\u7559\u8A00</span>\n                    <img class=\"moreMsg\" src=\"/images/more_msg.svg\" />\n                </div>\n            </div>\n");
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
