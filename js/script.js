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
        $('html').toggleClass('navigation-open');
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

    var frame = $('.home-advices-slider');

    if (frame.length) {
        frame.each(function(index, el) {
            var _frame = $(this);
            var frameWrap = _frame.parent();
            _frame.sly({
                horizontal: true,
                itemNav: 'basic',
                scrollBar: frameWrap.find('.scrollbar'),
                scrollBy: 1,
                dragHandle: true,
                dynamicHandle: true,
                releaseSwing: true,
                startAt: 0,
                speed: 500,
                mouseDragging: true,
                touchDragging: true,
                elasticBounds: true
            });
        });
    }

    function scrollbarHandle() {
        $('.scrollbar').each(function(index, el) {
            var _this = $(this);
            var thisWidth = _this.innerWidth();
            var thisHandleWidth = _this.find('.handle').innerWidth();
            if ( thisWidth == thisHandleWidth || thisHandleWidth == 0 ) {
                _this.hide();
            } else {
                _this.show();
            }
        });
    }

    scrollbarHandle();

    $(window).resize(function() {
        if (frame.length) {
            frame.sly('reload');
            scrollbarHandle();
        }
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

    $(document).on('mouseenter', 'a', function(event) {
        var thisLink = $(this);
        setTimeout(function(){
            thisLink.addClass('link-hovered');
        }, 150);
    }).on('mouseleave', 'a', function(event) {
        var thisLink = $(this);
        setTimeout(function(){
            thisLink.removeClass('link-hovered');
        }, 150);
    });

    //------------------------------------------------------------------------//

    //scroll link
    $('a.scroll-link, .advice-list a').click(function() {
        var scrollOffset = 0;
        if ( $(this).parents('.advice-list').length ) {
            scrollOffset = 20;
        }
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - scrollOffset
                }, 400);
                return false;
            }
        }
    });

    //------------------------------------------------------------------------//

    //phone mask
    $('.phone-mask').mask('+7 (999) 999 99 99');

    //------------------------------------------------------------------------//

    //jScrollPane
    var scrollPane = function() {
        var pane = $('.scroll-pane');
        pane.jScrollPane(
            {
                showArrows: false,
                autoReinitialise: true,
                animateScroll: true,
                animateDuration: 1000
            }
        );
    }
    scrollPane();

    var scrollPaneResponsive = function() {
        var mainWidth = $('.main').innerWidth();
        if ( mainWidth < 1235 && $('.scroll-pane-responsive').length ) {
            $('.scroll-pane-responsive').jScrollPane({showArrows: false, autoReinitialise: true, animateScroll: true, animateDuration: 1000}).data('jsp').destroy();
        } else {
            $('.scroll-pane-responsive').jScrollPane({showArrows: false, autoReinitialise: true, animateScroll: true, animateDuration: 1000}).data('jsp').reinitialise();
        }
    }
    if ($('.scroll-pane-responsive').length) {
        scrollPaneResponsive();
    }

    $('.scroll-pane-responsive').waypoint(function(direction) {
        setTimeout(function(){
            $('.scroll-pane-responsive').data('jsp').scrollTo(150);
        }, 800);
    }, {
      offset: '80%'
    });

    var scrollPaneResize = function() {
        if ($('.scroll-pane').length) {
            $('.scroll-pane').each(function(index, el) {
                $(this).jScrollPane({showArrows: false, autoReinitialise: true, animateScroll: true, animateDuration: 1000}).data('jsp').destroy();
                $('.scroll-pane').jScrollPane({showArrows: false, autoReinitialise: true, animateScroll: true, animateDuration: 1000}).data('jsp').reinitialise();
            });
        }
    }
    $(window).resize(function(){
        scrollPane();
        scrollPaneResize();
        if ($('.scroll-pane-responsive').length) {
            scrollPaneResponsive();
        }
    });

    //------------------------------------------------------------------------//

    //drop
    activePop = null;
    dropClass = $('.drop');
    function closeInactivePop() {
        dropClass.each(function (i) {
            if ($(this).hasClass('active') && i!=activePop) {
                $(this).removeClass('active');
            }
        });
        return false;
    }
    dropClass.mouseover(function() {
        activePop = dropClass.index(this);
    });
    dropClass.mouseout(function() {
        activePop = null;
    });
    $(document).on('click', function(event) {
        closeInactivePop();
    });
    $('.drop-toggle').on('click', function(event) {
        event.preventDefault();
        $(this).parent(dropClass).toggleClass('active');
        scrollPaneResize();
    });

    $('.services-order-step-city-list a').on('click', function(event) {
        event.preventDefault();
        var thisText = $(this).text();
        $('.services-order-step-city-toggle-text').text(thisText);
        activePop = null;
        closeInactivePop();
    });

    //------------------------------------------------------------------------//

    $('.services-order-step-1-next .button').on('click', function(event) {
        event.preventDefault();
        $('.services-order-step-1').fadeOut(100);
        $('.services-order-step-2').fadeIn(100);
        $('.services-order-title-info > span ').text('2');
    });
    $('.services-order-step-2-back .button').on('click', function(event) {
        event.preventDefault();
        $('.services-order-step-2').fadeOut(100);
        $('.services-order-step-1').fadeIn(100);
        $('.services-order-title-info > span ').text('1');
    });

    //------------------------------------------------------------------------//

    $('.services-package-toggle').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        var thisParent = $(this).parents('.services-package');
        thisParent.find('.services-package-options').toggleClass('open');
    });

    //------------------------------------------------------------------------//

    //centerModal
    function centerModal() {
        var modalName = $('.modal-center');
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        modalName.each(function() {
            var modalOuterWidth = $(this).outerWidth();
            var modalOuterHeight = $(this).outerHeight();
            $(this).css({
                margin: 0
            });
            if (windowHeight > modalOuterHeight) {
                $(this).css({
                    top: (windowHeight - modalOuterHeight) /2
                });
            } else {
               $(this).css({
                    top: 0
                });
            }
            if (windowWidth > modalOuterWidth) {
                $(this).css({
                    left: (windowWidth - modalOuterWidth) /2
                });
            } else {
               $(this).css({
                    left: 0
                });
            }
        });
    }
    $('[data-toggle="modal"]').on('click', function() {
        centerModal();
    });
    $(window).resize(function(){
        centerModal();
    });
    centerModal();

    //------------------------------------------------------------------------//

    $('.package-include-show-button').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $('.package-include-list-wrapper').find('.extra-hidden').toggleClass('hidden');
        $('.package-include-list-js').toggleClass('package-include-list-second');
    });

    //------------------------------------------------------------------------//

    $('.article-popular-clone').html($('.article-popular').clone());

    function articleSidebar() {

        var sidebarArticle = $('.article-sidebar .article-popular');
        var contentOffset = $('.article-content').offset().top;

        var contentOffsetImg;
        var contentImg = $('.article-content .first');
        if ( contentImg.length ) {
            contentOffsetImg = contentImg.offset().top;
        } else {
            contentOffsetImg = contentOffset;
        }
        sidebarArticle.css({'padding-top': contentOffsetImg - contentOffset});
    };
    articleSidebar();

    $(window).resize(function() {
        articleSidebar();
    });

    //------------------------------------------------------------------------//

    $('.input-text-number').keypress(function(event){
      event = event || window.event;
      if (event.charCode && event.charCode!=0 && event.charCode!=46 && (event.charCode < 48 || event.charCode > 57) )
        return false;
    });

    //------------------------------------------------------------------------//

    //services order form
    $('#services-order-form').validate({
        ignore: ".ignore",
        rules: {
            numberINN: {
                number: true,
                minlength: 11
            }
        },
        messages: {
            numberINN: {
                number: "Введите только цифры",
                minlength: "ИНН слишком короткий"
            }
        }
    });

    //------------------------------------------------------------------------//

});//document ready

//*********************************************************************//

$(window).load(function() {

    //load

    //article
    $('.article-content > *').addClass('animationFadeInUp');

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

    //------------------------------------------------------------------------//

    //matchHeight
    $('.item-match-height').matchHeight();

    //------------------------------------------------------------------------//

    //sticky
    function stickyBottom(){

        if ( $('.sticky-wrapper').length ) {
            $('.sticky').unstick();
        }

        $('.sticky').sticky({
            topSpacing: 20,
            bottomSpacing: $('.home-advices').innerHeight() + $('.footer-global').innerHeight() + 70
        });

    }
    stickyBottom();
    $(window).resize(function() {
        stickyBottom();
    });

    //------------------------------------------------------------------------//

});//window load

//*********************************************************************//

$(window).resize(function() {

    //resize

});//window resize