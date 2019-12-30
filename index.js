const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Olá Fullstack Lab')
})


app.listen(8080, (err) => {
  if (err) {
    console.log('JobiFy server is not running', err)
  } else {
    console.log('JobiFy server running')
  }
})