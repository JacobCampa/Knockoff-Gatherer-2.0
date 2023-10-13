var searchedWord = document.getElementById("search")
var submit = document.querySelector("#submit")
var cards = document.querySelector("#cards")
var dropdown = document.querySelector("#options")
const path =  require ('../controllers/search/searches.js')


function callApi(event) {
    // prevents multiple searches to populate at once
    cards.innerHTML = ""
    // keeps current search in search bar
    event.preventDefault()
    var userInput = searchedWord.value
    var userOption = dropdown.value
    console.log(userOption)
    console.log(userInput)
    // 
    // calls first api to populate card images and info
    fetch(path)
        .then((response) => {
            // first catch if the search aprameters find a bad request
            if (response.status !== 200) {
                var message = document.createElement("h1")
                message.class = 'sh1';
                document.body.appendChild(h1);
                message.innerHTML = `Something went wrong! Try again`
                cards.appendChild(message)
            } else {
                for (let index = 0; index < cardsFound.length; index++)
                return response.json()
                .then((response) => {
                    console.log(response)
                    return response.json()
                })
                .then((cards) => {
                    console.log(cards)
                    var cardDiv = document.createElement("div")
                    var cardIMG = document.createElement("img")
                    var priceTag = document.createElement("p")

                    // creates elements to show results from search
                    var getArt = data.cards[index].artist
                    var artTag = document.createElement("p")
                    artTag.textContent = `Artist: ${getArt}`
                    var getSet = data.cards[index].setName
                    var setTag = document.createElement("p")
                    setTag.textContent = `Set: ${getSet}`
                    var cardInfo = document.createElement("div")
                    cardInfo.appendChild(priceTag)
                    cardInfo.appendChild(artTag)
                    cardInfo.appendChild(setTag)
                    cardDiv.appendChild(cardIMG)
                    cardDiv.appendChild(cardInfo)
                    cards.appendChild(cardDiv)
                
            })
        }
        
})
};
// starts the search process to call in apis
submit.addEventListener("click", callApi)