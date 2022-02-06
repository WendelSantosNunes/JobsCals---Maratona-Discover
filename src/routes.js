const express = require('express')
const routes = express.Router()
const basePath = __dirname + '/views'

const Profile = {
  data: {
    name: 'Wendel',
    avatar: 'https://github.com/WendelSantosNunes.png',
    'monthly-budget': 3000,
    'hours-per-day': 5,
    'days-per-week': 5,
    'vacation-per-year': 4,
    'value-hour': 75
  },
  controllers: {
    index(req, res) {
      return res.render(basePath + '/profile', { profile: Profile.data })
    },
    update(req, res) {
      // req.body para pegar os dados
      const data = req.body
      // definir quantas semanas tem um ano: 52
      const weeksPerYear = 52
      // remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
      const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12
      // quantas horas por semana estou trabalhando
      const weekTotalHours = data['hours-per-day'] * data['days-per-week']
      // total de horas trabalhadas no mês
      const monthLyTotalHours = weeksPerMonth * weekTotalHours
      // O valor da minha hora
      data['value-hour'] = data['monthly-budget'] / monthLyTotalHours

      Profile.data = data

      return res.redirect('/profile')
    }
  }
}

const Job = {
  data: [
    {
      id: 1,
      name: 'Pizzaria Guloso',
      'daily-hours': 2,
      'total-hours': 1,
      createdAt: Date.now()
    },
    {
      id: 2,
      name: 'OneTwo Project',
      'daily-hours': 3,
      'total-hours': 47,
      createdAt: Date.now()
    }
  ],
  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map(job => {
        const remaining = Job.services.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'

        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data['value-hour'])
        }
      })

      return res.render(basePath + '/index', { jobs: updatedJobs })
    },
    save(req, res) {
      const lastId = Job.data[Job.data.length - 1]?.id || 0

      // const job = req.body
      // job.createdAt = Date.now()
      // jobs.push(job)

      // Ou

      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        'daily-hours': req.body['daily-hours'],
        'total-hours': req.body['total-hours'],
        createdAt: Date.now() // Atribuindo uma nova data
      })
      // Depois de adicionar dentro do array, vamos redirecionar para página principal
      return res.redirect('/')
    },
    create(req, res) {
      return res.render(basePath + '/job')
    },
    show(req, res) {
      // Parâmentro da página
      const jobId = req.params.id
      // Estou verificando se contém esse parâmentro no array
      const job = Job.data.find(job => Number(job.id) === Number(jobId))
      // Essa é a função de erro
      if (!job) {
        return res.send('Job not found')
      }

      job.budget = Job.services.calculateBudget(job, Profile.data['value-hour'])

      return res.render(basePath + '/job-edit', { job })
    },
    update(req, res) {
      const jobId = req.params.id

      const job = Job.data.find(job => Number(job.id) === Number(jobId))

      if (!job) {
        return res.send('Job not found')
      }

      const updateJob = {
        ...job,
        name: req.body.name,
        'total-hours': req.body['total-hours'],
        'daily-hours': req.body['daily-hours']
      }

      Job.data = Job.data.map(job => {
        if (Number(job.id) === Number(jobId)) {
          job = updateJob
        }

        return job
      })

      res.redirect('/job/' + jobId)
    },
    delete(req, res) {
      const jobId = req.params.id

      Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

      return res.redirect('/')
    }
  },
  services: {
    remainingDays(job) {
      const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()

      const createDate = new Date(job.createdAt)
      const dueDay = createDate.getDate() + Number(remainingDays)
      const dueDate = createDate.setDate(dueDay)

      const timeDiffInMs = dueDate - Date.now()

      // transformar milli em dias
      const daysInMs = 1000 * 60 * 60 * 24
      const dayDiff = Math.floor(timeDiffInMs / daysInMs)

      return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job['total-hours']
  }
}

//Aqui estou adicionar o caminho principal da aplicação
routes.get('/', Job.controllers.index)

routes.get('/job', Job.controllers.create)

// Eu estou pegando os dados enviando do formulário
routes.post('/job', Job.controllers.save)

// Adicionamos um rota para adição usando o id
routes.get('/job/:id', Job.controllers.show)

routes.post('/job/:id', Job.controllers.update)

routes.post('/job/delete/:id', Job.controllers.delete)

routes.post('/profile', Profile.controllers.update)

module.exports = routes
