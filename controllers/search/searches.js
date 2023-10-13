const router = require('express').Router() 

router.get('/', async (req, res) => {
    const userInput = req.body.input
    const userOption = req.body.option
    const api =  `https://api.scryfall.com/cards/search?q=${userOption}=${userInput}`
    fetch(api)
    .then((response) => {
        console.log(response)
        return response.json
    })
})


module.exports = router