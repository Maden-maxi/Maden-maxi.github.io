(function() {

    window.inputNumber = function(el) {

        let min = el.attr('min') || false;
        let max = el.attr('max') || false;

        let els = {};

        els.dec = el.prev();
        els.inc = el.next();
        els.reset = el.siblings('.input-number-reset');
        els.reset.on('click', function (event) {
           el.val(1);
        });

        el.each(function() {
            init($(this));
        });

        function init(el) {

            els.dec.on('click', decrement);
            els.inc.on('click', increment);

            function decrement() {
                let value = el[0].value;
                value--;
                if(!min || value >= min) {
                    el[0].value = value;
                }
            }

            function increment() {
                let value = el[0].value;
                value++;
                if(!max || value <= max) {
                    el[0].value = value++;
                }
            }
        }
    }
})();

jQuery(document).ready(function($) {

	//carousels
    $('.slider1').bxSlider({
        slideWidth: 397,
        minSlides: 1,
        maxSlides: 3,
        moveSlides: 1,
        startSlide: 0,
        slideMargin: 0
    });

    //modals
    let modalProduct = $('.product-modal');
    let ratingProduct = $("input.product-rating");
    let ratingComment = $("input.rating-comment");
    let ratingStatic = $("input.rating-static");


    ratingComment.on('change',function () {
       $(this).siblings('.badge').text($(this).val());
    });

    modalProduct.on('show.bs.modal', function (event) {
        let button = $(event.relatedTarget); // Button that triggered the modal
        let productID = button.data('product-id'); // Extract info from data-* attributes

        let modal = $(this);

        $.get('assets/dummy-data/product-id-'+productID+'.json', function (response) {
            ratingProduct.attr('value', response.rating);
            ratingStatic.attr('value', response.rating);
            modal.find('.badge').text(response.rating);

            modal.find('.product-price').html(response.price);

            modal.find('.product-modal-thumbnail').attr({
                src: response.thumbnail,
                alt: response.title
            });

            modal.find('.product-art').text(response.art);

            modal.find('.product-name').text(response.title);

            let colorsMarkup = '<div class="product-color" style="background-image: url('+response.thumbnail+')" data-toggle="tooltip" data-placement="top" title="'+response.title+'" data-color="'+response.thumbnail+'"></div>';
            $.each(response.colors, function (index, value) {
                colorsMarkup += '<div class="product-color" style="background-image: url('+value.img+')" data-toggle="tooltip" data-placement="top" title="'+value.title+'" data-color="'+value.img+'"></div>';
            });

            ratingStatic.rating({
                fractions: 2
            });

            ratingComment.rating({
                fractions: 2
            });


            setTimeout(
                function () {
                    ratingProduct.rating({
                        fractions: 2
                    });
                }, 300
            );

            modal.find('.product-colors').html(colorsMarkup);
            $('[data-toggle="tooltip"]').tooltip();
            modal.find('.product-description').html(response.description);

            console.log(response);
        });

    });

    modalProduct.on('click', '.product-leave-review',function (event) {
        $('.review-form').fadeToggle(400);
    });

    modalProduct.on('click', '.product-color', function (event) {
        let $this = $(this);
        let modal = $this.closest('.product-modal');
        modal.find('.product-modal-thumbnail').attr({
            src: $this.data('color'),
            alt: $this.attr('title')
        });
    });

    //input counter
    inputNumber($('.input-number'));

    //dorpdown select
    $('.order-info-color-picker').on('click', 'ul.dropdown-menu li a', function (event) {
        event.preventDefault();
        let $this = $(this);
        let colorPicker = $this.closest('.order-info-color-picker');
        let selectedColor = colorPicker.find('.order-info-color-picker-color');
        selectedColor.html($this.html());
        colorPicker.find('[type="hidden"]').val($this.data('value'));
    });


    //material show more
    $('.material').on('click', '.material-show-more', function (event) {
        event.preventDefault();
        let $this = $(this);
        let material = $this.closest('.material');
        $this.toggleClass('expanded');
        material.find('.material-block-more').slideToggle({
            always: function () {
                if($this.hasClass('expanded')) {
                    $this.text('Свернуть');

                    setTimeout(function () {
                        let footerMenu = material.find('.material-block-more').offset().top;
                        $('html, body').animate( {scrollTop: footerMenu }, 1000 );
                    }, 200);
                }else{
                    $this.text('Подробнее');
                }
            }
        });
    });

    $('#review-video').on({
        'show.bs.modal': function (event) {
            let modal = $(this);
            let button = $(event.relatedTarget); // Button that triggered the modal
            let embed = button.data('embed'); // Extract info from data-* attributes
            modal.find('iframe').attr({
                src: embed + '?autoplay=1'
            });
        },
        'hide.bs.modal': function () {
            $(this).find('iframe').attr('src', '');
        }
    });

    //footer
    $('.footer-dropdown-menu').on('click', function (event) {
       let $this = $(this);
       if($this.hasClass('collapsed')){
           setTimeout(function () {
               let footerMenu = $('#nav-site-footer').offset().top;
               $('html, body').animate( {scrollTop: footerMenu }, 1000 );
           }, 200);
       }
    });

});