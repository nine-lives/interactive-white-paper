$(function () {
    $("[data-value-source]").each(function() {
        var $target = $(this);
        var $source = $('#' + $(this).data('value-source'));
        $target.text($source.val());
        $source.change(function() {
            $target.text($source.val());
        });
    });

    $("[data-score]").click(function() {
        var $el = $(this);
        var name = $el.attr('name');
        var checked = $('[name=' + name + ']:checked');
        var score = 0.0;
        var values = [];
        checked.each(function() {
            score += parseFloat($(this).data('score'));
            values.push($(this).val());
        });

        var percentScore = score / 9.15;
        $('#' + name + "-values").val(values.join(',\n'));
        $('#' + name + "-score").val(percentScore);
        $('#' + name + "-progress").css('width', percentScore + '%');
        generateKey();
    });

    $("[data-sync]").change(function() {
        var $el = $(this);
        var others = $('[name=' + $el.attr('name') + ']');
        var value = $el.val();
        others.each(function() {
            $(this).val(value);
        });
        generateKey();
    });

    $('#submit').click(function(e) {
        e.preventDefault();
        console.log("hid there");

        $.ajax({
            type: 'POST',
            url: "https://api.sherpamarketing.co.uk/jsa/store",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(generateData()),
            success: function (data) {
                console.log(data);
                setResultUrl("k=" + data.body);
                $('#form').submit();
            },
            error: function () {
                // show an error message
            }
        });
    });

    function index(dimension) {
        var checked = $('[name=' + dimension + ']:checked');
        var index = 0;
        checked.each(function() {
            index += 1 << ($(this).data('index') - 1);
        });
        return index;
    }

    function generateData() {
        return data = {
            f: $('#name-input').val(),
            s: $('#lastname-input').val(),
            c: $('#company-input').val(),
            m: {
                plan: {
                    s: $('#plan-score').val(),
                    i: index('plan')
                },
                resource: {
                    s: $('#resource-score').val(),
                    i: index('resource')
                },
                recruit: {
                    s: $('#recruit-score').val(),
                    i: index('recruit')
                },
                enable: {
                    s: $('#enable-score').val(),
                    i: index('enable')
                },
                engage: {
                    s: $('#engage-score').val(),
                    i: index('engage')
                },
                grow: {
                    s: $('#grow-score').val(),
                    i: index('grow')
                },
                measure: {
                    s: $('#measure-score').val(),
                    i: index('measure')
                }
            }
        };
    }

    function generateKey() {
        var data = generateData();
        var val = JSON.stringify(data);
        var b64 = btoa(val);
        setResultUrl("d=" + b64);
    }

    function setResultUrl(params) {
        var resultsUrl = document.location.protocol + "//"
            + document.location.host
            + "/channel-growth-model/results?"
            + params;
        $('#results-url').val(resultsUrl);
    }

});