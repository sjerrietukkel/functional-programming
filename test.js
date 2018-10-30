const axios = require('axios');
var parseString = require('xml2js').parseString;


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
