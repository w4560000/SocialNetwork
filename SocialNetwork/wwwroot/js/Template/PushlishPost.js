var TempFileList = [];
$(function () {
});
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
        if (fileList.length > 10) {
            e.files = null;
            Common.SweetAlertErrorMsg('單筆貼文圖片限定最多上傳 10 張');
            return;
        }
        if (fileList.every(function (e) { return Common.ValidateUploadPhotoExtension(e); }) === false) {
            e.files = null;
            Common.SweetAlertErrorMsg('圖片僅限上傳 .jpg、.jpeg、.png、.webp、.svg、.gif');
            return;
        }
        if (fileList.every(function (e) { return Common.ValidateUploadPhotoSize(e) === false; })) {
            e.files = null;
            Common.SweetAlertErrorMsg('單張圖片大小不得超過 5 MB');
            return;
        }
        for (var i = 0; i < fileList.length; i++) {
            $('.photoPreview').append("<div class=\"photoPreviewContainer\">" +
                "<img class=\"svg photoDelete\" src=\"/images/Close.svg\" onclick='PhotoDelete(this)' id=\"".concat(fileList[i].name, "\"/>") +
                "<img class=\"svg photoPreviewImg\" src=\"".concat(URL.createObjectURL(fileList[i]), "\" />") +
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
    var post = $(".write_post").val();
    if (post.length === 0) {
        Common.SweetAlertErrorMsg('請輸入貼文內容');
        return;
    }
    var formData = new FormData();
    formData.append('Post', post);
    TempFileList.forEach(function (f) { return formData.append('PhotoFiles', f); });
    var successFunc = function () {
        // 成功發佈貼文後 清空圖片、貼文
        $('.photoPreview').empty();
        TempFileList = [];
        $(".write_post").val('');
        $('#deploy_post_cancel').click();
        // todo reload PostMsg
    };
    var errorFunc = function () { };
    PublishPostAPI("發佈貼文中", formData, successFunc, errorFunc, '確定是否發佈?');
}
