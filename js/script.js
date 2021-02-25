$(function(){
    $('button.theme').on('click', function(){
        $('body').toggleClass('dark');
        if ($('body').hasClass('dark')) {
            localStorage.setItem('site-theme', 'dark')
        } else {
            localStorage.removeItem('site-theme')
        }
    });
    $('.navbar_item a[href^="#"]').on("click", function () {
        window.linkScroll = true;
        $('.navbar_item a[href^="#"]').removeClass('active');
        var link = $(this);
        var top = $(link.attr('href')).offset().top;
        if (link.attr('href') != '#contacts') top -=  window.innerHeight * 0.3;
        $('html').animate({scrollTop: top}, 700);
        setTimeout(function(){window.linkScroll = false}, 750);
        link.addClass('active');
        return false;
    });
    $('.com-banner').on('click', function(){
        lignhtbox = window.lignhtbox || $('.lightbox');
        if (lignhtbox.length && window.innerWidth < 451) {
            lignhtbox.addClass('active').removeClass('hide').find('img').attr('src', $(this).attr('src'));
        }
    });
    $('.lightbox-closer').on('click', function(){
        lignhtbox = window.lignhtbox || $('.lightbox');
        if (lignhtbox.length) lignhtbox.removeClass('active').addClass('hide');
    });
    $(document.body).on('touchmove', onScroll);
    $(window).on('scroll', onScroll);

    modal = $('[data-remodal-id="modal"]').remodal();
    $(".works_card").on("click", function () {
        $(modal.$modal)
        .find('.modal_block')
        .removeClass('active')
        .filter('#modal-' + $(this).data('modalaction'))
        .addClass('active');
        modal.open();
    } );
    pageScrolled();
    $(document).on('opened', '.remodal', function () {
        var iframe = $(this).find('.modal_block.active iframe:not(.loaded)');
        if (iframe.length) iframe.attr('src', iframe.data('src')).addClas('loaded');
    });
});
function onScroll() {
    pageScrolled();
    sectionScrollactive();
    hederViewer();
}
function pageScrolled() {
    if ($(window).scrollTop() < 50) $('body').removeClass('page-scrolled');
    else $('body').addClass('page-scrolled');
}
function sectionScrollactive() { 
    if (window.linkScroll) return;
    sectionPos = window.sectionPos || { 
        links: $('.navbar_item a[href^="#"]'), 
        sections: $('section[id]') 
    } 
    var scrollTop = $(window).scrollTop(); 
    var posArr = []; 
    sectionPos.sections.each(function(){ 
        var section = $(this); 
        var topPos = section.offset().top; 
        topPos -= window.innerHeight * 0.3; 
        posArr.push({top: topPos, section: section}); 
    }); 
    sectionPos.links.removeClass('active'); 
    for (i = 0; i < posArr.length; i++) { 
        if (scrollTop >= posArr[i].top 
         && scrollTop <= (posArr[i+1] ? posArr[i+1].top : (posArr[i].top + posArr[i].section.height()))
        ) { 
            sectionPos.links.filter('[href="#'+ sectionPos.sections.eq(i).attr('id') +'"]').addClass('active'); 
        } 
    } 
}
function hederViewer(reqursive = false) { 
    if (window.innerWidth > 640) { /* stoper */ 
        if (typeof window.navbar !== 'undefined' && navbar.hide) { 
            navbar.el.removeClass('hide-navbar'); 
            navbar.hide = false; 
        } 
        return false; 
    } 
    if (typeof window.navbar === 'undefined') { 
        if (reqursive) return false; 
        navbar = { 
            el: $('header'), 
            hide: false, 
            changeVal: 15, 
            lastPos: $(window).scrollTop(), 
            scrollVal: 0 
        } 
        hederViewer(true); 
    } else {
        var top = $(window).scrollTop();
        var scrolled = top - navbar.lastPos; 
        navbar.lastPos = top;

        if (scrolled > 0 && navbar.scrollVal < 0 
         || scrolled < 0 && navbar.scrollVal > 0 
        ) navbar.scrollVal = 0; 
        
        navbar.scrollVal += scrolled; 

        if (navbar.scrollVal > navbar.changeVal && !navbar.hide 
         || navbar.scrollVal < -navbar.changeVal && navbar.hide
        ) { 
            navbar.el.toggleClass('hide-navbar'); 
            navbar.hide = !navbar.hide; 
        } 
    }  
}    