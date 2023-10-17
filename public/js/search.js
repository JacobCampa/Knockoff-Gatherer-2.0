const submit = document.querySelector("#submit")
const cards = document.querySelector("#cards")
const cardName = document.getElementById("cardName")
const cmc = document.getElementById("cmc")
const color = document.getElementById("color")
const type = document.getElementById("type")
const subtype = document.getElementById("subtype")
const rarity = document.getElementById("rarity")
const set = document.getElementById("set")
const artist = document.getElementById("artist")

function callApi(event) {
    // prevents multiple searches to populate at once
    cards.innerHTML = ""
    // keeps current search in search bar
    event.preventDefault()
    const inputName = cardName.value
    const inputCmc = cmc.value
    const inputColor = color.value
    const inputType = type.value
    const inputSubtype = subtype.value
    const inputRarity = rarity.value
    const inputSet = set.value
    const inputArtist = artist.value

    fetch("/search", {method: "POST", body: JSON.stringify({ inputName, inputCmc, inputColor, inputType, inputSubtype, inputRarity, inputSet, inputArtist }), headers: {'Content-Type': 'application/json'}})
        .then((response) => {
            // first catch if the search aprameters find a bad request
            if (response.status !== 200) {
            } else {
                return response.json()
                .then((response) => {
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