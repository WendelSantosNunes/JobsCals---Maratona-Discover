module.exports = {
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
