///** 暫無使用 */
////String.prototype.IsNullOrEmptyOrUndefined = function () {
////    return !this;
////}
var Common = {
    /**
     * 刪除錯誤輸入框提示
     * @param e element
     */
    RemoveErrorInput: function (e) { return $(e).removeClass('input-error'); },
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
     * @param msg 訊息
     * @param confirmFunc 確認Func
     */
    SweetAlertSuccess: function (msg, confirmFunc) {
        if (confirmFunc != null) {
            Swal.fire({
                icon: 'success',
                text: msg,
                confirmButtonText: '確認'
            }).then(function (result) {
                if (result.isConfirmed) {
                    confirmFunc();
                }
            });
        }
        else {
            Swal.fire({
                icon: 'success',
                text: msg,
                confirmButtonText: '確認'
            });
        }
    },
    /**
     * SweetAlert 失敗彈窗
     * @param error 訊息
     * @param confirmFunc 確認Func
     */
    SweetAlertError: function (error, confirmFunc) {
        if (confirmFunc != null) {
            Swal.fire({
                icon: 'error',
                text: error,
                confirmButtonText: '確認',
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
                text: error,
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
     * 頁面註冊 Datepicker
     * @param e
     */
    DatepickerInit: function (e) {
        e.datepicker({
            changeMonth: true,
            changeYear: true,
            showMonthAfterYear: true,
            yearRange: '1950:2022',
            dateFormat: 'yy-mm-dd',
            onSelect: function (dateText, inst) {
                $("#year").val(inst.selectedYear);
                $("#month").val(inst.selectedMonth + 1);
                $("#day").val(inst.selectedDay);
            }
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
     * SVG 元素控制
     * */
    ControllSVG: function () {
        jQuery('img.svg').each(function () {
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');
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
