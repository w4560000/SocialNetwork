///** 暫無使用 */
////String.prototype.IsNullOrEmptyOrUndefined = function () {
////    return !this;
////}

const Common = {
    /**
     * 刪除錯誤輸入框提示
     * @param e element
     */
    RemoveErrorInput: (e: any) => $(e).removeClass('input-error'),
    Popup: (containerID: string, func: void) => {
        var popBox = $('#' + containerID + '> .popBox')[0];
        var popLayer = $('#' + containerID + '> .popLayer')[0];
        popBox.style.display = popLayer.style.display = "block";

        if (func !== undefined)
            func
    },
    /**
     * 關閉彈窗
     * @param containerID containerID
     * @param func func
     */
    ClosePopup: (containerID: string, func: void) => {
        var popBox = $('#' + containerID + '> .popBox')[0];
        var popLayer = $('#' + containerID + '> .popLayer')[0];
        popBox.style.display = popLayer.style.display = "none";

        if (func !== undefined)
            func
    },
    /**
     * 驗證輸入框
     * @param errorMsg 錯誤提示字
     */
    Validate: (errorMsg: any) => {
        let error = '';
        Object.keys(errorMsg).forEach(key => {
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
    SweetAlertSuccess: (msg: string | undefined, confirmFunc?: Function) => {
        if (confirmFunc != null) {
            Swal.fire({
                icon: 'success',
                text: msg,
                confirmButtonText: '確認'
            }).then((result) => {
                if (result.isConfirmed) {
                    confirmFunc();
                }
            })
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
    SweetAlertError: (error: string | undefined, confirmFunc?: Function) => {
        if (confirmFunc != null) {
            Swal.fire({
                icon: 'error',
                text: error,
                confirmButtonText: '確認',
                focusConfirm: false
            }).then((result) => {
                if (result.isConfirmed) {
                    confirmFunc();
                }
            })
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
    SweetAlertLoading: (msg: string) => {
        Swal.fire({
            title: msg,
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });
    },
    /**
     * SweetAlert 轉導
     * @param path 路徑
     * @param pathName 頁面名稱
     */
    SweetAlertRedirect: (path: string, pathName: string) => {
        let timerInterval;
        Swal.fire({
            html: `<b></b> 秒後 跳轉回${pathName}`,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
                const b = (Swal.getHtmlContainer() as HTMLElement).querySelector('b') as HTMLElement;
                timerInterval = setInterval(() => {
                    b.textContent = Math.round((Swal.getTimerLeft() as number) / 1000).toString();
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                window.location.href = path;
            }
        })
    },
    SweetAlertConfirm: (title: string | undefined, confirmFunc: Function) => {
        Swal.fire({
            title: title,
            showCancelButton: true,
            confirmButtonText: '確定',
            cancelButtonText: '取消'
        }).then((result) => {
            if (result.isConfirmed)
                confirmFunc();
        });
    },
    SweetAlertNotification: (IsSuccess: boolean, title: string | undefined) => {
        Toast.fire({
            icon: IsSuccess? 'success' : 'error', title: title
        });
    },
    /**
     * 頁面註冊 Datepicker
     * @param e
     */
    DatepickerInit: (e: JQuery<HTMLElement>) => {
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
            $(this).val("")
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
    ControllSVG: () => {
        jQuery('img.svg').each(function () {
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL as string, function (data) {
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
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                }

                // Replace image with new SVG
                $img.replaceWith($svg);
            }, 'xml');
        });
    }
};

const Toast = Swal.mixin({
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
    didOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    showCloseButton: true
});