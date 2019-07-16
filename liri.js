// import dotenv;
const dotEnv = require("dotenv").config();
// spotify api key
const keys = require("./keys");
// import axios
const axios = require("axios");
// import spotify
const Spotify = require("node-spotify-api");
// import moment
const moment = require("moment");
// import fs
const fs = require("fs");

const spotify = new Spotify(keys.spotify);

// console.log(spotify);
var searchParameter = process.argv[2]
var searchThisParameter = ""
var userInput = ""
var concertArtist = ""
var movieInput = ""

// condition statements
switch(searchParameter || searchThisParameter) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
}

// concert function
function concertThis(){
    // iterate for every argument after the third
    for (var i=3; i < process.argv.length; i++){
        console.log(process.argv[i])
        userInput = userInput + process.argv[i];
        concertArtist = concertArtist + " " + process.argv[i]
    }
    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
    axios.get(queryURL)
    .then(function(response){
        let venueName = "Venue: " + response.data[0].venue.name
        let venueCity = "City: " + response.data[0].venue.city
        let venueRegion = "State: " + response.data[0].venue.region
        // add date of event using moment to format as MM/DD/YYYY
        let formatMonth = moment(response.data[0].datetime).months() + "/";
        let formatDay = moment(response.data[0].datetime).days() + "/"
        let formatYear = moment(response.data[0].datetime).years();
        let formattedDate = formatMonth + formatDay + formatYear;
        console.log("Artist: " + concertArtist, '\n', venueName, '\n', venueCity, '\n', venueRegion, '\n', formattedDate);
    })
}

function spotifyThis(){
    // iterate for every argument after the third
    for (var i=3; i < process.argv.length; i++){
        userInput = userInput + " " + process.argv[i];
        console.log(userInput);
    }
    if (userInput === "" || " "){
        // if no input, search song "the sign"
        spotify.search({
            type: "track",
            query: "The Sign Ace of Base",
            limit: 1
        })
        .then(function(response){
            let artistName = "Artist(s): " + response.tracks.items[0].album.artists[0].name;
            let songName = "Title: " + response.tracks.items[0].name;
            let songLink = "Link: " + response.tracks.items[0].external_urls.spotify;
            let albumName = "Album: " + response.tracks.items[0].album.name;
            console.log(songName, '\n', artistName, '\n', albumName, '\n', songLink)
        })
    } else {
        // search parameters for spotify api
        spotify.search({
            type: "track",
            query: userInput,
            limit: 5
        })
        .then(function(response){
            let artistName = "Artist(s): " + response.tracks.items[0].album.artists[0].name;
            let songName = "Title: " + response.tracks.items[0].name;
            let songLink = "Link: " + response.tracks.items[0].external_urls.spotify;
            let albumName = "Album: " + response.tracks.items[0].album.name;
            console.log(songName, '\n', artistName, '\n', albumName, '\n', songLink)
        })
    }
}

function movieThis(){
    // iterate for every argument after the third
    for (var i=3; i < process.argv.length; i++){
        console.log(process.argv[i])
        userInput = userInput + process.argv[i];
        movieInput = movieInput + "_" + process.argv[i]
    }
    if (userInput === ""){
        var queryURL = "http://www.omdbapi.com/?t=mr.nobody&apikey=77a62a1b"
        axios.get(queryURL)
        .then(function(response){
            // add so if userInput is empty, default the movie search to Mr.Nobody
            let movieTitle = "Title: " + response.data.Title
            let movieRelease = "Released: " + response.data.Year
            let imdbRating = "IMDB: " +response.data.imdbRating
            let rottenTomatoesRating = response.data.Ratings[0].Source + ": " + response.data.Ratings[0].Value
            let movieCountry = "Country: " + response.data.Country
            let movieLanguage = "Language: " + response.data.Language
            let moviePlot = "Plot: " + response.data.Plot
            let movieActors = "Actors: " + response.data.Actors
            console.log(movieTitle, '\n', movieRelease, '\n', imdbRating, '\n', rottenTomatoesRating, '\n', movieCountry, '\n', movieLanguage, '\n', moviePlot, '\n', movieActors)
        })
    }else {
        var queryURL = "http://www.omdbapi.com/?t=" + movieInput + "&apikey=77a62a1b"
        axios.get(queryURL)
        .then(function(response){
            // add so if userInput is empty, default the movie search to Mr.Nobody
            let movieTitle = "Title: " + response.data.Title
            let movieRelease = "Released: " + response.data.Year
            let imdbRating = "IMDB: " +response.data.imdbRating
            let rottenTomatoesRating = response.data.Ratings[0].Source + ": " + response.data.Ratings[0].Value
            let movieCountry = "Country: " + response.data.Country
            let movieLanguage = "Language: " + response.data.Language
            let moviePlot = "Plot: " + response.data.Plot
            let movieActors = "Actors: " + response.data.Actors
            console.log(movieTitle, '\n', movieRelease, '\n', imdbRating, '\n', rottenTomatoesRating, '\n', movieCountry, '\n', movieLanguage, '\n', moviePlot, '\n', movieActors)
            let finalText = `${movieTitle}\n${movieRelease}\n${imdbRating}\n${rottenTomatoesRating}\n${movieCountry}\n${movieLanguage}\n${moviePlot}\n${movieActors}\n---\n`
            console.log(finalText);
            fs.appendFile("log.txt", finalText, function(err){
                if (err) throw err;
                console.log("Saved!");

            })
        })
    }
}

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error,data){
        console.log(data);
        var dataArr = data.split(",")
        console.log(dataArr[0]);
        console.log(dataArr[1]);
        // set search parameter
        searchThisParameter = JSON.stringify(dataArr[0])
        // set user input
        var userInput = JSON.stringify(dataArr[1]) 
        // initialize spotify search
        spotify.search({
            type: "track",
            query: userInput,
            limit: 1
        })
        .then(function(response){
            let artistName = "Artist(s): " + response.tracks.items[0].album.artists[0].name;
            let songName = "Title: " + response.tracks.items[0].name;
            let songLink = "Link: " + response.tracks.items[0].external_urls.spotify;
            let albumName = "Album: " + response.tracks.items[0].album.name;
            console.log(songName, '\n', artistName, '\n', albumName, '\n', songLink)
        })
    })
}