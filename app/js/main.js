$(document).ready(function () {

	// mask
	$("input[name='phone']").mask("+7(999) 999-99-99");

    // modal
    $('.modalbox').fancybox({
        animationEffect : "zoom-in-out",
        slideClass : 'modal-close'
    });

    // modal img
    $("[data-fancybox]").fancybox({
        animationEffect : "zoom-in-out"
    });


    $('.slider').slick({
        prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"></button>',
        nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"></button>',
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1440,
              settings: {
                slidesToShow: 3,
                infinite: true,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            }
          ]
    });

    // form modal
    $('.modal-form').submit(function() { return false; });
    $('.modal-form__submit').on('click', function() {

        var name = $(this).closest('.modal-form').find('.input-name').val();
        var phone = $(this).closest('.modal-form').find('.input-phone').val();
        var email = $(this).closest('.modal-form').find('.input-email').val();

        var nameVal = name.length;
        var phoneVal = phone.length;
        var emailVal = email.length;

        if(phoneVal < 10) {
            $(this).closest('.modal-form').find('.input-phone').addClass("error");
        }
        else if(phoneVal >= 10){
            $(this).closest('.modal-form').find('.input-phone').removeClass("error");
        }

        if( phoneVal >= 10 ) {
            $.ajax({
                type: 'POST',
                url: 'sendFormModal.php',
                data: $(this).closest('.modal-form').serialize(),
                success: function(data) {
                    if(data == "true") {

                        $.fancybox.close();

                        $.fancybox.open({ 
                            src: "#thank"
                        });

                        setTimeout("$.fancybox.close()", 5000);

                        $('.input-name').val('');
                        $('.input-phone').val('');
                        $('.input-email').val('');

                    }
                }
            });
        }
    });

});