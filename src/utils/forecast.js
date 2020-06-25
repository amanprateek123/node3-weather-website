const request = require('request')
const forecast = (lat,long,callback)=>{
    const url ="http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=582d989f0f4f3d0fb662ef8e4d4b25e4&temp&units=metric"
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the weather service!')
        }
        else if(body.error){
            callback('Unable to find location')
        }
        else{
            callback(undefined,body)
        }
    })
}
module.exports = forecast