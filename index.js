require('dotenv').config()

const api = require('./oba-api.js')
const chalk = require('chalk');
const express = require('express')
const app = express()
const port = 3000

const obaApi = new api({
  url: 'https://zoeken.oba.nl/api/v1/',
  key: process.env.PUBLIC
})

// Search for method, params and than optional where you wanna find something
// returns first 20 items
// obaApi.get(endpoint, params, filterKey)
// possible endpoints: search (needs 'q' parameter) | details (needs a 'frabl' parameter) | availability (needs a 'frabl' parameter) | holdings/root | index/x (where x = facet type (like 'book' ))
// possible parameters: q, librarian, refine, sort etc. check oba api documentation for all
// possible filterKey: any higher order key in response object, like title returns only title objects instead of full data object

obaApi.get('search', {
  facet: "genre(dieren)",
  page: 1,
  pagesize: 20, //kan niet hoger dan 20, wel lager
  q: 'aap'
}).then(response => {
  const data = response.data.aquabrowser.results[0].result
  // response ends up here
  console.log(response.data)


// Laat in de arrays de geselecteerde objecten zien  
  const results = data.map(book => {
    return {
      title: book.titles[0].title[0]['_'],
      coverImage: book.coverimages[0].coverimage[0]['_']
    }
  })




  // Make server with the response on the port
  app.get('/', (req, res) => res.json(results))
  app.listen(port, () => console.log(chalk.green(`Listening on port ${port}`)))
})

// combined facets -> facet: ["genre(dieren)", "language(dut)"]