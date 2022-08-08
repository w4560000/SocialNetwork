$(function () {
    //$('.post_content_detail').hide();
    $('.post_content').click(function () {
        debugger
        $(this).hide();
        $('#post_content_detail').removeClass('post_content_detail_hide');
        $('#post_content_detail').addClass('post_content_detail');
    //    $('.post_content_detail').show();
    });
});