var express = require('express');
var router = express.Router();

const apis = require('./apis/index.js')

apis(router)

module.exports = router
