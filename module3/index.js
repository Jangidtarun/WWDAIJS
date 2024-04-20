// required packages
require('dotenv').config();
const express = require('express');
const DataStore = require('nedb');
// const fetch = require('node-fetch');

// console.log(process.env);

// creating and configuring the app
const app = express();
app.listen(3000, () => {
    console.log('listening at 3000');
});
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));


// creating and loading the database
const database = new DataStore('database.db');
database.loadDatabase();

// get route for the app's api
app.get('/api', (request, response) => {
    // getting all the elements in the database [basically everything]
    database.find({}, (err, data) => response.json(data))
})

// post route for the app's api
app.post('/api', (request, response) => {
    // getting the body of the request
    const data = request.body;
    console.log(data);
    
    // putting the timestamp on the data
    const timestamp = Date.now();
    data.timestamp = timestamp;

    // inserting the data into the database
    database.insert(data);

    // sending the response
    response.json(data);
})

// weather get api [from accuweather]
app.get('/weather/:locationkey', async (request, response) => {
    const apikey= process.env.API_KEY_accuweather;
    const base_url = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const api_url = base_url + request.params.locationkey + '?&apikey=' + apikey;
    
    const fetch_response = await fetch(api_url);
    const tjson = await fetch_response.json();
    response.json(tjson);
})

// weather get api [from openweathermap]
app.get('/openweather/:latlng', async (request, response) => {
    const latlng = request.params.latlng.split(',');
    const api_key = process.env.API_KEY_OPENWEATHERMAP;
    const base_url = 'https://api.openweathermap.org/data/2.5/weather?';
    const api_url = base_url + 'lat=' + latlng[0] + '&lon=' + latlng[1] + '&appid=' + api_key;

    const fetch_response = await fetch(api_url);
    const tjson = await fetch_response.json();
    response.json(tjson);
})

// locationkey endpoint api
// This method gives the city information from geolocation.
app.get('/getlockey/:latlng', async (request, response) => {
    const latlng = request.params.latlng.split(',');
    console.log(latlng);
    const apikey= process.env.API_KEY_accuweather;
    const base_url = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?';
    const api_url = base_url + '&q=' + latlng + '&apikey=' + apikey;

    const fetch_response = await fetch(api_url);
    const tjson = await fetch_response.json();
    const jsonres = response.json(tjson);
    // console.log(jsonres);
})