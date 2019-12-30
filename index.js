const express = require('express')
const app = express()

app.use(express.static('public'))

app.set('view engine', 'ejs')



// Routers
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/vaga', (req, res) => {
  res.render('vaga')
})

app.get('/aboutme', (req, res) => {
  res.render('aboutme')
})

// Vagas

// Categorias

// Database


app.listen(8080, (err) => {
  if (err) {
    console.log('JobiFy server is not running', err)
  } else {
    console.log('JobiFy server running')
  }
})