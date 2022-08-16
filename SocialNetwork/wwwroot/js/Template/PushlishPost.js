var TempFileList = [];
/**
 * 顯示發佈貼文區塊
 * @param e HTMLElement
 */
function ShowPublishPostContent(e) {
    $(e).hide();
    $('#post_content_detail').removeClass('post_content_detail_hide');
    $('#post_content_detail').addClass('post_content_detail');
    $('.write_post').focus();
}
/**
 * 取消發佈貼文
 * @param e
 */
function CancelPublishPostContent(e) {
    $('.post_content').show();
    $('#post_content_detail').removeClass('post_content_detail');
    $('#post_content_detail').addClass('post_content_detail_hide');
}
/**
 * 上傳圖片預覽
 * @param e HTMLInputElement
 */
function UploadPhoto_Change(e) {
    if (e.files) {
        var fileList = Array.from(e.files);
        var isValidateExtension = fileList.every(function (e) { return Common.ValidateUploadPhotoExtension(e.name); });
        if (isValidateExtension === false) {
            e.files = null;
            Common.SweetAlertError('圖片僅限上傳 .jpg、.jpeg、.png、.webp、.svg、.gif');
            return;
        }
        for (var i = 0; i < fileList.length; i++) {
            $('.photoPreview').append("<div class=\"photoPreviewContainer\">" +
                "<img class=\"svg photoDelete\" src=\"/images/Close.svg\" onclick='PhotoDelete(this)' id=\"".concat(fileList[i].name, "\"/>") +
                "<img class=\"photoPreviewImg\" src=\"".concat(URL.createObjectURL(fileList[i]), "\" />") +
                '</div>');
            TempFileList.push(fileList[i]);
        }
        Common.ControllSVG();
    }
}
/**
 * 刪除預覽圖片
 * @param e HTMLImageElement
 */
function PhotoDelete(e) {
    // 刪除暫存 FileList
    TempFileList = TempFileList.filter(function (f) { return f.name !== e.id; });
    // 刪除 Element
    $(e).parent().remove();
}
/**
 *  發佈貼文
 * */
function PublishPost() {
    debugger;
    var post = $(".write_post").val();
    if (post.length === 0) {
        Common.SweetAlertError('請輸入貼文內容');
        return;
    }
    var formData = new FormData();
    formData.append('Post', post);
    TempFileList.forEach(function (f) { return formData.append('PhotoFiles', f); });
    var successFunc = function () { };
    var errorFunc = function () { };
    PublishPostAPI("發佈貼文中", formData, successFunc, errorFunc, '確定是否發佈?');
}
