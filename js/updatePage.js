let iconByName={
    Clear: 'img/icons/Material/Clear.png',
    Clouds:'img/icons/Material/Clouds.png',
    Snow: 'img/icons/Material/Snow.png',
    Rain: 'img/icons/Material/Rain.png',
    Drizzle: 'img/icons/Material/Drizzle.png',
    Thunderstorm: 'img/icons/Material/Thunderstorm.png',
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
let cloudsByDesc={
    'few clouds': 'img/icons/Material/few clouds.png',
    'scattered clouds': 'img/icons/Material/scattered clouds.png',
    'broken clouds': 'img/icons/Material/broken clouds.png',
    'overcast clouds':'img/icons/Material/Clouds.png'
}
geolocate().then(function(data){
    setDay(data, 0);
    let dayPickersImgs = Array.from(document.querySelectorAll('.day'));

    dayPickersImgs.map((elem, i) => elem.addEventListener("click", (e)=>{
        dayPickersImgs.map(e => e.style.backgroundColor = "rgba(0,0,0,0");
        elem.style.backgroundColor = "rgba(241, 228, 111, 0.26)";
        setDay(data,i);
    }));
    updateDayPickers(data);
});

function setDay(data, day){
    // UPDATE THE CHART
    let temperatures = [];
    data.days[day].map(e => temperatures.push(Math.floor(e.temperature)));
    let hours = [];
    data.days[day].map(e => hours.push(String(e.hour) + ":00"));
    updateChart(undefined, temperatures, hours);

    // UPDATE CURRENT DAY CSS
    let icon = document.querySelector('.main-icon');
    let mainTemp = document.querySelector('.temp');
    let desc = document.querySelector('.desc');
    let city =document.querySelector('.city');
    let country = document.querySelector('.country');
    let dataPoint = Boolean(day) * 5;
    
    icon.src = iconByName[data.days[day][dataPoint].conditions]; 
    if(data.days[day][dataPoint].conditions == 'Clouds'){
        icon.src = cloudsByDesc[data.days[day][dataPoint].description];
    }
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
        let icon = iconByName[data.days[i][dataPoint].conditions];
        //PICK ICON FOR CLOUDY WEATHER
        console.log(data);
        if(data.days[i][dataPoint].conditions == 'Clouds'){
            icon = cloudsByDesc[data.days[i][dataPoint].description];
        }
        
        let temps = [];
        data.days[i].map(e => temps.push(Math.floor(e.temperature)));
        let maxTemp = i == 0 ? temps[0] : Math.max(...temps);
        iconElem[i].src = icon;
        dateElem.innerHTML = data.days[i][dataPoint].date;
        tempElem.innerHTML = `${Math.min(...temps)}&#176C / ${maxTemp}&#176C`;
    });

}