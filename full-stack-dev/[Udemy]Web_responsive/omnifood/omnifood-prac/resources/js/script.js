$(document).ready(function(){
    $('.js--section-features').waypoint(function(direction){
        if (direction == "down"){
            $("nav").addClass('sticky');
        }
        else {
            $("nav").removeClass('sticky');
        }
    },{
        offset: '20%'
    });

    $('.js--scroll-section-sign-up').click(function(){
        $("html, body").animate({scrollTop: $(".js--section-sign-up").offset().top}, 1000);
    });

    $('.js--scroll-section-contact').click(function(){
        $("html, body").animate({
            scrollTop: $(".js--section-contact").offset().top}, 1000)
    });


    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
            && 
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000, function() {
                // Callback after animation
                // Must change focus!
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) { // Checking if the target was focused
                return false;
                } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
                };
            });
            }
        }
    });

    /* Animation for each section */
    $('.js-row-wp1').waypoint(function(direction){
        $('.js-row-wp1').addClass("animated fadeIn");
    },{
        offset: '50%'
    })

    $('.js-row-wp2').waypoint(function(direction){
        $('.js-row-wp2').addClass("animated fadeInUp");
    },{
        offset: '50%'
    })

    $('.js-row-wp3').waypoint(function(direction){
        $('.js-row-wp3').addClass("animated fadeInRight");
    },{
        offset: '50%'
    })

    $('.js-row-wp4').waypoint(function(direction){
        $('.js-row-wp4').addClass("animated zoomIn");
    },{
        offset: '50%'
    })

    $('.js-row-wp5').waypoint(function(direction){
        $('.js-row-wp5').addClass("animated pulse");
    },{
        offset: '50%'
    })


    $('.js--nav-i-mb').click(function() {
        var nav = $('.js--main-nav');
        var icon = $('.js--nav-i-mb i');
        
        nav.slideToggle(200);
        if (icon.hasClass('ion-md-menu')){
            console.log("hh1");
            icon.removeClass('ion-md-menu');
            icon.addClass('ion-md-close');
        }
        else {
            icon.removeClass('ion-md-close');
            icon.addClass('ion-md-menu');
        }
    });

});