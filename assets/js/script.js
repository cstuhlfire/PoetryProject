// Poetry Project - script.js

// Global Definitions

// Element Selectors
let mySearchBtnEl = document.querySelector(".my-search-button");

// Function Calls

// Function Defintions
function getUserInput() {
    console.log("I got here");
    
}

// Event Handlers
mySearchBtnEl.addEventListener("click", getUserInput);



// read and store the input from the radio button
// read and store the typed text for search
// On submit, fetches by author or by title
// If more than one result, display modal with choices.
// If just one result display poem