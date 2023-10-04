const router = require('express').Router()

const search = require('./searches.js')

router.use('/', search)

module.exports = router