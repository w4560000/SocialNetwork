$(async function () {

    // 輸入框 高度自動伸縮
    $('.write_post, .msgComment').on("input", function () {
        let _this = $(this);
        var currentVal = _this.val() as string;

        _this.height('auto');
        _this.height(_this.prop('scrollHeight') + 'px');
    });

    let successFunc = () => { };
    let errorFunc = () => { };

    // 取得當前會員資訊
    var memberInfo = await GetCurrentMemberInfoAPI(successFunc, errorFunc);
    var memberBrithday = new Date(memberInfo.Brithday);
    var brithday = `${memberBrithday.getFullYear()} 年 ${memberBrithday.getMonth() + 1} 月 ${memberBrithday.getDate()} 日`;
    $('.profile_detail_brithday').html(brithday);
    $('.profile_detail_job').html(memberInfo.Job);
    $('.profile_detail_internest').html(memberInfo.Interest);
    $('.profile_detail_education').html(memberInfo.Education);
    $('.profile_background').attr('src', memberInfo.BackgroundPhotoURL);

}); 