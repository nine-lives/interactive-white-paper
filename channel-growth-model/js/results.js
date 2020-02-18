function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

function color(level, data) {
    return (parseFloat(data.s) + 0.5) < level ? '#001048' : '#9e005f';
}

try {
    var results = JSON.parse(atob(getUrlParameter('d')));

    var datasets = [];
    datasets.push({
        data: [results.m.plan.s, results.m.resource.s, results.m.recruit.s, results.m.enable.s, results.m.engage.s, results.m.grow.s, results.m.measure.s],
        backgroundColor: ['#9e005f', '#9e005f','#9e005f', '#9e005f','#9e005f', '#9e005f','#9e005f']
    });

    $(function() {
        var data = {
            datasets: datasets,
            labels: ['plan', 'resource', 'recruit', 'enable', 'engage', 'grow', 'measure']
        };

        var options = {
            borderAlign: 'inner',
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            },
            scale: {
                ticks: {
                    display: false,
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    stepSize: 20
                },
                angleLines: {
                    display: true,
                    color: '#ced2f5',
                    lineWidth: 1
                },
                gridLines: {
                    display: true,
                    drawBorder: true,
                    color: '#ced2f5'
                }
            }
        };

        var chart = new Chart($('#chart'), {
            type: 'polarArea',
            data: data,
            options: options
        });
    });
} catch (e) {
    //throw e;
    document.location.href = 'https://interactive.sherpamarketing.co.uk/channel-growth-model/';
}
