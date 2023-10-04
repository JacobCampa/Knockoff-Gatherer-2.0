const router = require('express').Router() 

router.get('/', async (req, res) => {
    const userInput = req.body.name
    const userOption = req.body.type
    const api1 =  `https://api.magicthegathering.io/v1/cards?${userOption}=${userInput}`

    fetch(api1)
        .then((response) => {
            if(response.status !== 200) {

            } else {
                return response.json
            }
        })
        .then((data) => {
            const cardsFound = data.cards
            if (cardsFound < 1) {
                
            } else {
            for (let i =0; i < cardsFound.length; index++) {
                const cardName = data.cards[i].multiverseid
                const api2 = `https://api.scryfall.com/cards/multiverse/${cardName}`
                const element = cardsFound[i]
                fetch(api2)
                .then((response) => {
                    return response.json
                })
                .then((cards2) => {
                    
                })
            }    
            }
        })
})