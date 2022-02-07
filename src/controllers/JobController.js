const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  save(req, res) {
    const lastId = Job.get()[Job.get().length - 1]?.id || 0

    Job.get().push({
      id: lastId + 1,
      name: req.body.name,
      'daily-hours': req.body['daily-hours'],
      'total-hours': req.body['total-hours'],
      createdAt: Date.now() // Atribuindo uma nova data
    })

    return res.redirect('/')
  },
  create(req, res) {
    return res.render('job')
  },
  show(req, res) {
    // Parâmentro da página
    const jobId = req.params.id
    // Estou verificando se contém esse parâmentro no array
    const job = Job.get().find(job => Number(job.id) === Number(jobId))
    // Essa é a função de erro
    if (!job) {
      return res.send('Job not found')
    }

    job.budget = JobUtils.calculateBudget(job, Profile.get()['value-hour'])

    return res.render('job-edit', { job })
  },
  update(req, res) {
    const jobId = req.params.id

    const job = Job.get().find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return res.send('Job not found')
    }

    const updateJob = {
      ...job,
      name: req.body.name,
      'total-hours': req.body['total-hours'],
      'daily-hours': req.body['daily-hours']
    }

    const newJobs = Job.get().map(job => {
      if (Number(job.id) === Number(jobId)) {
        job = updateJob
      }

      return job
    })

    Job.update(newJobs)

    res.redirect('/job/' + jobId)
  },
  delete(req, res) {
    const jobId = req.params.id

    Job.delete(jobId)

    return res.redirect('/')
  }
}
