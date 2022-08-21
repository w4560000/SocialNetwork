$(async function () {
    // 日期選擇元件
    Common.DatepickerInit(
        $('#brithday_datepicker'),
        (dateText: string, inst: any) => {
            debugger
            let date = `${inst.selectedYear} 年 ${inst.selectedMonth + 1} 月 ${inst.selectedDay} 日`
            $("#infoBrithday").val(date);
        });

    let successFunc = () => { };
    let errorFunc = () => { };

    var memberInfo = await GetMemberInfoAPI(5, successFunc, errorFunc);

    console.log(memberInfo.Brithday)

    $('#brithday_datepicker').datepicker('setDate', new Date(memberInfo.Brithday));
    $('.ui-datepicker-current-day').click();
}); 