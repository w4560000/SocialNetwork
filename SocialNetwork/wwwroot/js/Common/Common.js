var Common = {
    /**
     * 驗證上傳圖檔的附檔名
     * @param fileName 上傳圖檔
     */
    ValidateUploadPhotoExtension: function (file) { return /\.(jpg|jpeg|png|webp|svg|gif)$/.test(file.name); },
    /**
     * 驗證上傳圖檔的大小 (限制 5 MB)
     * @param fileName 上傳圖檔
     */
    ValidateUploadPhotoSize: function (file) { return file.size <= 5 * 1024 * 1024; },
    /**
     * 刪除錯誤輸入框提示
     * @param e element
     */
    RemoveErrorInput: function (e) { return $(e).removeClass('input-error'); },
    /**
     * 彈窗
     * @param containerID containerID
     * @param func func
     */
    Popup: function (containerID, func) {
        var popBox = $('#' + containerID + '> .popBox')[0];
        var popLayer = $('#' + containerID + '> .popLayer')[0];
        popBox.style.display = popLayer.style.display = "block";
        if (func !== undefined)
            func;
    },
    /**
     * 關閉彈窗
     * @param containerID containerID
     * @param func func
     */
    ClosePopup: function (containerID, func) {
        var popBox = $('#' + containerID + '> .popBox')[0];
        var popLayer = $('#' + containerID + '> .popLayer')[0];
        popBox.style.display = popLayer.style.display = "none";
        if (func !== undefined)
            func;
    },
    /**
     * 驗證輸入框
     * @param errorMsg 錯誤提示字
     */
    Validate: function (errorMsg) {
        var error = '';
        Object.keys(errorMsg).forEach(function (key) {
            if (!error && !$('#' + key).val()) {
                $('#' + key).removeClass('input-error');
                error = errorMsg[key];
                $('#' + key).addClass('input-error');
            }
        });
        return error;
    },
    /**
     * SweetAlert 成功彈窗
     * @param res 共用回應 ViewModel
     * @param confirmFunc 確認Func
     */
    SweetAlertSuccess: function (res, confirmFunc) {
        if (confirmFunc != null) {
            Swal.fire({
                icon: 'success',
                text: res.Message,
                confirmButtonText: '確認',
                allowOutsideClick: false,
            }).then(function (result) {
                if (result.isConfirmed) {
                    confirmFunc(res);
                }
            });
        }
        else {
            Swal.fire({
                icon: 'success',
                text: res.Message,
                confirmButtonText: '確認'
            });
        }
    },
    /**
     * SweetAlert 失敗彈窗
     * @param res 共用回應 ViewModel
     * @param confirmFunc 確認Func
     */
    SweetAlertError: function (res, confirmFunc) {
        if (confirmFunc != null) {
            Swal.fire({
                icon: 'error',
                text: res.Message,
                confirmButtonText: '確認',
                allowOutsideClick: false,
                focusConfirm: false
            }).then(function (result) {
                if (result.isConfirmed) {
                    confirmFunc();
                }
            });
        }
        else {
            Swal.fire({
                icon: 'error',
                text: res.Message,
                confirmButtonText: '確認',
                focusConfirm: false
            });
        }
    },
    /**
     * SweetAlert 失敗彈窗
     * @param msg 錯誤訊息
     * @param confirmFunc 確認Func
     */
    SweetAlertErrorMsg: function (msg, confirmFunc) {
        if (confirmFunc != null) {
            Swal.fire({
                icon: 'error',
                text: msg,
                confirmButtonText: '確認',
                allowOutsideClick: false,
                focusConfirm: false
            }).then(function (result) {
                if (result.isConfirmed) {
                    confirmFunc();
                }
            });
        }
        else {
            Swal.fire({
                icon: 'error',
                text: msg,
                confirmButtonText: '確認',
                focusConfirm: false
            });
        }
    },
    /**
     * SweetAlert Loading 彈窗
     * @param msg 訊息
     */
    SweetAlertLoading: function (msg) {
        Swal.fire({
            title: msg,
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: function () {
                Swal.showLoading();
            }
        });
    },
    /**
     * SweetAlert 轉導
     * @param path 路徑
     * @param pathName 頁面名稱
     */
    SweetAlertRedirect: function (path, pathName) {
        var timerInterval;
        Swal.fire({
            html: "<b></b> \u79D2\u5F8C \u8DF3\u8F49\u56DE".concat(pathName),
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: function () {
                Swal.showLoading();
                var b = Swal.getHtmlContainer().querySelector('b');
                timerInterval = setInterval(function () {
                    b.textContent = Math.round(Swal.getTimerLeft() / 1000).toString();
                }, 100);
            },
            willClose: function () {
                clearInterval(timerInterval);
            }
        }).then(function (result) {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                window.location.href = path;
            }
        });
    },
    /**
     * SweetAlert 確認彈窗
     * @param title 標題
     * @param confirmFunc 確認Func
     */
    SweetAlertConfirm: function (title, confirmFunc, failConfirmFunc, cancelButtonText) {
        if (cancelButtonText === void 0) { cancelButtonText = '取消'; }
        Swal.fire({
            title: title,
            showCancelButton: true,
            confirmButtonText: '確定',
            cancelButtonText: cancelButtonText,
            reverseButtons: true
        }).then(function (result) {
            if (result.isConfirmed)
                confirmFunc();
            else {
                if (failConfirmFunc != null)
                    failConfirmFunc();
            }
        });
    },
    /**
     * SweetAlert 通知快顯
     * @param IsSuccess 是否操作成功
     * @param title 標題
     */
    SweetAlertNotification: function (IsSuccess, title) {
        Toast.fire({
            icon: IsSuccess ? 'success' : 'error', title: title
        });
    },
    /**
     * Date 轉換 => yyyy-MM-dd HH:mm:ss
     * @param date
     */
    DateFormat: function (date) {
        return new Date(date).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    },
    /**
     * 頁面註冊 Datepicker
     * @param e HTMLElement
     * @param onSelectFunc SeleteFunc
     */
    DatepickerInit: function (e, onSelectFunc) {
        var currentYear = new Date().getFullYear();
        e.datepicker({
            changeMonth: true,
            changeYear: true,
            showMonthAfterYear: true,
            yearRange: "1950:".concat(currentYear),
            dateFormat: 'yy-mm-dd',
            onSelect: onSelectFunc
        });
        $("#datepicker").on('change', function () {
            $(this).val("");
        });
        $.datepicker.regional['zh-TW'] = {
            dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            prevText: "上月",
            nextText: "次月",
            weekHeader: "週"
        };
        $.datepicker.setDefaults($.datepicker.regional["zh-TW"]);
    },
    /**
     * 會員資料公開或隱藏
     * @param e HTMLImageElement
     */
    InfoIconToggle: function (e) {
        var hideImage = "/images/InfoHide.png";
        var publicImage = "/images/InfoPublic.png";
        e.src = e.src.includes(publicImage) ? hideImage : publicImage;
    },
    /**
     * 判斷傳入的enum值是否包含特定的列舉項目(僅供enum flag使用)
     * @param {object} targetEnum 欲判定的列舉flags欄位
     * @param {object} checkEnum 特定的列舉項目
     * @return {boolean} true: 有包含特定的列舉項目 / false: 無包含特定列舉項目
     */
    HasFlag: function (targetEnum, checkEnum) {
        var result = (targetEnum & checkEnum) === checkEnum;
        return result;
    },
    /**
     * 控制 Img Default Style
     * */
    ControllImgDefaultStyle: function () {
        $('img').each(function () {
            if ($(this).attr('src') !== undefined && $(this).attr('src').includes('default_profilePhoto'))
                $(this).addClass('index_profilePhotoDefault');
            else
                $(this).removeClass('index_profilePhotoDefault');
        });
    },
    /**
     * SVG 元素控制
     * */
    ControllSVG: function () {
        jQuery('img.svg').each(function () {
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');
            var imgClick = $img.attr('onclick');
            jQuery.get(imgURL, function (data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');
                // Add replaced image's ID to the new SVG
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }
                if (typeof imgClick !== 'undefined') {
                    $svg = $svg.attr('onclick', imgClick);
                }
                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');
                // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
                }
                // Replace image with new SVG
                $img.replaceWith($svg);
            }, 'xml');
        });
    }
};
/** SweetAlert 快顯 */
var Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    showClass: {
        popup: 'animate__animated animate__fadeInRight'
    },
    hideClass: {
        popup: 'animate__animated animate__fadeOutRight'
    },
    timer: 3000,
    timerProgressBar: true,
    didOpen: function (toast) {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    showCloseButton: true
});
