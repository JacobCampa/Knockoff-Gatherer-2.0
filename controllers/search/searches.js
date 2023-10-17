const router = require('express').Router();
const withAuth = require('../../utils/auth');
//POSTS user search
// localhost:33001/searchengine
router.post('/', withAuth, async (req, res) => {
    //gets user Input and Option picks ad plugs them into search API
    const cardName = req.body.inputName
    const cmc = req.body.inputCmc
    const color = req.body.inputColor
    const type = req.body.inputType
    const subtype = req.body.inputSubtype
    const rarity = req.body.inputRarity
    const set = req.body.inputSet
    const artist = req.body.inputArtist
    const api =  `https://api.magicthegathering.io/v1/cards?name=${cardName}&cmc=${cmc}&colors=${color}&types=${type}&subtypes=${subtype}&rarity=${rarity}&set=${set}&artist=${artist}`
    fetch(api)
    //Returns JSON from search listed above
    .then((response) => {
        return response.json()
    })
    //grabs JSON and makes Data
    .then((data) => {
        res.json(data)
    })
})


module.exports = router