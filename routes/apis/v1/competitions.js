var http = require('http')
var { param, validationResult } = require('express-validator')

function validationInput(req, res, next) {
  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400).json({ err: errors.array({ onlyFirstError: true }) })
  } else {
    next()
  }
}

function grabCompetitions(req, res, next) {
  let filters = ''

  for (var filter in res.locals.input) {
    filters += `${filter}${res.locals.input[filter]}`
  }

  let options = {
    method: 'GET',
    hostname: 'api.football-data.org',
    port: null,
    path: `/v2/${filters}`,
    headers: {
      'X-AUTH-TOKEN': process.env.FOOTBALL_API_KEY
    }
  }

  let fetchCompetitions = http.request(options, function (getCompetitions) {
    let chunks = []

    getCompetitions.on('data', function (chunk) {
      chunks.push(chunk)
    })

    getCompetitions.on('end', function () {
      res.locals.competitions = JSON.parse(Buffer.concat(chunks))

      if (typeof res.locals.competitions.error !== 'undefined') {
        res.status(400).json({ err: res.locals.competitions.error })
      } else {
        next()
      }
    })
  })
  fetchCompetitions.on('error', function(err) {
    res.status(400).json({ err: err.message })
  })
  fetchCompetitions.end()
}

function getListInput(req, res, next) {
  res.locals.input = {
    '/competitions': ''
  }

  next()
}

module.exports.getList = [
  getListInput,
  grabCompetitions,
  function (req, res) {
    res.json({
      competitions: res.locals.competitions
    })
  }
]

function getLeagueInput(req, res, next) {
  res.locals.input = {
    '/competitions': `/${req.params.league}`
  }

  next()
}

module.exports.getLeague = [
  param('league')
    .isNumeric().withMessage('league id not valid'),
  validationInput,
  getLeagueInput,
  grabCompetitions,
  function (req, res) {
    res.json({
      competition: res.locals.competitions
    })
  }
]

function getMatchesInput(req, res, next) {
  res.locals.input = {
    '/competitions': `/${req.params.league}`,
    '/matches': `?season=${req.params.year}`
  }

  next()
}

module.exports.getMatches = [
  param('league')
    .isNumeric().withMessage('league id not valid'),
  param('year')
    .isNumeric().withMessage('year not valid'),
  validationInput,
  getMatchesInput,
  grabCompetitions,
  function (req, res) {
    res.json({
      competition: res.locals.competitions
    })
  }
]
