$(function () {
    // 輸入框 高度自動伸縮
    $('.write_post, .msgComment').on("input", function () {
        var _this = $(this);
        var currentVal = _this.val();
        _this.height('auto');
        _this.height(_this.prop('scrollHeight') + 'px');
    });
});
