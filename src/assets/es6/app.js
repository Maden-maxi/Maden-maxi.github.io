jQuery(document).ready(function($) {
	console.log(`jQuery ${$.version}`);
    $('.slider1').bxSlider({
        slideWidth: 397,
        minSlides: 1,
        maxSlides: 3,
        moveSlides: 1,
        startSlide: 0,
        slideMargin: 0
    });
});