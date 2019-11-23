const competitions = require('./v1/competitions.js')

module.exports = function (router) {
  router.route('/api/v1/competitions')
    .get(competitions.getList)

  router.route('/api/v1/league/:league')
    .get(competitions.getLeague)

  router.route('/api/v1/matches/:league/:year')
    .get(competitions.getMatches)

  router.route('/api/v1/teams/:league/:year')
    .get(competitions.getTeams)
}
