const express = require("express");
const https = require("https");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));




app.get("/", function (req,res) {
	res.sendFile(__dirname + "/index.html");
	
});

app.post("/",function(req,res) {
	//console.log(req.body.cityName);
	//console.log("post recievd");
	const query = req.body.cityName;
	const apikey = "633e8c0f27d8cb09a2e0db8edcc2475a";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=" +apikey;
   
    https.get(url,function (response) {
      console.log(response.statusCode);

      response.on("data",function(data) {
         const weatherData = JSON.parse(data);
         //console.log(weatherData);
         const temp = weatherData.main.temp;
         const des = weatherData.weather[0].description;
         const icon = weatherData.weather[0].icon;
         const iconurl = " http://openweathermap.org/img/wn/"+icon+"@2x.png";
         //console.log(temp);
         //console.log(des);
         res.write("<p>Weather is currently: " +des+ "</p>");
         res.write("<h1>the temperature " +query+ " is:" +temp+ " degrees celcius.</h1>");
         res.write("<img src = " +iconurl+ ">");
         res.send();
         
      });
    });
   // res.send("server is up and running");

});
 







app.listen(3000,function () {
	console.log("server running on port 3000");
});