// import dotenv;
let dotEnv = require("dotenv").config();
const keys = require("./keys");
// import axios
let axios = require("axios");
// import spotify
let Spotify = require("node-spotify-api");
// import moment
let moment = require("moment");

const spotify = new Spotify(keys.spotify);

// console.log(spotify);

let userInput = process.argv[3]

if (process.argv[2] === "concert-this"){
    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
    axios.get(queryURL)
    .then(function(response){
        let venueName = response.data[0].venue.name
        let venueCity = response.data[0].venue.city
        let venueRegion = response.data[0].venue.region
        console.log(userInput + " will be playing at " + "'" + venueName + "'" + " in " + venueCity + ", " + venueRegion)
    })
}else if(process.argv[2] === "spotify-this-song"){
    spotify.search({
        type: "track",
        query: userInput,
        limit: 1
    })
    .then(function(response){
        let artistName = response.tracks.items[0].album.artists[0].name;
        let songName = response.tracks.items[0].name;
        let songLink = response.tracks.items[0].external_urls.spotify;
        let albumName = response.tracks.items[0].album.name;
        console.log(songName + " by " + artistName + ". From the album: " + albumName + ". Link: " + songLink)
    })
}