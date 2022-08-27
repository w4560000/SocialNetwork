$(async function () {
    // 日期選擇元件
    Common.DatepickerInit(
        $('#brithday_datepicker'),
        (dateText: string, inst: any) => {
            let date = `${inst.selectedYear} 年 ${inst.selectedMonth + 1} 月 ${inst.selectedDay} 日`
            $("#infoBrithday").val(date);
        });

    let successFunc = () => { };
    let errorFunc = () => { };

    // 取得當前會員資訊
    var memberInfo = await GetCurrentMemberInfoAPI(successFunc, errorFunc);

    // 初始化 會員公開資訊
    $('.InfoIcon').each(function () {
        var memberPublicInfoFlag = Number($(this).attr('memberpublicinfoflag'));
        var src = Common.HasFlag(memberInfo.InfoStatus, memberPublicInfoFlag) ? "/images/InfoPublic.png" : "/images/InfoHide.png"
        $(this).attr("src", src);
    });

    $('#brithday_datepicker').datepicker('setDate', memberInfo.Brithday);
    $('.ui-datepicker-current-day').click();
    $('#infoInternest').val(memberInfo.Interest);
    $('#infoJob').val(memberInfo.Job);
    $('#infoEducation').val(memberInfo.Education);

    // 非原生帳號 隱藏變更密碼版面
    if (user.IsOriginalMember === false) {
        $('.div_save_topBar').remove();
        $('.div_password_change').remove();
    }
}); 

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