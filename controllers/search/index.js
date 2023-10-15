//Requires Express reouter and file searches.js
const router = require('express').Router()
const search = require('./searches.js')
//Uses / as search path
router.use('/', search)
//Exports to router
module.exports = router