$(function () {
    $("[data-hs-guid]").submit(function (event) {
        event.preventDefault();

        var $form = $(this);
        if(this.checkValidity()) {
            var pid = $form.data('hs-pid');
            var guid = $form.data('hs-guid');
            var data = {
                "fields": $form.serializeArray($form),
                "context": {
                    "pageUri": document.location.href
                },
                "skipValidation": false
            };

            $.ajax({
                type: 'POST',
                url: "https://api.hsforms.com/submissions/v3/integration/submit/" + pid + "/" + guid,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function () {
                    $('body').addClass('submitted');
                    $form.removeClass('was-validated');
                },
                error: function () {
                    console.log("error");
                }
            });
        }

        $form.addClass('was-validated');
    });
});