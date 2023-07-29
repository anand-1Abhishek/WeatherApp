const https = require('node:https');
const express = require('express')
var bodyparser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
    
    
})

app.post('/', (req, res) =>{
    const query= req.body.cityName;
    const url='https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid=60b640e2ffc132300fd89575765dc500&units=metric';
    https.get(url,(response)=>{
        response.on('data', (data) => {
   
            const weatherdata = JSON.parse(data);
            //console.log(weatherdata.main.temp);
           // const description = weatherdata.weather[0].description;
           
            res.send('The temperature of ' + query + ' is '+ weatherdata.main.temp);
            //res.write('The Weather Condition is  '+ description);
        });
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})