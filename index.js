// Express
const express = require('express')
const app = express()

// Body Parser
const bodyParser = require('body-parser')

// SQL Lite
const sqlite = require('sqlite')
const dbConn = sqlite.open('jobiFy.sqlite', {Promise})


app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

// Routers
app.get('/', async(req, res) => {
  const db = await dbConn
  const categoriasDb = await db.all('select * from categorias;')
  const vagas = await db.all('select * from vagas;')

  const categorias = categoriasDb.map(cat =>{
    return {
      ...cat,
      vagas: vagas.filter(vagas => vagas.categoria === cat.id)
    }
  })
  res.render('home', {
    categorias,
    vagas
  })
})

app.get('/vaga/:id', async(req, res) => {
  const db = await dbConn
  const vagas = await db.get('select * from vagas where categoria = ' + req.params.id + ';')
  res.render('vaga', {
    vagas
  })
})

app.get('/aboutme', (req, res) => {
  res.render('aboutme')
})

app.get('/admin', (req, res) => {
  res.render('admin/home')
})

// Database
const init = async() => {
  const db = await dbConn

  // Create tables (categorias and vagas)
  await db.run('create table if not exists categorias (id integer primary key, categoria text)')
  await db.run('create table if not exists vagas (id integer primary key, categoria integer, titulo text, descricao text)')
}

init()

// Oportunitys

app.get('/admin/vagas', async(req, res) => {
  const db = await dbConn
  const vagas = await db.all('select * from vagas;')
  res.render('admin/vagas', {
    vagas
  })
})

app.get('/admin/vagas/delete/:id', async(req, res) => {
  const db = await dbConn
  await db.run('delete from vagas where id = ' + req.params.id + ';')
  res.redirect('/admin/vagas')
})

app.get('/admin/vagas/nova', async(req, res) => {
  const db = await dbConn
  res.render('admin/nova-vaga')
})

app.post('/admin/vagas/nova', async(req, res) => {
  const db = await dbConn
  const { categoria, titulo, descricao} = req.body
  await db.run(`insert into vagas(categoria, titulo, descricao) values (${categoria}, '${titulo}', '${descricao}')`)
  res.redirect('/admin/vagas')
})

// Category

app.get('/admin/categorias', async(req, res) => {
  const db = await dbConn
  const categorias = await db.all('select * from categorias;')
  res.render('admin/categorias', {
    categorias
  })
})

app.get('/admin/categorias/delete/:id', async(req, res) => {
  const db = await dbConn
  await db.run('delete from categorias where id = ' + req.params.id + ';')
  res.redirect('/admin/categorias')
})

app.get('/admin/categorias/nova', async(req, res) => {
  const db = await dbConn
  res.render('admin/nova-categoria')
})

app.post('/admin/categorias/nova', async(req, res) => {
  const db = await dbConn
  const { categoria } = req.body
  await db.run(`insert into categorias(categoria) values ('${categoria}')`)
  res.redirect('/admin/categorias')
})


// Listener
app.listen(8080, (err) => {
  if (err) {
    console.log('JobiFy server is not running', err)
  } else {
    console.log('JobiFy server running')
  }
})