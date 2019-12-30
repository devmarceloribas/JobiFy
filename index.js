// Express
const express = require('express')
const app = express()

// SQL Lite
const sqlite = require('sqlite')
const dbConn = sqlite.open('jobiFy.sqlite', {Promise})


app.use(express.static('public'))

app.set('view engine', 'ejs')

// Routers
app.get('/', async(req, res) => {
  const db = await dbConn
  const categorias = await db.all('select * from categorias')
  res.render('home', {
    categorias
  })
})

app.get('/vaga', (req, res) => {
  res.render('vaga')
})

app.get('/aboutme', (req, res) => {
  res.render('aboutme')
})

// Database
const init = async() => {
  const db = await dbConn
  await db.run('create table if not exists categorias (id integer primary key, categoria text)')
  //const categoria = 'Engeneering Team'
  //await db.run(`insert into categorias (categoria) values ('${categoria}');`)
  
  //const categoria2 = 'Marketing Team'
  //await db.run(`insert into categorias (categoria) values ('${categoria2}');`)
}

init()

// Oportunitys

// Category


app.listen(8080, (err) => {
  if (err) {
    console.log('JobiFy server is not running', err)
  } else {
    console.log('JobiFy server running')
  }
})