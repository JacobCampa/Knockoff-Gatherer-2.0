var searchedWord = document.getElementById("search")
var submit = document.querySelector("#submit")
var cards = document.querySelector("#cards")
var dropdown = document.querySelector("#options")
var pastSearches = document.querySelector("#history")
var imagesPop = []
var searchHistory = []

function addHistory(searchedWord) {
    if (searchHistory.includes(searchedWord)) {
      return
    }
    searchHistory.push(searchedWord)
    localStorage.setItem("search-history", searchHistory)
    renderHistory()
  }

  function renderHistory() {
    pastSearches.innerHTML = ""
    for (let index = 0; index < searchHistory.length; index++) {
  
      var li = document.createElement("li")
      li.class = 'sli';
        document.body.appendChild(li);
      li.textContent = searchHistory[index]
      pastSearches.append(li)
    } 
  }

function callApis(event) {
    // prevents multiple searches to populate at once
    cards.innerHTML = ""
    // keeps current search in search bar
    event.preventDefault()
    var userInput = searchedWord.value
    var userOption = dropdown.value
    console.log(userOption)
    console.log(userInput)
    var reqApi1 = `https://api.magicthegathering.io/v1/cards?${userOption}=${userInput}`
    // calls first api to populate card images and info
    fetch(reqApi1)
        .then((response) => {
            // first catch if the search aprameters find a bad request
            if (response.status !== 200) {
                var message = document.createElement("h1")
                message.class = 'sh1';
                document.body.appendChild(h1);
                message.innerHTML = `Something went wrong! Try again`
                cards.appendChild(message)
            } else {
                return response.json()
                
            }
        
            
        })
        .then((data) => {
            addHistory(userInput)
            var cardsFound = data.cards
            // second catch to determin if the search results are above zero
            if (cardsFound < 1) {
                var message2 = document.createElement("h1")
                message2.class = 'sh1';
                document.body.appendChild(h1);
                message2.innerHTML = `Something went wrong! Try again`
                cards.appendChild(message2)
            } else {
            for (let index = 0; index < cardsFound.length; index++) {
                var cardName = data.cards[index].multiverseid
                var reqApi2 = `https://api.scryfall.com/cards/multiverse/${cardName}`
                const element = cardsFound[index];
                // calls second api to obtain prices
                fetch(reqApi2)
                    .then((response) => {
                        console.log(response)
                        return response.json()
                    })
                    .then((cards2) => {
                        console.log(cards2)
                        var price = cards2.prices.usd
                        var cardDiv = document.createElement("div")
                        var cardIMG = document.createElement("img")
                        var priceTag = document.createElement("p")

                        cards2.prices.usd ?
                            priceTag.textContent = `Market Cost: $${price}` : priceTag.textContent = `Price Coming Soon!`

                        // ternary operator that checks if `data.cards.imageUrl contains a URL
                        data.cards[index].imageUrl ?
                            cardIMG.src = (data.cards[index].imageUrl) : cardIMG.src = './assets/Pictures/mtg_placeholder_2fc0d9ab-fcf0-448a-8c7c-566ae90fbf14_800x.webp'

                        console.log('george was here')
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
            }
        })
};
// starts the search process to call in apis
submit.addEventListener("click", callApis)