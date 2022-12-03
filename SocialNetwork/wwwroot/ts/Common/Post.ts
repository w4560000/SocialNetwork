const Post = {

    /**
     * 貼文 Html Template
     */
    PostHtmlTemplate: (model: GetPostResViewModel) => {
        return `
<div class="div_post" PostKey="${model.PostKey}" MemberID="${model.MemberID}">
    <div class="div_post_content">
        <div class="post_content_topBar">
            <div class="postPhoto_container">
                <img class="postPhoto" src="${model.ProfilePhotoUrl}">
            </div>
            <div class="postProfile">
                <span>${model.NickName}</span>
                <span class="time"title="${Common.DateFormat(model.PostDateTime.toString())}">${Post.PostDateTimeFilter(model.PostDateTime.toString())}</span>
            </div>
            <div class="postAction">⋮</div>
        </div>
        <div class="post_body">
            <span>
                ${model.PostContent}
            </span>
            <div id="wrapper">
                <ul class="example">
                    ${Post.PostImageHtmlTemplate(model.PostImageUrlList)}
                </ul>
            </div>
        </div>
        <div class="post_footerBar">
            <div class="post_footer_container">
                <div class="post_footer_img">
                    <img class="postLike" src="/images/post/thumb_up_black_24dp.svg" />
                </div>
                <span class="post_footer_number">${model.GoodQuantity}</span>
            </div>
            <div class="post_footer_container">
                <div class="post_footer_img">
                    <img class="postMsg" src="/images/post/textsms_black_24dp.svg" />
                </div>
                <span class="post_footer_number">${model.TotalPostMsgCount}</span>
            </div>
            <div class="post_footer_container">
                <img class="postShare" src="/images/post/share_black_24dp.svg" />
            </div>
        </div>
    </div>
    <div class="div_post_msg_send">
        <div class="post_msgPhoto_container">
            <img class="post_msgPhoto" src="${model.ProfilePhotoUrl}">
        </div>
        <div class="post_msg_comment">
            <textarea class="msgComment" placeholder="留言..."></textarea>
        </div>
        <div class="post_msg_submit">
            <img class="msgSend" src="/images/post/send_black_24dp.svg">
        </div>
    </div>

    ${Post.ShowPostMsg(model.PostMsgList, model.TotalPostMsgCount)}
</div>
  `;
    },

    /**
     * 貼文圖片 Html Template
     * @param PostMsgList
     */
    PostImageHtmlTemplate: (postImageUrlList: Array<string>) => {
        var html = '';

        if (postImageUrlList.length == 0)
            return html;

        postImageUrlList.forEach(f => {
            html += `
            <li data-src="${f}" data-thumb="${f}">
                <img src="${f}" />
            </li>`
        });

        return html;
    },

    /**
     * 貼文留言顯示
     * @param PostMsgList
     */
    ShowPostMsg: (postMsgList: Array<GetPostMsgResViewModel>, totalPostMsgCount: number) => {
        var html = '';

        postMsgList.slice(0, 3).forEach(f => {
            html += Post.PostMsgHtmlTemplate(f);
        });
        
        if (totalPostMsgCount > 3)
            html += "<div> 查看其他留言 </div>";

        return html;
    },
    /**
     * 貼文留言 Html Template
     */
    PostMsgHtmlTemplate: (model: GetPostMsgResViewModel) => {
        return `
    <div class="div_post_msg" MsgKey="${model.MsgKey} MemberID="${model.MemberID}">
        <div class="post_msgPhoto_container">
            <img class="post_msgPhoto" src="${model.ProfilePhotoUrl}">
        </div>
        <div class="postMsgProfile">
            <span>${model.NickName}</span>
            <span class="time" title="${Common.DateFormat(model.PostMsgDateTime.toString())}">${Post.PostDateTimeFilter(model.PostMsgDateTime.toString())}</span>
        </div>
        <span class="postMsgComment">${model.MsgContent}</span>
    </div>
  `;
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
    PostDateTimeFilter: (postDateTimeStr: string) => {
        var postDateTime = new Date(postDateTimeStr);
        var publishTime = postDateTime.getTime() / 1000,
            d_seconds,
            d_minutes,
            d_hours,
            d_days,
            timeNow = new Date().getTime() / 1000,
            d,

            Y = postDateTime.getFullYear(),
            M = (postDateTime.getMonth() + 1).toString().padStart(2, '0'),
            D = postDateTime.getDate().toString().padStart(2, '0'),
            H = postDateTime.getHours().toString().padStart(2, '0'),
            m = postDateTime.getMinutes().toString().padStart(2, '0'),
            s = postDateTime.getSeconds().toString().padStart(2, '0');

        d = timeNow - publishTime;
        d_days = Math.floor(d / 86400);
        d_hours = Math.floor(d / 3600);
        d_minutes = Math.floor(d / 60);
        d_seconds = Math.floor(d);

        if (d_hours >= 72) {
            return `${Y}/${M}/${D}`;
        } else if (d_hours < 72 && d_hours >= 48) {
            return `前天 ${H}:${m}`;
        } else if (d_hours < 48 && d_hours >= 24) {
            return `昨天 ${H}:${m}`;
        } else if (d_hours < 24 && d_minutes >= 60) {
            return `${d_hours}小時前`;
        } else if (d_minutes < 60 && d_seconds >= 60) {
            return `${d_minutes}分鐘前`;
        } else {
            return `${d_seconds}秒前`;
        }
    }
};