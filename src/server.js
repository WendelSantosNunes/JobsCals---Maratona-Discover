const express = require('express')
const server = express()
const routes = require('./routes')

// Adicionar um template
server.set('view engine', 'ejs')

server.use(express.static('public'))

// routes
server.use(routes)

// Criando o servidor
server.listen(3001, () => console.log('rodando'))
