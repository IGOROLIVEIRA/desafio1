const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

const ageMinorMajor = age => {
  return age >= 18
}

const checkAgeMiddleware = (req, res, next) => {
  const { age } = req.query
  if (!age) return res.render('age')

  return next()
}

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('age')
})

app.post('/check', (req, res) => {
  let age = req.body.age
  if (ageMinorMajor(age)) return res.render('major', { age })
  else return res.render('minor', { age })
})

app.get('/minor/', checkAgeMiddleware, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

app.get('/major/', checkAgeMiddleware, (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

app.listen(3000)
