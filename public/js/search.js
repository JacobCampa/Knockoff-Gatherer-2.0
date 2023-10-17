var submit = document.querySelector("#submit")
var cards = document.querySelector("#cards")
var cardName = document.getElementById("cardName")
var cmc = document.getElementById("cmc")
var color = document.getElementById("color")
var type = document.getElementById("type")
var subtype = document.getElementById("subtype")
var rarity = document.getElementById("rarity")
var set = document.getElementById("set")
var artist = document.getElementById("artist")

function callApi(event) {
    // prevents multiple searches to populate at once
    cards.innerHTML = ""
    // keeps current search in search bar
    event.preventDefault()
    var inputName = cardName.value
    var inputCmc = cmc.value
    var inputColor = color.value
    var inputType = type.value
    var inputSubtype = subtype.value
    var inputRarity = rarity.value
    var inputSet = set.value
    var inputArtist = artist.value

    fetch("/search", {method: "POST", body: JSON.stringify({inputName, inputCmc, inputColor, inputType, inputSubtype, inputRarity, inputSet, inputArtist}), headers: {'Content-Type': 'application/json'}})
        .then((response) => {
            // first catch if the search aprameters find a bad request
            if (response.status !== 200) {
            } else {
                return response.json()
                .then((response) => {
                    console.log(response)
                    response.cards.forEach((card , index) => {
                        const cardDiv = document.createElement('div')
                        const cardInfo = document.createElement("div")
                        const getArt = card.artist
                        const cardArtist = document.createElement("p")
                        cardArtist.textContent = `Artist: ${getArt}`
                        const getSet = card.setName
                        const cardSet = document.createElement("p")
                        cardSet.textContent = `Set: ${getSet}`
                        const getName = card.name
                        const cardName = document.createElement("p")
                        cardName.textContent = `Name: ${getName}`
                        const cardImg = document.createElement("img")
                        
                        card.imageUrl ?
                        cardImg.src = (card.imageUrl) : cardImg.src = '/css/pictures/mtg_placeholder_2fc0d9ab-fcf0-448a-8c7c-566ae90fbf14_800x.webp'

                        cardInfo.append(cardName)
                        cardInfo.append(cardArtist)
                        cardInfo.append(cardSet)
                        cardDiv.append(cardInfo)
                        cardDiv.append(cardImg)
                        cards.append(cardDiv)
                        
                    });
            })
        }
        
})
};
// starts the search process to call in apis
submit.addEventListener("click", callApi)