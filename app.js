const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views/partials");

// Add the route handlers here:
app.get('/', (req, res, next) => {
  res.render('home');
});


app.get("/beers", (req, res, next)=> {
 punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers});
  })
 })

app.get("/detail/:id", (req, res, next) => {
 const id = req.params.id;
 punkAPI.getBeer(id)
    .then(beer => {
      res.render("detail", { beer });
    })
    .catch(err =>console.error(err))
});

app.get("/randomBeer", (req, res, next)=> {
 punkAPI.getRandom()
   .then(beer => {
    res.render('randomBeer', {beer})
  })
 });

app.listen(3000, () => console.log('🏃‍ on port 3000'));
