# Functional-Programming
![Final Product](final_product.png)

## Index

**[Installation](#How-to-install)**<br>
**[Research Questions](#Research-questions)**<br>
**[Code](#code-used)**<br>
**[Plan of Action](#plan-of-action)**<br>


### How to install

Request a key from OBA

```
Clone the repo:
git clone https://github.com/sjerrietukkel/functional-programming

Install packages:
npm install

Create .env file for storing API key:
touch .env

paste the APIkey in the .env file:
PUBLIC_KEY=your_API_key

Start up the nodeJS server:
node index
```

#### Packages used
* Axios
* Chalk
* Dotenv
* Express
* Jsonpath
* Oba-api
* Query-string
* Xml-to-json-promise
* Xml2js

#### Oba API
Understanding the API was difficult especially since the documentation was outdated and was very vague. Daniel van de Velde helped me alot with the documentation he wrote. Gijs Laarman created an excellent scraper which I used for the resit. My original code is explained below. 

### Research Questions

1. Is the length of book with cats as subject longer for children's books, nature books or fairytales?
2. What are the most populair animals children's literature?
3. What animal is populair in what era?
4. Is there a difference in the animals used in books for different ages?
5. How many times is the name of the animal used in the title?
6. Length of the titles in different times.
7. **Are there more Star Wars books published after Disney bought LucasArts (in 2012)**


### Hypotheses
I think Disney used books as marketing material in stead of using it to improve on the Star Wars universe, therefore there must be more books published leading up to the sequel movies (Episode VII & VII). 

#### Parameters needed

* Publication Year (pubYear)
* format (Books)
* Release dates of Star Wars movies

### Code used
Used code to receive books.
```js
client.getAll('search',
      {
       q: 'title:kat',
       librarian: true,
       refine: true,
       facet:'type(book)&facet=genre(sprookjes)'
      },
      {
        page: 1,
        pagesize: 20,
        maxpages: 5
      })
```      
Compressing the data and creating a .json file
```js

.then(response => {
  const data = response.data
  // response ends up here
  console.log(response)
  // lege array waar de opgehaalde data in gepush'd
  let dataArray = [];
// Laat van de arrays de geselecteerde objecten zien 
  
  const results = data.map(book => {
    return {
      title: book.titles[0].title[0]['_'],
      coverImage: book.coverimages[0].coverimage[0]['_'],
      summary: book.summaries[0].summary[0]
    }
  })

  let total = {
    url: response.url, 
    data: results
  };

  // pushed in de array
  dataArray.push(total);
  return dataArray
  
})
```
 
### Sketching
![sketch](sketch_d3.png)

### Conclusion 
Man o man, these weeks were exhausting. Connecting with the was a challenge, understanding the api was even worse. Without the help of my classmates i'd probably still trying to connect. 
<br>
After working in Observable I concluded it wasn't what I needed, so started following tutorials that in the end only made it more challenging to create what I had envisioned. I choose a not to difficult concept so I could at least show something, and that failed.

### Plan of Action

##### ✅ Done

- [x] Connect with the API
- [x] Search throught the data and select interesting variables
- [x] Define research questions.
- [x] Create sub-questions
- [x] Think about visualisation
- [x] Create datastorage with relevant data
- [x] Visualize with D3


##### ❌ To-do 
- [ ] Add neon lights to lightsaber
- [ ] Add tooltip to give to user more information.

#### Credits
* Daniel van de Velde (Readme)
* Gijs Laarman
* Marcel Fleuren