const express = require('express')
const routes = express.Router()
const basePath = __dirname + '/views'

const profile = {
  name: 'Wendel',
  avatar:
    'https://avatars.githubusercontent.com/u/63923854?s=400&u=7e089a2a2232d51f70ab5bfbb7a3f8a55ceefcd5&v=4',
  'monthly-budget': 3000,
  'hours-per-day': 5,
  'days-per-week': 5,
  'vacation-per-year': 4
}

//Aqui estou adicionar o caminho principal da aplicação
routes.get('/', (req, res) => {
  //Estou enviando uma resposta para navegador
  //Precisamos usar o caminho absoluto, pois um estático da problema.

  return res.render(basePath + '/index')
})

routes.get('/job/edit', (req, res) => {
  return res.render(basePath + '/job-edit')
})

routes.get('/job', (req, res) => {
  return res.render(basePath + '/job')
})

routes.get('/profile', (req, res) => {
  return res.render(basePath + '/profile', { profile })
})

module.exports = routes
