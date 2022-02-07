const express = require('express')
const routes = express.Router()
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')

//Aqui estou adicionar o caminho principal da aplicação
routes.get('/', DashboardController.index)
routes.get('/job', JobController.create)
// Eu estou pegando os dados enviando do formulário
routes.post('/job', JobController.save)
// Adicionamos um rota para adição usando o id
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

module.exports = routes
