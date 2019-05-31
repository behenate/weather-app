//OPEN WEATHER KEY: 1b95c89c1b70755e6b0368450095f270

function calcDayWeather(daynum, weatherData){
    let forecast = [];
    let date = new Date().addDays(daynum).getDate();
    for(let i = 0; i < weatherData.length; i++){
        let elem = weatherData[i];
        let elemDate = new Date(elem.dt*1000).getDate();
        if(elemDate == date)
            forecast.push(elem);
        //Add the first entry of the next day for continuity day 0 is incomplete
        if(daynum != 0 && i == 8 * daynum +2){
            forecast.push(elem);
        }
    }
    //Fill in the first day with predictions for the next day
    for(let i = 9*daynum + forecast.length; i < 9 + 9*daynum; i++){
        forecast.push(weatherData[i]);
    }
    //Extract neccessary info from forecasts
    let totalForecast = forecast;
    let toReturn = [];
    for(let i=0; i<9; i++){
        let data = totalForecast[i];
        let day = addZeros(new Date(data.dt*1000).getDate());
        let month = addZeros(new Date(data.dt*1000).getMonth() + 1);
        if (data == undefined)
            break;
        toReturn.push({
            //Api has some weird time formatting, subtract 2 to get the same hour as in the forecast
            date: `${day}.${month}`,
            hour: new Date(data.dt*1000).getHours() - 2,
            temperature: data.main.temp - 273.15,
            conditions: data.weather[0].main,
            description: data.weather[0].description
        })
    }
    return toReturn;
    
}

function geolocate(){
    var geopromise = new Promise(function(resolve, reject){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                var OPENWEATHERDATA = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=1b95c89c1b70755e6b0368450095f270`;
                let JSONData = $.getJSON(OPENWEATHERDATA).done(function(data){
                    let weatherData = {
                        all: data,
                        country: data.city.country,
                        city: data.city.name,
                        days: [calcDayWeather(0, data.list),
                              calcDayWeather(1, data.list),
                              calcDayWeather(2, data.list),
                              calcDayWeather(3, data.list),
                              calcDayWeather(4, data.list)
                    ]}
                    resolve(weatherData);
                });
            });
        }
    });
    return geopromise;
}



