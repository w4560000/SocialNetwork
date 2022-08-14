var TempFileList = [];
/**
 * 上傳圖片預覽
 * @param e HTMLInputElement
 */
function uploadPhoto_Change(e) {
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
