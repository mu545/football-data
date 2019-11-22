var express = require('express');
var router = express.Router();

const home = require('./controllers/home.js')

router.route('/')
  .get(home)

module.exports = router;
