//GOOGLE API KEY: AIzaSyAY6-xJFfXIVEUYaUgCbn5jdE_GVZl2ZY8
//OPEN WEATHER KEY: 1b95c89c1b70755e6b0368450095f270
let locationData;
function geolocate(){
    var geopromise = new Promise(function(resolve, reject){
        if(navigator.geolocation){
            let data = navigator.geolocation.getCurrentPosition((position)=>{
                var OPENWEATHERDATA = `http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=1b95c89c1b70755e6b0368450095f270`;
                let JSONData = $.getJSON(OPENWEATHERDATA).done(function(data){
                    resolve(data);
                });
            });
        }
    });
    return geopromise;
}
geolocate();


