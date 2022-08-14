$(function () {
    // 顯示發佈貼文區塊
    $('.post_content').click(function () {
        $(this).hide();
        $('#post_content_detail').removeClass('post_content_detail_hide');
        $('#post_content_detail').addClass('post_content_detail');

        $('.write_post').focus();
    });

    // 取消發佈貼文
    $('#deploy_post_cancel').click(function () {
        $('.post_content').show();
        $('#post_content_detail').removeClass('post_content_detail');
        $('#post_content_detail').addClass('post_content_detail_hide');
    });

    // 輸入框 高度自動伸縮
    $('.write_post, .msgComment').on("input", function () {
        let _this = $(this);
        var currentVal = _this.val() as string;

        _this.height('auto');
        _this.height(_this.prop('scrollHeight') + 'px');
    });
}); 