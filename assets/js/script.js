// Poetry Project - script.js

// Global Definitions


// Element Selectors
let mySearchBtnEl = document.querySelector(".my-search-button");
let myRadioEl = document.getElementsByName("radio-button");
let myInputEl = document.querySelector(".my-search-input");
let myDisplayEl = document.getElementById("poem-text");

// Function Calls

// Function Defintions
function fetchByAuthor(input) {
 
        let apiSearch = "https://poetrydb.org/author,poemcount/"+input+";1/author,title,lines.json";
        fetch(apiSearch)
        .then(response => response.json())
        .then(data => {
            
            displayPoem(data);

        });

}

function fetchByTitle(input) {

    let apiSearch = "https://poetrydb.org/title,poemcount/"+input+";1/author,title,lines.json";
    fetch(apiSearch)
    .then(response => response.json())
    .then(data => {
        
        displayPoem(data);
    });
}

function chooseFetch(search, input) {
    if (search === "author") {
        fetchByAuthor(input);
        
    } else {
        fetchByTitle(input);
        
    }
}

function displayPoem(myObject){
    let i=0;
    let myEl = document.createElement("p");
    // display title
    myEl.textContent = myObject[i].title;
    myDisplayEl.appendChild(myEl);

    // display author
    myEl = document.createElement("p");
    myEl.textContent = myObject[i].author;
    myDisplayEl.appendChild(myEl);

    // display lines
    
    let myLines= myObject[i].lines;
    for (let i = 0; i < myLines.length; i++) {
        myEl = document.createElement("p");
        myEl.textContent = myLines[i];
        myDisplayEl.appendChild(myEl);
        
    }
    console.log(myObject);
}


function getUserInput() {
    let searchType = "";
    let textInput = "";

    

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
// On submit, fetches by author or by title***
// If more than one result, display modal with choices.
// If just one result display poem