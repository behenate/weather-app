Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
function addZeros(str,targetLength = 2, startFromTheEnd = false){
    let toReturn = String(str);
    str = String(str);
    for (let i = 0 ; i < targetLength - str.length; i++){
        if(!startFromTheEnd)
            toReturn = '0' + toReturn;
        else
            toReturn = toReturn + '0';
    }
    return toReturn;
}