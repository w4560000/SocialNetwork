/** 點擊貼文選項開關 暫存的貼文編號 */
var tempSelectPostKey: number = 0;

/** 該頁面目前查詢貼文筆數 */
var tempQueryRowNo: number = 1;

/** 貼文類型 */
var _postType: PostTypeEnum;

/** 目前頁面有點擊選是全部留言的貼文編號 */
var tempShowAllPostMsgPostKey: Array<number> = new Array<number>();

const Post = {
    /**
     * 初始化
     * @param postType 貼文類型
     * @param memberID 會員編號
     */
    Init: async (postType: PostTypeEnum, memberID: number = 0) => {
        tempQueryRowNo = 1;
        $('.div_post').remove();
        _postType = postType;
        await Post.LoadPost(memberID);

        //$(".postAction").on("focus", function (event) {
        //    debugger
        //    $(this).children('.ul_postAction').show();
        //});

        //$(".postAction").blur(function (event) {
        //    debugger
        //    $(this).children('.ul_postAction').hide();
        //});

        $(window).scroll(async function () {
            let scrollTop = $(document).scrollTop() as number;
            let documentHeight = $(document).height() as number;
            let windowHeight = $(window).height() as number;

            // 判斷頁面捲到最底部
            if (scrollTop == (documentHeight - windowHeight)) {
                await Post.LoadPost(memberID);
            }
        });

        $('.msgComment').keydown(async function (e) {
            let _this = $(this);
            if (e.key == 'Enter' && (e.shiftKey || e.ctrlKey || e.altKey)) {
                e.preventDefault();
                let msg = _this.val() + '\n';
                _this.val(msg);
            }
            else if (e.key == 'Enter') {
                e.preventDefault();
                await Post.SendPostMsg(_this);
            }

            _this.height('auto');
            _this.height(_this.prop('scrollHeight') + 'px');
        });
    },

    /**
     * 載入貼文
     * @param postType 貼文類型
     * */
    LoadPost: async (memberID: number) => {
        let postData = _postType === PostTypeEnum.首頁 || memberID == 0 ?
            await GetIndexPostAPI(new QueryRowMemberReqViewModel(user.MemberID, tempQueryRowNo)) :
            await GetHomePagePostAPI(new QueryRowMemberReqViewModel(memberID, tempQueryRowNo));

        if (postData.length !== 0) {
            postData.forEach(f => {
                if (!$('.div_post').length)
                    $('#post').append(Post.PostHtmlTemplate(f));
                else
                    $('.div_post').last().after(Post.PostHtmlTemplate(f));

                Common.InitLightSlider($(`.PostPhoto[PostKey='${f.PostKey}']`));
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
    },
    /**
     * 貼文 Html Template
     * @param model 貼文 ViewModel
     */
    PostHtmlTemplate: (model: GetPostResViewModel) => {
        return `
<div class="div_post" PostKey="${model.PostKey}" MemberID="${model.MemberID}">
    <div class="div_post_content">
        <div class="post_content_topBar">
            <div class="postPhoto_container">
                <img class="postPhoto" src="${model.ProfilePhotoUrl}" />
            </div>
            <div class="postProfile">
                <div>${model.NickName}</div>
                <span class="time" title="${Common.DateFormat(model.PostDateTime.toString())}">${Post.PostDateTimeFilter(model.PostDateTime.toString())}</span>
            </div>
            ${(model.MemberID === user.MemberID ?
            `<div class="postAction" tabindex="-1" PostKey="${model.PostKey}" onclick="Post.TogglePostAction(this)">⋮
                <ul class="ul_postAction" PostKey="${model.PostKey}">
                    <li><a PostKey="${model.PostKey}" onclick="Post.DeletePost(this)">刪除</a></li>
                    <!-- todo <li><a PostKey="${model.PostKey}">編輯</a></li> -->
                </ul>
            </div>` : '')}
            
        </div>
        <div class="post_body">
            <div class="post_body_content">${model.PostContent}</div>
            <div style="margin-top: 10px;">
                <ul class="PostPhoto" PostKey="${model.PostKey}">
                    ${Post.PostImageHtmlTemplate(model.PostImageUrlList)}
                </ul>
            </div>
        </div>
        <div class="post_footerBar">
            <div class="post_footer_container">
                <div class="post_footer_img" onclick="Post.TogglePostLike(${model.PostKey})">
                    <img class="postLike ${model.IsCurrnetMemberPostLiked ? 'postLiked' : ''}" src="/images/post/thumb_up_black_24dp.svg" />
                </div>
                <span class="post_footer_number postLikeCount">${model.PostLike}</span>
            </div>
            <div class="post_footer_container">
                <div class="post_footer_img postMsgContainer" onclick="Post.FocusMsg(this)">
                    <img class="postMsg" src="/images/post/textsms_black_24dp.svg" />
                </div>
                <span class="post_footer_number postMsgCount">${model.TotalPostMsgCount}</span>
            </div>
            <!--<div class="post_footer_container">
                <img class="postShare" src="/images/post/share_black_24dp.svg" />
            </div>todo -->
        </div>
    </div>
    <div class="div_post_msg_send">
        <div class="post_msgPhoto_container">
            <img class="post_msgPhoto" src="${user.ProfilePhotoUrl}">
        </div>
        <div class="post_msg_comment">
            <textarea class="msgComment" placeholder="留言..."></textarea>
        </div>
        <div class="post_msg_submit" onclick="Post.SubmitPostMsg(this)">
            <img class="msgSend" src="/images/post/send_black_24dp.svg">
        </div>
    </div>

    ${Post.ShowPostMsg(model.PostKey, model.PostMsgList, model.TotalPostMsgCount)}
</div>`;
    },
    /**
     * 貼文圖片 Html Template
     * @param postImageUrlList 貼文圖片 URL 清單
     */
    PostImageHtmlTemplate: (postImageUrlList: Array<string>) => {
        let html = '';

        if (postImageUrlList.length == 0)
            return html;

        postImageUrlList.forEach(f => {
            html += `
            <li data-src='${f}' data-thumb='${f}'>
                <img src='${f}' style='max-height: 100%; max-width: 100%;' />
            </li>`;
        });

        return html;
    },
    /**
     * 貼文留言顯示
     * @param PostMsgList
     */
    ShowPostMsg: (postKey: number, postMsgList: Array<GetPostMsgResViewModel>, totalPostMsgCount: number) => {
        let html = '';

        postMsgList.slice(0, 3).forEach(f => {
            html += Post.PostMsgHtmlTemplate(f);
        });

        if (totalPostMsgCount > 3)
            html += `
            <div class="div_post_moreMsg" PostKey="${postKey}">
                <div class="container_moreMsg" onclick="Post.ShowAllPostMsg(${postKey})">
                    <img class="moreMsg" src="/images/more_msg.svg" />
                        <span>查看其它留言</span>
                    <img class="moreMsg" src="/images/more_msg.svg" />
                </div>
            </div>`;

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
            <div>
                <span>${model.NickName}</span>
                <span class="msgContent" style="margin-left:5px;"> ${model.MsgContent}</span>
            </div>
            <span class="time" title="${Common.DateFormat(model.PostMsgDateTime.toString())}">${Post.PostDateTimeFilter(model.PostMsgDateTime.toString())}</span>
        </div>
    </div>`;
    },
    /**
     * 貼文選項開關
     * @param e HTMLSpanElement
     */
    TogglePostAction: (e: HTMLSpanElement) => {
        tempSelectPostKey = parseInt($(e).attr('postkey') as string);
        $(e).children('ul').toggle();
    },
    /**
     * 貼文按讚 or 取消按讚
     * @param postKey 貼文編號
     */
    TogglePostLike: (postKey: number) => {
        let toggle = $(`.div_post[PostKey='${postKey}'] .postLike`).hasClass('postLiked') ? ToggleEnum.Off : ToggleEnum.On;
        let model = new TogglePostLikeReqViewModel(postKey, toggle);

        let successFunc = function () {
            var postLike = Number($(`.div_post[PostKey='${postKey}'] .postLikeCount`).html());

            if (toggle == ToggleEnum.On) {
                $(`.div_post[PostKey='${postKey}'] .postLike`).addClass('postLiked');
                $(`.div_post[PostKey='${postKey}'] .postLikeCount`).html((postLike + 1).toString());

                return;
            }

            $(`.div_post[PostKey='${postKey}'] .postLike`).removeClass('postLiked');
            $(`.div_post[PostKey='${postKey}'] .postLikeCount`).html((postLike - 1).toString());
        };
        
        let errorFunc = function () { };
        TogglePostLikeAPI(model, successFunc, errorFunc);
    },
    /**
     * 顯示該貼文所有留言
     * @param postkey 貼文編號
     */
    ShowAllPostMsg: async (postkey: number) => {
        tempShowAllPostMsgPostKey.push(postkey);
        let allPostMsgList = await GetPostAllMsgAPI(new CommonPostViewModel(postkey));

        if (allPostMsgList.length > 0) {
            $(`.div_post[postkey=${postkey}] > .div_post_msg`).remove();

            let postMsgHtmlTemplateList = '';
            allPostMsgList.forEach(f => postMsgHtmlTemplateList += Post.PostMsgHtmlTemplate(f));
            $(`.div_post[postkey=${postkey}] > .div_post_msg_send`).after(postMsgHtmlTemplateList);
        }

        $(`.div_post_moreMsg[postkey=${postkey}]`).remove();

        // 控制 Img Default Style
        Common.ControllImgDefaultStyle();
    },

    /**
     * 點擊發送貼文 按鈕
     * @param e
     */
    SubmitPostMsg: async (button: HTMLElement) => {
        let postMsgElement = $(button).prev().children('.msgComment');

        await Post.SendPostMsg(postMsgElement);
    },

    /**
     * 發送貼文留言
     * @param e element
     */
    SendPostMsg: async (e: JQuery<HTMLElement>) => {
        let postMsg = (e.val() as string);
        if (postMsg.length == 0)
            return;

        let currentPost = e.parents('.div_post');
        let postkey = Number(currentPost.attr('postkey'));

        let successFunc = (res: ResponseViewModel<GetPostMsgResViewModel>) => {
            if (res.Data) {
                currentPost.children('.div_post_msg_send').after(Post.PostMsgHtmlTemplate(res.Data));
                currentPost.find('.postMsgCount').html((Number(currentPost.find('.postMsgCount').html()) + 1).toString());
                e.val('');
            }
        };

        let errorFunc = () => { };

        await SendPostMsgAPI(new SendPostMsgReqViewModel(postkey, postMsg), successFunc, errorFunc);
    },
    /**
     * 點選Msg Icon 自動Focus留言輸入框
     * @param e element
     */
    FocusMsg: (e: HTMLElement) => {
        let currentPost = $(e).parents('.div_post');
        currentPost.find('.msgComment').focus();
    },

    /**
     * 刪除貼文
     * @param e element
     */
    DeletePost: (e: HTMLElement) => {
        let postkey = Number($(e).attr('postkey'));
        let successFunc = () => {
            $(e).parents('.div_post').remove();
        };

        let errorFunc = () => { };

        DeletePostAPI(new CommonPostViewModel(postkey), successFunc, errorFunc, '確定是否刪除貼文?');
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
        let postDateTime = new Date(postDateTimeStr);
        let publishTime = postDateTime.getTime() / 1000,
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
        } else if (d_seconds >= 10) {
            return `${d_seconds}秒前`;
        }
        else {
            return `剛剛`;
        }
    }
};