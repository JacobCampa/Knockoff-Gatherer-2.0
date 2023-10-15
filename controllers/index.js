//requirements: express.router and db/search routes.
const router = require('express').Router()

const dbRoutes = require('./api')
const searchRoutes = require('./search/searches.js')

//Path names
router.use('/api', dbRoutes)
router.use('/search', searchRoutes)

//Export
module.exports = router 