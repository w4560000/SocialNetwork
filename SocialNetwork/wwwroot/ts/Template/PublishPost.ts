import { API, Enum, Request, Response, Common } from "../Common/CommonInferface.js";

var tempFileList: File[] = [];

export const PublishPostPage = {
    Init: () => {
        // 輸入框 高度自動伸縮
        $('.write_post, .msgComment').on("input", function () {
            let _this = $(this);
            var currentVal = _this.val() as string;

            _this.height('auto');
            _this.height(_this.prop('scrollHeight') + 'px');
        });
    },
    /**
     * 顯示發佈貼文區塊
     * @param e HTMLElement
     */
    ShowPublishPostContent: (e: HTMLElement) => {
        $(e).hide();
        $('#post_content_detail').removeClass('post_content_detail_hide');
        $('#post_content_detail').addClass('post_content_detail');

        $('.write_post').focus();
    },
    /**
     * 取消發佈貼文
     * @param e
     */
    CancelPublishPostContent: (e: HTMLElement) => {
        $('.post_content').show();
        $('#post_content_detail').removeClass('post_content_detail');
        $('#post_content_detail').addClass('post_content_detail_hide');
    },
    /**
     * 上傳圖片預覽
     * @param e HTMLInputElement
     */
    UploadPhoto_Change: (e: HTMLInputElement) => {
        if (e.files) {
            var fileList = Array.from(e.files);

            if (fileList.length > 10) {
                e.files = null;
                Common.SweetAlertErrorMsg('單筆貼文圖片限定最多上傳 10 張');
                return;
            }

            if (fileList.every(e => Common.ValidateUploadPhotoExtension(e)) === false) {
                e.files = null;
                Common.SweetAlertErrorMsg('圖片僅限上傳 .jpg、.jpeg、.png、.webp、.svg、.gif');
                return;
            }

            if (fileList.every(e => Common.ValidateUploadPhotoSize(e) === false)) {
                e.files = null;
                Common.SweetAlertErrorMsg('單張圖片大小不得超過 5 MB');
                return;
            }

            for (var i = 0; i < fileList.length; i++) {
                $('.photoPreview').append(
                    `<div class="photoPreviewContainer">` +
                    `<img class="svg photoDelete" src="/images/Close.svg" onclick='PhotoDelete(this)' id="${fileList[i].name}"/>` +
                    `<img class="svg photoPreviewImg" src="${URL.createObjectURL(fileList[i])}" />` +
                    '</div>');

                tempFileList.push(fileList[i]);
            }

            Common.ControllSVG();
        }
    },
    /**
     * 刪除預覽圖片
     * @param e HTMLImageElement
     */
    PhotoDelete(e: HTMLImageElement) {
        // 刪除暫存 FileList
        tempFileList = tempFileList.filter(f => f.name !== e.id);

        // 刪除 Element
        $(e).parent().remove();
    },
    /**
     *  發佈貼文
     * */
    PublishPost: () => {
        let post = $(".write_post").val() as string;

        if (post.length === 0) {
            Common.SweetAlertErrorMsg('請輸入貼文內容');
            return;
        }

        var formData = new FormData();
        formData.append('Post', post);
        tempFileList.forEach(f => formData.append('PhotoFiles', f));

        var successFunc = function () {
            // 成功發佈貼文後 清空圖片、貼文
            $('.photoPreview').empty();
            tempFileList = [];
            $(".write_post").val('');

            $('#deploy_post_cancel').click();

            // todo reload PostMsg
        };
        var errorFunc = function () { };
        API.PublishPostAPI("發佈貼文中", formData, successFunc, errorFunc, '確定是否發佈?');
    }
}

window["PublishPostPage"] = PublishPostPage;