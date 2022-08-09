$(function () {
    $('.post_content').click(function () {
        $(this).hide();
        $('#post_content_detail').removeClass('post_content_detail_hide');
        $('#post_content_detail').addClass('post_content_detail');

        $('.write_post').focus();
    });

    $('.write_post').on("change keyup paste", function () {
        let _this = $(this);
        var currentVal = _this.val() as string;

        _this.height(_this.prop('scrollHeight'));
    });
});