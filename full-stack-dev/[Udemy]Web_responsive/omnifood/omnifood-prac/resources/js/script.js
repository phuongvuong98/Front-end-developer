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

    // smooth scrolling on hash navigation
    $(this).click(function(event) {
        if ($('#animation').prop('checked')) {
          event.preventDefault();
          $('html, body').animate({scrollTop: $target.offset().top}, 1000, function() {
            location.hash = target;
            $target.focus();
            if ($target.is(":focus")) {
              return !1;
            } else {
              $target.attr('tabindex', '-1');
              $target.focus()
            }
          })
        }
      });
});