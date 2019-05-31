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
    setDay(data, 0);
    updateDayPickers(data);
});

function setDay(data, day){
    // UPDATE THE CHART
    let mainChart = createChart();
    console.log(data);
    console.log(mainChart);
    let temperatures = [];
    data.days[day].map(e => temperatures.push(Math.floor(e.temperature)));
    let hours = [];
    data.days[day].map(e => hours.push(String(e.hour) + ":00"));
    updateChart(mainChart, temperatures, hours);

    // UPDATE CURRENT DAY CSS
    let icon = document.querySelector('.main-icon');
    let mainTemp = document.querySelector('.temp');
    let desc = document.querySelector('.desc');
    let city =document.querySelector('.city');
    let country = document.querySelector('.country');
    
    let dataPoint = Boolean(day) * 5;
    icon.src = iconByName[data.days[day][dataPoint].conditions]; 
    mainTemp.innerHTML = Math.floor(data.days[day][dataPoint].temperature) + "&#176C";
    desc.innerHTML = data.days[day][dataPoint].description;
    city.innerHTML = data.city;
    country.innerHTML = data.country;
}
function updateDayPickers(data){
    let dayPickersImgs = Array.from(document.querySelectorAll('.day'));
    dayPickersImgs.map((day, i) =>{
        let iconElem = Array.from(document.querySelectorAll('.day>div>img'));

        let dateElem = day.childNodes[1];
        let tempElem = day.childNodes[5];
        let dataPoint = Boolean(i) * 5;
        console.log(data);
        let icon = iconByName[data.days[i][dataPoint].conditions];
        let temps = [];
        data.days[i].map(e => temps.push(Math.floor(e.temperature)));
        let maxTemp = i == 0 ? temps[0] : Math.max(...temps);
        iconElem[i].src = icon;
        dateElem.innerHTML = data.days[i][dataPoint].date;
        tempElem.innerHTML = `${Math.min(...temps)}&#176C / ${maxTemp}&#176C`;
    });

}