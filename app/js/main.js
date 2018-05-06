$(document).ready(function () {

	// mask
	$("input[name='phone']").mask("+7(999) 999-99-99");

  // modal
  $('.modal-js').fancybox({
    animationEffect : "zoom-in-out",
    slideClass : 'modal-close'
  });

  // modal img
  $("[data-fancybox]").fancybox({
    animationEffect : "zoom-in-out"
  });

  // slider
  $('.slider').slick({
    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"></button>',
    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"></button>',
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  // form
  $('.form').submit(function() { return false; });
  $('.submit-js').on('click', function() {

    let name = $(this).closest('.form').find('.input-name-js').val();
    let phone = $(this).closest('.form').find('.input-phone-js').val();
    let email = $(this).closest('.form').find('.input-email-js').val();
    let nameVal = name.length;
    let phoneVal = phone.length;
    let emailVal = email.length;

    if(phoneVal < 10) {
      $(this).closest('.form').find('.input-phone').addClass("error");
    }
    else if(phoneVal >= 10){
      $(this).closest('.form').find('.input-phone').removeClass("error");
    }

    if( phoneVal >= 10 ) {
      $.ajax({
        type: 'POST',
        url: 'sendFormModal.php',
        data: $(this).closest('.form').serialize(),
        success: function(data) {
          if(data == "true") {

            $.fancybox.close();

            $.fancybox.open({ 
                src: "#thank"
            });
            setTimeout("$.fancybox.close()", 5000);

            $('.input-name-js').val('');
            $('.input-phone-js').val('');
            $('.input-email-js').val('');
          }
        }
      });
    }
  });

});