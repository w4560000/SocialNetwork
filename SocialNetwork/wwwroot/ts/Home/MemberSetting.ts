var tempBackgroundFile: File;
var tempProfilePhotoFile: File;

$(async function () {
    // 日期選擇元件
    Common.DatepickerInit(
        $('#brithday_datepicker'),
        (dateText: string, inst: any) => {
            let date = `${inst.selectedYear} 年 ${inst.selectedMonth + 1} 月 ${inst.selectedDay} 日`
            $("#infoBrithday").val(date);
        });

    // 取得當前會員資訊
    var memberInfo = await GetCurrentMemberInfoAPI();

    // 載入 會員資訊
    $('.profile_background').attr('src', memberInfo.BackgroundPhotoURL);

    $('.InfoIcon').each(function () {
        var memberPublicInfoFlag = Number($(this).attr('memberpublicinfoflag'));
        var src = Common.HasFlag(memberInfo.InfoStatus, memberPublicInfoFlag) ? "/images/InfoPublic.png" : "/images/InfoHide.png"
        $(this).attr("src", src);
    });

    $('#brithday_datepicker').datepicker('setDate', new Date(memberInfo.Brithday));
    $('.ui-datepicker-current-day').click();
    $('#infoInternest').val(memberInfo.Interest);
    $('#infoJob').val(memberInfo.Job);
    $('#infoEducation').val(memberInfo.Education);
    $('.profile_changeName').val(user.NickName);

    // 非原生帳號 隱藏變更密碼版面
    if (user.IsOriginalMember === false) {
        $('#div_password_change_bar').remove();
        $('.div_password_change').remove();
    }

    Common.ControllSVG();
});

/**
 * 更換主頁背景、頭像預覽
 * @param e HTMLInputElement
 */
function UploadProfile_Change(e: HTMLInputElement) {
    if (e.files) {
        let isUploadBackground = e.id == 'profile_changeBackground';
        let errorMsgTitle = isUploadBackground ? '主頁背景' : '頭像';
        var fileList = Array.from(e.files);

        if (fileList.length > 1) {
            e.files = null;
            Common.SweetAlertErrorMsg(`${errorMsgTitle}無法上傳多筆`);
            return;
        }

        if (fileList.every(e => Common.ValidateUploadPhotoExtension(e)) === false) {
            e.files = null;
            Common.SweetAlertErrorMsg(`${errorMsgTitle}僅限上傳 .jpg、.jpeg、.png、.webp、.svg、.gif`);
            return;
        }

        if (fileList.every(e => Common.ValidateUploadPhotoSize(e) === false)) {
            e.files = null;
            Common.SweetAlertErrorMsg(`${errorMsgTitle}圖片大小不得超過 5 MB`);
            return;
        }

        // 預覽主頁背景
        if (isUploadBackground === true) {
            $('.profile_background').prop('src', URL.createObjectURL(fileList[0]));
            tempBackgroundFile = fileList[0];
        }
        // 預覽頭像
        else {
            $('.profile_photo').prop('src', URL.createObjectURL(fileList[0]));
            tempProfilePhotoFile = fileList[0];
        }

        // 控制 Img Default Style
        Common.ControllImgDefaultStyle();
    }
}

/**
 * 修改名稱
 * */
function ChangeName_Click() {
    $('.profile_changeName').val(user.NickName);

    $('.profile_OldName').hide();
    $('.profile_changeName_container').hide();
    $('.profile_changeName').show();
    $('.profile_changeName_cancel').show();

    $('.profile_changeName').focus();
}

/**
 * 取消修改名稱
 * */
function ChangeName_Cancel() {
    $('.profile_OldName').show();
    $('.profile_changeName_container').show();
    $('.profile_changeName').hide();
    $('.profile_changeName_cancel').hide();
    $('.profile_changeName').val(user.NickName);
}

/**
 * 更新個人資訊
 * 會員主頁背景、頭像、公開資訊
 * */
function UpdateMemberInfo() {
    let infoStatus = 0;

    $('.InfoIcon').each(function (i) {
        if ((<HTMLImageElement>this).src.includes('InfoPublic')) {
            infoStatus += Number($(this).attr('memberpublicinfoflag'));
        }
    });

    if (!$('#brithday_datepicker').val()) {
        Common.SweetAlertErrorMsg('請選擇生日');
        return;
    }
    var formData = new FormData();
    formData.append('NickName', $('.profile_changeName').val() as string);
    formData.append('BackgroundPhoto', tempBackgroundFile);
    formData.append('ProfilePhoto', tempProfilePhotoFile);
    formData.append('Brithday', $('#brithday_datepicker').val() as string);
    formData.append('Interest', $('#infoInternest').val() as string);
    formData.append('Job', $('#infoJob').val() as string);
    formData.append('Education', $('#infoEducation').val() as string);
    formData.append('InfoStatus', infoStatus.toString());

    var successFunc = (res: ResponseViewModel<object>) => {
        if (res.Status == ResponseStatusEnum.Success) {
            // 更新左側 Menu 頭像
            if (tempProfilePhotoFile !== undefined)
                $('.index_profilePhoto').attr('src', URL.createObjectURL(tempProfilePhotoFile));

            if ($('.profile_OldName').is(":hidden")) {
                $('.profile_OldName').show();
                $('.profile_changeName_container').show();
                $('.profile_changeName').hide();
                $('.profile_changeName_cancel').hide();
                $('.profile_OldName').html($('.profile_changeName').val() as string);
                $('.index_nickName').html($('.profile_changeName').val() as string);
            }
        }
    };
    var errorFunc = () => { };
    UpdateMemberInfoAPI("更新個人資訊中", formData, successFunc, errorFunc, '確定是否更新?');
}

/** 變更密碼 */
function ChangePassword() {
    let errorMsg = {
        oldPassword: '請輸入舊密碼',
        newPassword: '請輸入新密碼',
        newPasswordCheck: '請輸入新密碼確認'
    };

    let error = Common.Validate(errorMsg);

    if (error) {
        Common.SweetAlertErrorMsg(error);
        return;
    }

    let model = new ChangePasswordReqViewModel(
        $('#oldPassword').val() as string,
        $('#newPassword').val() as string,
        $('#newPasswordCheck').val() as string);

    let successFunc = () => {
        $('#oldPassword').val('');
        $('#newPassword').val('');
        $('#newPasswordCheck').val('');
    };
    let errorFunc = () => { };
    ChangePasswordAPI("變更密碼中", model, successFunc, errorFunc, "確定是否執行變更密碼?");
}