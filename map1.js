//40.758056 -73.9810534

var ourLoc;
var view;
var map;

//initialize our variables
function init(){
//set location equal to current to current location
    ourLoc = ol.proj.fromLonLat([-73.9810534,40.7580656]);
  view = new ol.View({
//set variable view equal to a new view with current location and zoom wanted
    center: ourLoc,
    zoom: 18
  });

//make a fricken' map I guess
map = new ol.Map({
  target: 'map', //the target is our <div> name
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()//required variable
    })
  ],
    loadTilesWhileAnimating: true,
    view: view
});
  var button = document.getElementById("myButton");
  button.onclick = panHome;

  var panButton = document.getElementById("panButton");
  panButton.onclick = panToLocation;
}

function panHome(){
  view.animate( {
    center: ourLoc,
    duration: 2000,
    zoom: 18
  });
}

function panToLocation(){
  var countryName = document.getElementById("country-name").value;
  if(countryName == ""){
    alert("You didn't enter a country name!");
    return;
  }
  var query = "https://restcountries.eu/rest/v2/name/"+countryName;

  var lon = 0.0;
  var lat = 0.0;

  query = query.replace(/ /g, "%20");
  alert(query);

  var countryRequest = new XMLHttpRequest();
  countryRequest.open('GET', query, false);

  countryRequest.send();

  //alert("Ready State"+ countryRequest.readyState);
  //alert("Status"+ countryRequest.readyState);
  //alert("Respone"+ countryRequest.responseText);

  if (countryRequest.readyState != 4 || countryRequest.status!= 200 ||
    countryRequest.responseText==""){
      window.console.error("Request had an error!");
      return;
    }

    var countryInfo = JSON.parse(countryRequest.responseText);

    lat = countryInfo[0].latlng[0];
    lon = countryInfo[0].latlng[1];

    alert(countryName + ": lon" + lon + "&lat" + lat);

  var location = ol.proj.fromLonLat([lon, lat]);

  view.animate({
    center: location,
    duration: 2000,
    zoom: 10
  });
}
window.onload = init;
