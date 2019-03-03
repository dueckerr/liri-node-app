require("dotenv").config();

var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify) 
var action = process.argv[2];
var query = process.argv.slice(3).join(' ');
var data = action + ' ' + query;
var fs = require("fs");


function concertThis () {
    console.log("finding Concerts");
    if (!query){
      query = "Odessa";
    }

    axios.get('https://rest.bandsintown.com/artists/' + query + '/events?app_id=codingbootcamp').then(
        function(response) {
        var concerts  = response.data;
        for (var i = 0; i < concerts.length; i++) {
            console.log('_--------_')

            console.log(concerts[i].datetime);
            console.log(concerts[i].venue.city);
            console.log(concerts[i].venue.name);
            console.log(query);

            console.log('_--------_')

        }
        }
    );
    appendLog()

}

function SpotifyThis () {
    console.log("finding song");

    if (!query){
      query = "The Sign";
    }

    spotify.search({ type: 'track', query: query }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
        console.log('_--------_')
        console.log('Atrist: ', songs[i].artists[0].name)
        console.log('Song Name: ', songs[i].name);
        console.log('Preview URL: ', songs[i].preview_url);
        console.log('Album: ', songs[i].album.name);
        console.log(query);

        console.log('_--------_')
        }
       appendLog()
      });
}
//Search Movies
function MovieThis () {
    console.log("finding movie");

    if (!query){
      query = "Mr. Nobody";
    }

        axios.get("http://www.omdbapi.com/?t=" + query +"&y=&plot=short&apikey=trilogy").then(
      function(response) {
        var movies = response.data;
        console.log(query);
        // console.log(response);
        // console.log(response.data);
        // for (var i = 0; i < response.length; i++) {
          console.log('_--------_')
          console.log('Movie Title: ', movies.Title);
          console.log('Year Released: ', movies.Year);
          // console.log('Album: ', movies[i].album.name);
          console.log("The movie's IMDB rating is: " + movies.imdbRating);
          // console.log("The movie's Rotten Tomatoes rating is: " + movies.Ratings[1].Value);
          console.log('Country where movie was produced: ', movies.Country);
          console.log('Language of the movie: ', movies.Language);
          console.log('Plot: ', movies.Plot);
          console.log('Actors: ', movies.Actors);

          console.log('_--------_')
      }
    );
    appendLog();
}

function appendLog () {
  fs.appendFile('log.txt', data, function(err) {
  // If the code experiences any errors it will log the error to the console.
    if (err) {
      return console.log(err);
    }
  
    // Otherwise, it will print: "movies.txt was updated!"
    console.log("movies.txt was updated!");
  
  });
}


switch(action){
 case "Concert":
 concertThis();
 break;

 case "Song":
 SpotifyThis();
 break;

 case "Movie":
 MovieThis();
 break;

 case "do-what-it-says":
 do_what();
 break;
}