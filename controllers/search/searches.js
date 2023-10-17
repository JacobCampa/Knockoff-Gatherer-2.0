const router = require('express').Router();
const withAuth = require('../../utils/auth');
//POSTS user search
// localhost:33001/searchengine
router.post('/', withAuth, async (req, res) => {
    //gets user Input and Option picks ad plugs them into search API
    const input = req.body.userInput
    const userOption = req.body.userOption
    console.log(input)
    console.log(req.body)
    const api =  `https://api.scryfall.com/cards/search?q=${input}`
    console.log(api)
    fetch(api)
    //Returns JSON from search listed above
    .then((response) => {
        return response.json()
    })
    //grabs JSON and makes Data
    .then((data) => {
        console.log(data)
        res.json(data)
    })
})


module.exports = router