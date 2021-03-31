// Poetry Project - script.js

// Global Definitions
let searchType = "";

// Element Selectors
let mySearchBtnEl = document.querySelector(".my-search-button");
let myRadioEl = document.getElementsByName("radio-button");

// Function Calls

// Function Defintions
function getUserInput() {
    console.log("I got here");

    // loop through radio buttons and look for checked button
    for (let i = 0; i < myRadioEl.length; i++) {

        if(myRadioEl[i].checked) {
            searchType = myRadioEl[i].value;
        }
    }

    
}

// Event Handlers
mySearchBtnEl.addEventListener("click", getUserInput);



// read and store the input from the radio button
// read and store the typed text for search
// On submit, fetches by author or by title
// If more than one result, display modal with choices.
// If just one result display poem