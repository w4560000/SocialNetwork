﻿///** 暫無使用 */
////String.prototype.IsNullOrEmptyOrUndefined = function () {
////    return !this;
////}

const Common = {
    RemoveErrorInput: (e: any) => $(e).removeClass('input-error'),
    Popup: (containerID: string, func: void) => {
        var popBox = $('#' + containerID + '> .popBox')[0];
        var popLayer = $('#' + containerID + '> .popLayer')[0];
        popBox.style.display = popLayer.style.display = "block";

        if (func !== undefined)
            func
    },
    ClosePopup: (containerID: string, func: void) => {
        var popBox = $('#' + containerID + '> .popBox')[0];
        var popLayer = $('#' + containerID + '> .popLayer')[0];
        popBox.style.display = popLayer.style.display = "none";

        if (func !== undefined)
            func
    },
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
    DatepickerInit: () => {
        $("#datepicker").datepicker({
            changeMonth: true,
            changeYear: true,
            showMonthAfterYear: true,
            yearRange: '1950:2022',
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
    }
}