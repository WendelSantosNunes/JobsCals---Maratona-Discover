const express = require('express')
const server = express()
const routes = require('./routes')
const path = require('path')
// Adicionar um template engine
server.set('view engine', 'ejs')

// server.use adicionar configurações dentro do express

// Mudar a localização da pastar views
server.set('views', path.join(__dirname, 'views'))

// Habilitando o uso de arquivo estáticos
server.use(express.static('public'))

// Libera o body do req de um formulário
server.use(express.urlencoded({ extended: true }))

// routes
server.use(routes)

// Criando o servidor
server.listen(3000, () => console.log('rodando'))
