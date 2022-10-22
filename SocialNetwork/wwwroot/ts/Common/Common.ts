import { Enum, Request, Response } from "../Common/CommonInferface.js";
//import Swal from '../../lib/sweetalert2/dist/sweetalert2.js';

const Common = {
    /**
     * 驗證上傳圖檔的附檔名
     * @param fileName 上傳圖檔
     */
    ValidateUploadPhotoExtension: (file: File) => /\.(jpg|jpeg|png|webp|svg|gif)$/.test(file.name),

    /**
     * 驗證上傳圖檔的大小 (限制 5 MB)
     * @param fileName 上傳圖檔
     */
    ValidateUploadPhotoSize: (file: File) => file.size <= 5 * 1024 * 1024,

    /**
     * 刪除錯誤輸入框提示
     * @param e element
     */
    RemoveErrorInput: (e: any) => $(e).removeClass('input-error'),

    /**
     * 彈窗
     * @param containerID containerID
     * @param func func
     */
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
     * @param res 共用回應 ViewModel
     * @param confirmFunc 確認Func
     */
    SweetAlertSuccess: <Res>(res: Response.ResponseViewModel<Res>, confirmFunc?: Function) => {
        if (confirmFunc != null) {
            Swal.fire({
                icon: 'success',
                text: res.Message,
                confirmButtonText: '確認',
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    confirmFunc(res);
                }
            })
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
    SweetAlertError: <Res>(res: Response.ResponseViewModel<Res>, confirmFunc?: Function) => {
        if (confirmFunc != null) {
            Swal.fire({
                icon: 'error',
                text: res.Message,
                confirmButtonText: '確認',
                allowOutsideClick: false,
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
    SweetAlertErrorMsg: (msg: string | undefined, confirmFunc?: Function) => {
        if (confirmFunc != null) {
            Swal.fire({
                icon: 'error',
                text: msg,
                confirmButtonText: '確認',
                allowOutsideClick: false,
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
            allowOutsideClick: false,
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

    /**
     * SweetAlert 確認彈窗
     * @param title 標題
     * @param confirmFunc 確認Func
     */
    SweetAlertConfirm: (title: string | undefined, confirmFunc: Function, failConfirmFunc?: Function, cancelButtonText: string = '取消') => {
        Swal.fire({
            title: title,
            showCancelButton: true,
            confirmButtonText: '確定',
            cancelButtonText: cancelButtonText,
            reverseButtons: true
        }).then((result) => {
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
    SweetAlertNotification: (IsSuccess: boolean, title: string | undefined) => {
        Toast.fire({
            icon: IsSuccess ? 'success' : 'error', title: title
        });
    },

    /**
     * 頁面註冊 Datepicker
     * @param e HTMLElement
     * @param onSelectFunc SeleteFunc
     */
    DatepickerInit: (e: JQuery<HTMLElement>, onSelectFunc: ((dateText: string, inst: any) => void)) => {
        e.datepicker({
            changeMonth: true,
            changeYear: true,
            showMonthAfterYear: true,
            yearRange: '1950:2022',
            dateFormat: 'yy-mm-dd',
            onSelect: onSelectFunc
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
     * 會員資料公開或隱藏
     * @param e HTMLImageElement
     */
    InfoIconToggle: (e: HTMLImageElement) => {
        let hideImage = "/images/InfoHide.png";
        let publicImage = "/images/InfoPublic.png";
        e.src = e.src.includes(publicImage) ? hideImage : publicImage;
    },

    /**
     * 判斷傳入的enum值是否包含特定的列舉項目(僅供enum flag使用)
     * @param {object} targetEnum 欲判定的列舉flags欄位
     * @param {object} checkEnum 特定的列舉項目
     * @return {boolean} true: 有包含特定的列舉項目 / false: 無包含特定列舉項目
     */
    HasFlag(targetEnum: number, checkEnum) {
        const result = (targetEnum & checkEnum) === checkEnum;
        return result;
    },

    /**
     * 控制 Img Default Style
     * */
    ControllImgDefaultStyle: () => {
        $('img').each(function () {
            if ($(this).attr('src') !== undefined && ($(this).attr('src') as string).includes('default_profilePhoto'))
                $(this).addClass('index_profilePhotoDefault');
            else
                $(this).removeClass('index_profilePhotoDefault');
        });
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
            var imgClick = $img.attr('onclick');

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

                if (typeof imgClick !== 'undefined') {
                    $svg = $svg.attr('onclick', imgClick);
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

/** SweetAlert 快顯 */
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

export { Common, Toast };