$(function(){
    workSliderInit();
    $(window).resize(function(){
        workSliderInit();
    });
    $('button.theme').on('click', function(){
        $('body').toggleClass('dark');
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
