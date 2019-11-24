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

function grabData(req, res, next) {
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
      res.locals.data = JSON.parse(Buffer.concat(chunks))

      if (typeof res.locals.data.error !== 'undefined') {
        res.status(400).json({ err: res.locals.data.error })
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
  grabData,
  function (req, res) {
    res.json({
      competitions: res.locals.data.competitions
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
  grabData,
  function (req, res) {
    res.json({
      league: res.locals.data
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
  grabData,
  function (req, res) {
    res.json({
      matches: res.locals.data.matches
    })
  }
]

function getMatchInput(req, res, next) {
  res.locals.input = {
    '/matches': `/${req.params.match}`
  }

  next()
}

module.exports.getMatch = [
  param('match')
    .isNumeric().withMessage('match id not valid'),
  validationInput,
  getMatchInput,
  grabData,
  function (req, res) {
    res.json({
      match: res.locals.data.match
    })
  }
]

function getTeamsInput(req, res, next) {
  res.locals.input = {
    '/competitions': `/${req.params.league}`,
    '/teams': `?session=${req.params.year}`
  }

  next()
}

module.exports.getTeams = [
  param('league')
    .isNumeric().withMessage('league id not valid'),
  param('year')
    .isNumeric().withMessage('year not valid'),
  validationInput,
  getTeamsInput,
  grabData,
  function (req, res) {
    res.json({
      teams: res.locals.data.teams
    })
  }
]

function getTeamInput(req, res, next) {
  res.locals.input = {
    '/teams': `/${req.params.team}`
  }

  next()
}

module.exports.getTeam = [
  param('team')
    .isNumeric().withMessage('team id not valid'),
  validationInput,
  getTeamInput,
  grabData,
  function (req, res) {
    res.json({
      team: res.locals.data
    })
  }
]

function getStandingsInput(req, res, next) {
  res.locals.input = {
    '/competitions': `/${req.params.league}`,
    '/standings': ''
  }

  next()
}

module.exports.getStandings = [
  param('league')
    .isNumeric().withMessage('league id not valid'),
  validationInput,
  getStandingsInput,
  grabData,
  function (req, res) {
    res.json({
      standings: res.locals.data.standings
    })
  }
]

function getScorersInput(req, res, next) {
  res.locals.input = {
    '/competitions': `/${req.params.league}`,
    '/scorers': ''
  }

  next()
}

module.exports.getScorers = [
  param('league')
    .isNumeric().withMessage('league id not valid'),
  validationInput,
  getScorersInput,
  grabData,
  function (req, res) {
    res.json({
      scorers: res.locals.data.scorers
    })
  }
]

function getPlayerInput(req, res, next) {
  res.locals.input = {
    '/players': `/${req.params.player}`
  }

  next()
}

module.exports.getPlayer = [
  param('player')
    .isNumeric().withMessage('player id not valid'),
  validationInput,
  getPlayerInput,
  grabData,
  function (req, res) {
    res.json({
      player: res.locals.data
    })
  }
]
