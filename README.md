# LIRI Bot
The LIRI bot is a cli app that was created to streamline the process of searching for certain features.

### Features:
* Search Spotify - using the node-spotify-api
* Search for bands in town - using the bands in town api
* Search OMDB - using the OMDB api
* Read from random.txt file to search Spotify

 *All API's called through axios*

### Instructions:
1. ##### Search Spotify:
    node liri.js spotify-this-song "song name".
    In this case, Haunted Gardens is the song that is searched.
    ![Image of Spotify](https://i.imgur.com/dotDsJO.png)
    In the case where no song is searched, it will default to The Sign by Ace of Base.
    ![Image of Spotify2](https://i.imgur.com/UbKYzxy.png)

2. ##### Search OMDB:
    node liri.js movie-this "movie name"
    In this case, The Breakfast Club is the movie that is searched.
    ![The Breakfast Club](https://i.imgur.com/SRfIhfV.png)
    In the case where no movie searched, it will default to Mr. Nobody.
    ![Mr. Nobody](https://i.imgur.com/zcnITWu.png)

3. ##### Search an artists next concert location/date:
    node liri.js concert-this "artist name"
    In this case, Dumbfoundead will be the artist that is searched.
    ![Dumbfoundead](https://i.imgur.com/ePtzPKw.png)

4. ##### Search Do What it Says;
    node liri.js do-what-it-says
    This will look into the random.txt file and then search spotify.
    In this case, it will search for, I Want It That Way.
    ![Do What it Says](https://i.imgur.com/zUNXzws.png)

