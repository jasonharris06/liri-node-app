# liri-node-app
*** This app utilizes Node.JS to to run different commands based on user input

*** The app completes the following commands:
1. Finds next concert time, and venue, for the user defined musical artist.  This functionality utilizes the NPM [Axios](https://www.npmjs.com/package/axios) package to run a GET call that returns information from [Bands in Town](https://www.bandsintown.com/) 
 * The user types in `concert-this` followed by the artist. 
 
2. Finds user defined song from sportify. **App user will need to provide their own Spotify Client-ID and Secret_ID**.  The information is pulled using the NPM [Node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package.     
 * The user types in `Spotify-this-song` followed by the song.
  **Code example** |
 -------------|
 ```javascript
 spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
 ```|
 
3. Finds movie information of for the user defined movie.   This functionality utilizes the NPM [Axios](https://www.npmjs.com/package/axios) package to run a GET call that returns information from [OMDB API](http://www.omdbapi.com/).  
 * The user types in `Movie-this` followed by the movie.

4. Runs command found in the Random.txt file.  This functionality utilizes the  fs.readFile function which will read the information found on the file and run ove of the 

 
 
 
