//Here we will add the required API's from NPM to retrieve data for Spotify, Request, OMBD, 
//Bands in Town, Moment and DotEnv.
var dotenv = require("dotenv").config();
var keys = require("./keys");
var spotify = require('node-spotify-api');
var fs = require("fs");
var moment = require("moment");
var axios = require("axios");


//access keys info from Spotify
//var spotify = new Spotify(keys.spotify);

//Set user argument 2 to userCommand
var userCommand = process.argv[2].toLowerCase();
var userRequest = process.argv[3].toLowerCase();

switch (userCommand){
    case "concert-this":
        axios.get("https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=codingbootcamp").then(
        function(response){
        
        //Create a default time for the bands in town API
        var concertDate = response.data[0].datetime;
        console.log("Name of Venue: " + response.data[0].venue.name);
        console.log("Venue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region );
        console.log("Date of the Event: " + moment(concertDate).format('MM/DD/YYYY') )
        });
        break;
    case "spotify-this-song":
        break;
    case "movie-this":
        break;
    case "do-what-it-says":
        break;
    default:
        console.log("Please type in one of the following: concert-this, spotify-this-song, movie-this, do-what-it-says");

};

if(userCommand === "concert-this"){
axios.get("https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=codingbootcamp").then(
function(response){

//Create a default time for the bands in town API
moment.defaultFormat = "DD.MM.YYYY";
var concertDate = response.data[0].datetime;
console.log("Name of Venue: " + response.data[0].venue.name);
console.log("Venue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region );
console.log("Date of the Event: " + moment(concertDate).format('MM/DD/YYYY') )
});

} else if (userCommand === "spotify-this-song"){

}else if (userCommand === "movie-this"){

}else if (userCommand === "do-what-it-says"){

}else{
    console.log("Please type in one of the following: concert-this, spotify-this-song, movie-this, do-what-it-says")
}
