$(function() {
    var URL = "https://api.sherpamarketing.co.uk/v1/send";

    function serialize(form) {
        var data = form.serializeArray();
        var result = {};
        $.map(data, function (o) {
            result[o['name']] = o['value'];
        });
        return result;
    }

    function toggleDimmer($form) {
        $form.closest( ".dimmer" ).toggleClass(
            'active',
            !window.localStorageSafe.getItem($form.data('store-key')));
    }

    $('.access-form').each(function() {
        var $form = $(this);

        $form.submit(function (event) {
            event.preventDefault();
            var data = serialize($form);

            if ($form.data('store-key')) {
                window.localStorageSafe.setItem($form.data('store-key'), JSON.stringify(data));
                $('.main-carousel').flickity( 'select', 1, false, true );
                $(window).trigger( "storage" );
            }

            data.cuid = window.localStorageSafe.getItem('cuid');
            $.ajax({
                type: 'POST',
                url: URL,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function () {
                    // clear form and show a success message
                },
                error: function () {
                    // show an error message
                }
            });
        });

        $(window).bind('storage', function () {
            toggleDimmer($form);
        });

        toggleDimmer($form);
    });

    $('.ui.radio.checkbox').checkbox();
});