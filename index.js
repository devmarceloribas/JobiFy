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

  // Add record at the table
  //const categoria = 'Engeneering Team'
  //await db.run(`insert into categorias (categoria) values ('${categoria}');`)
  
  //const categoria2 = 'Marketing Team'
  //await db.run(`insert into categorias (categoria) values ('${categoria2}');`)

  
  //const categoria = 1
  //const titulo = 'Fullstack Developer (Remote)'
  //const descricao = 'Vaga para quem realizou o treinamento FullStack Developer'
  //await db.run(`insert into vagas(categoria, titulo, descricao) values (${categoria}, '${titulo}', '${descricao}')`)

  //const categoria = 2
  //const titulo = 'Social Midia (São Paulo)'
  //const descricao = 'Responsavel por todas as midias socias'
  //await db.run(`insert into vagas(categoria, titulo, descricao) values (${categoria}, '${titulo}', '${descricao}')`)
  
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

// Category

app.get('/admin/categorias', async(req, res) => {
  const db = await dbConn
  const categorias = await db.all('select * from categorias;')
  res.render('admin/categorias', {
    categorias
  })
})



app.listen(8080, (err) => {
  if (err) {
    console.log('JobiFy server is not running', err)
  } else {
    console.log('JobiFy server running')
  }
})