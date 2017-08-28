//Open Weather Map API app id
var _appId = /* App Id goes here */;

//get device coordinates
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(function(position){
    var _lat = position.coords.latitude;
    var _long = position.coords.longitude;
    var btn = document.getElementById("celOrFahr");
    var degree = $("#degree");
    
    //get weather data
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + _lat + "&lon=" + _long + '&units=' + "&APPID=" + _appId, function(data){
      var temperature = data.main.temp;
      var temp_F = Math.round(temperature * 9/5 - 459.67);
      var temp_C = Math.round(temperature - 273.15);
      var city = data.name;
      //set initial temperature in fahrenheit
      degree.html(temp_F);
       
      //switch between F and C
      $("#celOrFahr").click(function () {
        if(btn.innerHTML === "Celsius"){
          $("#celOrFahr").html("Fahrenheit")
          degree.html(temp_C);
        } else {
          $(btn).html("Celsius");
          $(degree).html(temp_F);
        }
      });

      $('#cityName').html(data.name);
      $('#climate').html(data.weather[0].description);
      var icon = data.weather[0].icon;
      $('#icon').html('<img src="https://openweathermap.com/img/w/' + icon +'.png">');
      var wind = Math.round(data.wind.speed);
      $('#speed').html(wind);
      $('#hum').html(data.main.humidity);
       
      // get UV index
      $.getJSON("https://api.openweathermap.org/data/2.5/uvi?appid=" + _appId + "&lat=" + _lat + "&lon=" + _long, function(uvdata){
        $('#index').html(Math.floor(uvdata.value));
      });//end uv index JSON
       
    });//end weather data JSON
  });//end geolocation
} else{
  alert("enable geolocation");
};