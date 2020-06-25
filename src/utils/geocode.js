const request = require("request")
const geoCode = (address,callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYW1hbnByYTMzMyIsImEiOiJja2JudTVobjAxdXdnMzFteXFnM3czNGRjIn0.RVNJRowGECgtnfctD5h5hQ&limit=1"
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the location service!')
        }
        else if(body.message){
            callback('Unable to find location. Try another search!')
        }
        else{
            callback(undefined,{
                   latitude:body.features[0].center[1],
                   longitude:body.features[0].center[0]
            })
        }
    })
}
module.exports = geoCode