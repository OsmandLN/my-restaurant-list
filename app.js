'use strict'
// require package used in this project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars
const exphbs = require('express-handlebars')

// require restaurant json
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files for express
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    const restaurantName = restaurant.name
    const restaurantCate = restaurant.category
    if (restaurantName.toLowerCase().includes(keyword.toLowerCase())) {
      return restaurant
    } else if (restaurantCate.includes(keyword)) {
      return restaurant
    }
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

// start and listen on the server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}.`)
})

