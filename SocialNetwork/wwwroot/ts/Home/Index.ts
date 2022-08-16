$(function () {

    // 輸入框 高度自動伸縮
    $('.write_post, .msgComment').on("input", function () {
        let _this = $(this);
        var currentVal = _this.val() as string;

        _this.height('auto');
        _this.height(_this.prop('scrollHeight') + 'px');
    });
}); 