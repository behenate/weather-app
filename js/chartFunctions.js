
function createChart(){
    var ctx = document.getElementById('temp-graph').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', "21:00","0:00"],
            datasets: [{
                label: 'Temperatura',
                backgroundColor: 'rgba(241, 228, 111,0.1)',
                borderColor: 'rgb(241, 228, 111)',
                data: [3, 5, 8, 12, 23, 23, 17,15, 7,3 ]
            }],
        },
        // Configuration options go here
        options: {
            responsive:true,
            maintainAspectRatio:false,
            legend:{
                display:false,
            },
            elements:{
                point:{
                    radius:5,
                    hoverRadius:6
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    },
                    ticks:{
                        fontColor:'rgba(255, 255, 255, 0.2)',
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.03)",
                    },
                    ticks:{
                        display:true,
                        fontColor:'rgba(255, 255, 255, 0.2)',
                    }     
                }],
                
            },
            layout:{
                padding:{
                    left:0,
                    right:0,
                    top:20,
                    bottom:10
                }
            },
            plugins: {
                // Labels above graph points plugin
                datalabels: {
                    color: 'rgba(255,255,255,0.6)',
                    anchor: 'start',
                    align:'top'
                }
            },
        }
    });
    return chart;
}

function updateChart(chart, temperature, hours){
    chart.config.data.datasets[0].data = temperature;
    chart.data.labels = hours;
    chart.update();
}

