const dotenv = require('dotenv');
const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const assert = require('assert');
const path = require('path');

dotenv.config();
const app = express()
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('../client/views/index.html'))
})

/*
 Sample response with made up data
 */
app.get('/input', function (req, res) {
    promiseChain("Santiago", 0, "Ford F-150", res);
})

app.post('/input', function (req, res) {
    const {city, daysAhead} = req.body;
    promiseChain(city, daysAhead, res);
})

app.listen(8080, function () {
})

/**
 * Returns coordinates for a given city.
 *
 * The function receive a String city,
 * then it calls the Geonames API
 * in order to get lat, long and Country
 * names parameter about the city.
 *
 * @param city
 * @returns Object containing, lat, lng and Country.
 */
const geonames = function (city = 'London') {
    const base_url = 'http://api.geonames.org/searchJSON';
    const url = `${base_url}?q=${city}&maxRows=1&username=crised`;
    return fetch(url)
        .then(res => res.json())
        .then(json => {
            const {lat, lng, countryName} = json.geonames[0];
            if (lat && lng && countryName) return {lat, lng, countryName};
        });
}

const weatherbit = function (daysAhead = 0, lat = 51.50853, lng = -0.12574) {
    assert(daysAhead < 16);
    let base_url = 'https://api.weatherbit.io/v2.0';
    base_url = daysAhead ? `${base_url}/forecast/daily` : `${base_url}/current`;
    const url = `${base_url}?lat=${lat}&lon=${lng}&key=${process.env.API_KEY}`;
    return fetch(url)
        .then(res => res.json())
        .then(json => {
            const {weather, temp, datetime} = json.data[daysAhead];
            return `The weather is ${weather.description} with ${temp} degrees.`
        })
}

const pixabay = function (keywords = 'London') {
    const url = `https://pixabay.com/api/?key=${process.env.API_KEY_PIXA}&q=${escape(keywords)}`;
    return fetch(url)
        .then(res => res.json())
        .then(json => {
            return json.hits[0].previewURL;
        });
}

const projectData = {};
let id = 0;
const promiseChain = function (city = "Madrid", daysAhead = 0, res) {
    const stateObj = {}
    geonames(city)
        .then((data) => {
            if (data) return weatherbit(daysAhead, data.lat, data.lng)
        })
        .then(data => {
            if (data) {
                stateObj['weatherString'] = data;
                return pixabay(city);
            }
        })
        .then(data => {
            if (data) {
                stateObj['imgURL'] = data;
                console.log(stateObj);
                projectData[++id] = stateObj;
                res.send(projectData[id]);
            }
        })
        .catch((error => {
            console.log(error);
            res.send({error: 'oops'})
        }));

}

module.exports = geonames;

