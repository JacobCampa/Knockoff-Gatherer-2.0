const router = require('express').Router() 
// localhost:33001/searchengine
router.post('/', async (req, res) => {
    const input = req.body.userInput
    const userOption = req.body.userOption
    console.log(input)
    console.log(req.body)
    const api =  `https://api.scryfall.com/cards/search?q=${input}`
    console.log(api)
    fetch(api)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        res.json(data)
    })
})


module.exports = router