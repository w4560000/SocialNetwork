$(function () {
    $('.post_content').click(function () {
        $(this).hide();
        $('#post_content_detail').removeClass('post_content_detail_hide');
        $('#post_content_detail').addClass('post_content_detail');

        $('.write_post').focus();
    });

    $('.write_post, .msgComment').on("input", function () {
        let _this = $(this);
        var currentVal = _this.val() as string;

        _this.height('auto');
        _this.height(_this.prop('scrollHeight') + 'px');
    });
});