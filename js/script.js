$(document).ready(function(){

    //ready

    //nojs
    $('body').removeClass('no-js');

    //------------------------------------------------------------------------//

    //fakelink
    $('a[href="#"]').on('click', function(event) {
        event.preventDefault();
    });

    //------------------------------------------------------------------------//

    //placeholder
    $('input[placeholder], textarea[placeholder]').placeholder();

    //------------------------------------------------------------------------//

    //navigation
    $('.navigation-toggle').on('click', function(event) {
        event.preventDefault();
        $('body').toggleClass('navigation-open');
        var navFooter = $('.navigation-footer').innerHeight();
        $('.full-screen').fullScreen({
            minus: navFooter,
            minOnly: true
        });
    });

    //------------------------------------------------------------------------//

    //home slider
    $('.home-slider').slick({
        dots: true,
        arrows: false,
        draggable: true,
        infinite: true,
        centerMode: false,
        centerPadding: '0px',
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 500,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        slide: '.home-slide',
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true
    });

    //------------------------------------------------------------------------//

    //home advices slider
    var options = {
        horizontal: true,
        itemNav: 'basic',
        dragSource: '.home-advices-slider',
        scrollBar: '.scrollbar',
        scrollBy: 1,
        dragHandle: true,
        dynamicHandle: true,
        releaseSwing: true,
        startAt: 0,
        speed: 500,
        mouseDragging: true,
        touchDragging: true,
        elasticBounds: true
    };
    var sly = new Sly($('.home-advices-slider'), options).init();
    $(window).resize(function() {
        sly.reload();
    });

    //------------------------------------------------------------------------//

    var menuIsActive = false;
    $('.menu-toggle').on('click', function(event) {
        event.preventDefault();

        if ( !menuIsActive ) {
            menuIsActive = true;
            $(this).parents('li').siblings('li').find('.menu-toggle').removeClass('active');
            $(this).toggleClass('active');
            var toggleHash = $(this).prop('href');
            toggleHash = toggleHash.substring(toggleHash.indexOf('#')+1);

            $('[data-panel='+toggleHash+']').siblings('.header-submenu-panel').removeClass('panel-open').slideUp(150);
            $('[data-panel='+toggleHash+']').slideToggle(300, function() {
                $(this).toggleClass('panel-open');
                menuIsActive = false;
            });
        }

    });

    //------------------------------------------------------------------------//

    //header-search
    $('.header-search-toggle').on('click', function(event) {
        event.preventDefault();
        $('.header-search-panel').fadeIn(200);
    });
    $('.header-search-close').on('click', function(event) {
        event.preventDefault();
        $('.header-search-panel').fadeOut(200);
    });

    //------------------------------------------------------------------------//

    //navigation menu toggle
    $('.navigation-menu-toggle').on('click', function(event) {
        event.preventDefault();
        $(this).parents('li').siblings('li').find('.navigation-menu-toggle').removeClass('active');
        $(this).parents('li').siblings('li').find('.navigation-submenu').removeClass('open');
        $(this).toggleClass('active');
        $(this).next('.navigation-submenu').toggleClass('open');
    });

    //------------------------------------------------------------------------//

});//document ready

//*********************************************************************//

$(window).load(function() {

    //load

    //animation
    $('.animationFadeInUp').waypoint(function(direction) {
        if ( !$(this.element).hasClass('animated') ) {
            $(this.element).addClass('animated fadeInUp visibility-visible');
        }
    }, {
      offset: '80%'
    });
    //animation
    $('.animationFadeInDown').waypoint(function(direction) {
        if ( !$(this.element).hasClass('animated') ) {
            $(this.element).addClass('animated fadeInDown visibility-visible');
        }
    }, {
      offset: '80%'
    });
    //animation
    $('.animationFadeIn').waypoint(function(direction) {
        if ( !$(this.element).hasClass('animated') ) {
            $(this.element).addClass('animated fadeIn visibility-visible');
        }
    }, {
      offset: '80%'
    });

});//window load

//*********************************************************************//

$(window).resize(function() {

    //resize

});//window resize