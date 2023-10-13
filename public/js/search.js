var searchedWord = document.getElementById("search")
var submit = document.querySelector("#submit")
var cards = document.querySelector("#cards")
var dropdown = document.querySelector("#options")


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
    fetch("/search", {method: "POST", body: JSON.stringify({ userInput, userOption }), headers: {'Content-Type': 'application/json'}})
        .then((response) => {
            // first catch if the search aprameters find a bad request
            if (response.status !== 200) {
            } else {
                return response.json()
                .then((response) => {
                    console.log(response)
                // redirect
            })
        }
        
})
};
// starts the search process to call in apis
submit.addEventListener("click", callApi)