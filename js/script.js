$(function(){
    workSliderInit();
    $(window).resize(function(){
        workSliderInit();
    });
    $('button.theme').on('click', function(){
        $('body').toggleClass('dark');
    });
    $('.nav-link[href^="#"]').on("click", function () {
        var id  = $(this).attr('href'),
        top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 700);
        return false;
    });
    $('.com-banner').on('click', function(){
        lignhtbox = window.lignhtbox || $('.lightbox');
        if (lignhtbox.length && window.innerWidth < 451) {
            lignhtbox.addClass('active').find('img').attr('src', $(this).attr('src'));
        }
    });
    $('.lightbox-closer').on('click', function(){
        lignhtbox = window.lignhtbox || $('.lightbox');
        if (lignhtbox.length) lignhtbox.removeClass('active');
    });
});
function workSliderInit() {
    var slider = $('.wrap-card-works');
    var widthInit = $('body').width() < 768;
    if (slider.hasClass('slick-slider') && !widthInit) {
        $('.wrap-card-works').slick('unslick');
    } else if (!slider.hasClass('slick-slider') && widthInit) {
        $('.wrap-card-works').slick({
            slidesToShow: 2,
            prevArrow: $('.slide-prev'),
            nextArrow: $('.slide-next'),
            responsive: [
                {
                  breakpoint: 450,
                  settings: {
                    slidesToShow: 1,
                }
            }]
        });
    }
}