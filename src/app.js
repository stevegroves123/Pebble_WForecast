var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');
var about_window = new UI.Window();
var Vibe = require('ui/vibe');
var cityName = '';

// Create a Card with title and subtitle
var main_card = new UI.Card({
  title:'W_Forecast',
  textAlign:'left',
  body:'\n     Weather -->' + '\n\n        About -->'
});

// Display the Main_Card
main_card.show();

// Choose the location
main_card.on('click','select',function(e) {
  // Give feedback to user
  Vibe.vibrate('short');
  var menu = new UI.Menu({
    sections:[{
    items:[{
      title:'Westerham'
    },{
      title:'New Milton'
    },{
      title:'Newcastle NSW'
    },{
      title:'London'
    },{
      title:'Madrid'
    },{
      title:'New York'
  }]
  }]
  });
menu.show();
about_window.hide();

// Display the weather information
menu.on('select',function(e) {
  // Give feedback to user
  Vibe.vibrate('short');
  cityName = e.item.title;
  var weather_card = new UI.Card();
  // Construct URL
  var URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName;
  // Make the request
  ajax(
    {
      url: URL,
      type: 'json'
    },
    function(data) 
    {
      // Success!
      console.log("Successfully fetched weather data!");
      // Extract data
      var location = data.name;
      var temperature = Math.round(data.main.temp - 273.15);
      var humidity = Math.round(data.main.humidity);
      var wind_speed = Math.round(data.wind.speed);
      // Always upper-case first letter of description
      var description = data.weather[0].description;
      description = description.charAt(0).toUpperCase() + description.substring(1);
      // Show data to user
      weather_card.subtitle(location + "\nT: " + temperature + "C");
      weather_card.body(description + "\nH: " + humidity + "%" + "\nWind: " + wind_speed + "mph");
      weather_card.show();
    },
    function(error) 
    {
      // Failure!
      console.log('Failed fetching weather data: ' + error);
    }
  );
  }
  );
});

main_card.on('click', 'down', function(e) {
  var text = new UI.Text({
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
    text:'Steve Groves \nFeb 2015 \n\nJavaScript app for Pebble',
    font: 'gothic_28_bold',
    color:'white',
    textOverflow:'wrap',
    textAlign:'left',
    backgroundColor:'black'
  });
  about_window.add(text);
  about_window.show();
});