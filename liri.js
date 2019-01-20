//Here we will add the required API's from NPM to retrieve data for Spotify, Request, OMBD, 
//Bands in Town, Moment and DotEnv.
var dotenv = require("dotenv").config();
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var moment = require("moment");
var axios = require("axios");


//access keys info from Spotify
var spotify = new Spotify(keys.spotify);

//Set user argument 2 to userCommand
var userCommand = process.argv[2].toLowerCase();
var userRequest = process.argv.slice(3).join(" ");


console.log(userRequest);

switch (userCommand) {
    case "concert-this":
        bandsintown();
        break;
    case "spotify-this-song":
        toSpotify();
        break;
    case "movie-this":
        IMDB();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("Please type in one of the following: concert-this, spotify-this-song, movie-this, do-what-it-says");

};

// //Concert-this function that runs bands in town"
function bandsintown() {
    axios.get("https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=codingbootcamp").then(
        function (response) {
            //console.log(response);
            //Create a default time for the bands in town API
            var concertDate = response.data[0].datetime;
            console.log("Name of Venue: " + response.data[0].venue.name);
            console.log("Venue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
            console.log("Date of the Event: " + moment(concertDate).format('MM/DD/YYYY'))
        });
}
//   //Spotify functions
function toSpotify() {
    spotify.search({ type: 'track', query: userRequest })
        .then(function (response) {

            console.log("Artist: " + response.tracks.items[0].artists[0].name);
            console.log("Name of Song: " + response.tracks.items[0].name);
            if (response.tracks.items[0].preview_url === "null" || "undefined") {
                console.log("No song preview available, Full Song: " + response.tracks.items[0].artists[0].external_urls.spotify)
            }
            else {
                console.log("Song Preview:" + response.tracks.items[0].artists[0].preview_url)
            }
            console.log("Album: " + response.tracks.items[0].album.name);
            //console.log(response.tracks.items[0].preview_url)
        })
        .catch(function (err) {
            console.log(err);
        });
};

function IMDB() {
    axios.get("http://www.omdbapi.com/?t=" + userRequest + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            if (response.data.Response === "True") {


                console.log(response);
                console.log("Title: " + response.data.Title);
                console.log("Year Movie Came Out: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotton Tomatos Rating: " + response.data.Metascore);
                console.log("Produced in: " + response.data.Country);
                console.log("Languages: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);

            }
            else {
                axios.get("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy").then(
                    function (response) {
                        console.log("Title: " + response.data.Title);
                        console.log("Year Movie Came Out: " + response.data.Year);
                        console.log("IMDB Rating: " + response.data.imdbRating);
                        console.log("Rotton Tomatos Rating: " + response.data.Metascore);
                        console.log("Produced in: " + response.data.Country);
                        console.log("Languages: " + response.data.Language);
                        console.log("Plot: " + response.data.Plot);
                        console.log("Actors: " + response.data.Actors);
                    });
            }
        })
        .catch(function (error) {
            console.log(error);

        });
};
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);
        userCommand = dataArr[0];
        userRequest = dataArr[1];
        toSpotify();
    
    });

};

