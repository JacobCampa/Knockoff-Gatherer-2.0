const router = require('express').Router()

const dbRoutes = require('./api')
const searchRoutes = require('./search/searches.js')

router.use('/api', dbRoutes)
router.use('/search', searchRoutes)

module.exports = router 