require('dotenv').config() // haalt de keys op


const axios = require('axios'); //import axios 
var parseString = require('xml2js').parseString; // vertalen xml > json

const baseURL = 'https://zoeken.oba.nl/api/v1/';
const query = 'search/?q=boek;'
const end = 'refine=true';



axios.get('https://zoeken.oba.nl/api/v1/search/?q=boek&authorization=1e19898c87464e239192c8bfe422f280&facet=type(book)')
  .then(function (response) {
    // handle success
    parseString(response.data, function (err, result) {
        console.log(result);
    });


  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
