$(function() {
    var $carousel = $('.main-carousel');

    $('.scrollsnap-next').on( 'click', function() {
        $carousel.flickity('next');
    });

    $("[data-scrollsnap]").click(function() {
        var index = $(this).data('scrollsnap');
        $carousel.flickity('select', index, false, false);
    });

    $('data.scrollsnap-next').on( 'click', function() {
        $carousel.flickity('next');
    });

    $carousel.on('ready.flickity', function( event, index ) {
        setTimeout(function() {
            var flick = $carousel.data('flickity');
            $(flick.selectedElement).find("[data-animation]").each(function () {
                $(this).addClass("animated " + $(this).data("animation"));
            });
        }, 10)
    });

    $carousel.on('change.flickity', function( event, index ) {
        var flick = $carousel.data('flickity');
        // $carousel.find("[data-animation]").each(function () {
        //     $(this).removeClass("animated");
        //     $(this).removeClass($(this).data("animation"));
        // });

        $(flick.selectedElement).find("[data-animation]").each(function () {
            $(this).addClass("animated " + $(this).data("animation"));
        });
    });

    $carousel.flickity({
        cellAlign: 'left',
        contain: true,
        pageDots: true,
        dragThreshold: 20,
        selectedAttraction: 0.2,
        friction: 0.8,
        watchCSS: false
    });

    $carousel.focus();
});