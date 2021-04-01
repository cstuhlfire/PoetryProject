// Poetry Project - script.js

// Global Definitions
let dataObject={};

// Element Selectors
let mySearchBtnEl = document.querySelector(".my-search-button");
let myRadioEl = document.getElementsByName("radio-button");
let myInputEl = document.querySelector(".my-search-input");

// Function Calls

// Function Defintions
function fetchByAuthor(input) {
 
        let apiSearch = "https://poetrydb.org/author,poemcount/"+input+";1/author,title,lines.json";
        fetch(apiSearch)
        .then(response => response.json())
        .then(data => {
            let dataObject=data;
            console.log(dataObject);

        });

}

function fetchByTitle(input) {

    let apiSearch = "https://poetrydb.org/title,poemcount/"+input+";1/author,title,lines.json";
    fetch(apiSearch)
    .then(response => response.json())
    .then(data => {
        console.log(data)  
    });
}

function chooseFetch(search, input) {
    if (search === "author") {
        fetchByAuthor(input);
        console.log("fetch author");
    } else {
        fetchByTitle(input);
        console.log("fetch title");
    }
}


function getUserInput() {
    let searchType = "";
    let textInput = "";

    console.log("I got here");

    // loop through radio buttons and look for checked button
    for (let i = 0; i < myRadioEl.length; i++) {

        if(myRadioEl[i].checked) {
            searchType = myRadioEl[i].value;
        }
    }

    textInput = (myInputEl.value);
    chooseFetch(searchType, textInput);
}

// Event Handlers
mySearchBtnEl.addEventListener("click", getUserInput);



// read and store the input from the radio button***
// read and store the typed text for search***
// On submit, fetches by author or by title
// If more than one result, display modal with choices.
// If just one result display poem