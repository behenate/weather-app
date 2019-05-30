let iconByName={
    Clear: 'img/icons/Clear.png',
    Clouds:'img/icons/Clouds.png',
    Snow: 'img/icons/Snow.png',
    Rain: 'img/icons/Rain.png',
    Drizzle: 'img/icons/Drizzle.png',
    Thunderstorm: 'img/icons/Thunderstorm.png',
    Mist: 'img/icons/Fog.png',
    Smoke: 'img/icons/Fog.png',
    Haze: 'img/icons/Fog.png',
    Dust: 'img/icons/Fog.png',
    Fog: 'img/icons/Fog.png',
    Sand: 'img/icons/Fog.png',
    Dust: 'img/icons/Fog.png',
    Ash: 'img/icons/Fog.png',
    Squall: 'img/icons/Fog.png',
    Tornado: 'img/icons/Fog.png',

}
geolocate().then(function(data){
    // UPDATE THE CHART
    let mainChart = createChart();
    console.log(data);
    console.log(mainChart);
    let temperatures = [];
    data.days[0].map(e => temperatures.push(Math.floor(e.temperature)));
    let hours = [];
    data.days[0].map(e => hours.push(String(e.hour) + ":00"));
    updateChart(mainChart, temperatures, hours);

    // UPDATE CURRENT DAY CSS
    let icon = document.querySelector('.main-icon');
    icon.src = iconByName[data.days[0][0].conditions]; 
    let mainTemp = document.querySelector('.temp');
    mainTemp.innerHTML = Math.floor(data.days[0][0].temperature) + "&#176C";
    let desc = document.querySelector('.desc');
    desc.innerHTML = data.days[0][0].description;
});