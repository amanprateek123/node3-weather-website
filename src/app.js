const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 5000

const forecast =  require('./utils/forecast')
const geocode = require('./utils/geocode')

//Define paths for express
const publicDir = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup Handlebars an view directory
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)
//Setup static directory to serve
app.use(express.static(publicDir))

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Aman Prateek'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Aman Prateek'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Aman Prateek'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    else{
        geocode(req.query.address,(error,{latitude,longitude}={})=>{
            if(error){
                res.send({error})
            }
            forecast(latitude,longitude,(error,forecastData)=>{
             if(error){
                 res.send({error})
             }
             else{
                 res.send({
                     Weather:'There is '+forecastData.weather[0].description+' today with ' + forecastData.clouds.all + '% clouds and the temperature in the region is '+ forecastData.main.temp +' degree celsius. The maximum temperature is '+forecastData.main.temp_max + ' degree celsius and the minimum temperature is '+ forecastData.main.temp_min +' degree celsius.',
                     Location:forecastData.name,
                     Country:forecastData.sys.country
                 })
             }
         })
        })
    }
})
app.get('*',(req,res)=>{
    res.render('404',{
        name:'Aman Prateek'
    })
})

app.listen(port,()=>{
    console.log("Server is up at port "+ port)
})