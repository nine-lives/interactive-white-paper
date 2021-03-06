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
                    //"hutk":
                },
                "skipValidation": false
            };
            
            for (var i = data.fields.length - 1; i >= 0; --i) {
                if (data.fields[i].name.indexOf('_') === 0) {
                    data.fields.splice(i, 1);
                }
            }

            $('body').addClass('submitted');
            $.ajax({
                type: 'POST',
                url: "https://api.hsforms.com/submissions/v3/integration/submit/" + pid + "/" + guid,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function () {
                    if ($form.data('forward-url-target')) {
                        document.location.href = $($form.data('forward-url-target')).val();
                    }
                    $form.removeClass('was-validated');
                },
                error: function () {
                    console.log("error");
                    $('body').removeClass('submitted');
                }
            });
        }

        $form.addClass('was-validated');
    });
});