// Poetry Project - script.js

// Global Definitions

// Element Selectors
let mySearchBtnEl = document.querySelector(".my-search-button");
let myRadioEl = document.getElementsByName("radio-button");
let myInputEl = document.querySelector(".my-search-input");
let myDisplayEl = document.getElementById("poem-text");
let myTitleEl = document.getElementById("poem-title");
let myAuthorEl = document.getElementById("poem-author");
let mySearchResultsEl = document.getElementById("search-results");
let myPoemCountEl = document.getElementById("poem-count");
let mySelectedTextEl = document.querySelector(".selected-text");

// Function Calls
init();

// Function Defintions
function init(){
  // Call function to fetch and display random poem on open.
  fetchRandom();
}

function fetchRandom() {
  let apiSearch = "https://poetrydb.org/random/1.json";

  // Fetch and display random poem
  fetch(apiSearch)
    .then((response) => response.json())
    .then((data) => {

      displayPoem(data);

    });
}

function fetchByAuthor(input) {
  let apiSearch =
    "https://poetrydb.org/author/" + input + "/author,title,lines.json";
  fetch(apiSearch)
    .then((response) => response.json())
    .then((data) => {

      // Display first poem and a list of search results
      displayPoem(data);
      displaySearchResults(data);
      
    });
  }
  
  function fetchByTitle(input) {
    let apiSearch =
    "https://poetrydb.org/title/" + input + "/author,title,lines.json";
    
    fetch(apiSearch)
    .then((response) => response.json())
    .then((data) => {
      
      // Display first poem and a list of search results
      displayPoem(data);
      displaySearchResults(data);

    });
}

function chooseFetch(search, input) {
  if (search === "author") {
    fetchByAuthor(input);
  } else {
    fetchByTitle(input);
  }
}


function displaySearchResults(myObject) {

mySearchResultsEl.innerHTML = "";
  console.log(myObject);

  myPoemCountEl.textContent = myObject.length + " Poems Found";
  
  for (let i = 0; i < myObject.length; i++) {
        let myEl = document.createElement("p");
        myEl.textContent = myObject[i].title+", "+myObject[i].author;
        mySearchResultsEl.appendChild(myEl);     
    }
}

function displayPoem(myObject) {
  let i = 0;

  // clear the poem
  myDisplayEl.innerHTML = "";

  // display title
  myTitleEl.textContent = myObject[i].title;

  // display author
  myAuthorEl.textContent = myObject[i].author;

  // display lines
  let myLines = myObject[i].lines;
  for (let i = 0; i < myLines.length; i++) {
    let myEl = document.createElement("p");
    myEl.textContent = myLines[i];
    myDisplayEl.appendChild(myEl);
  }
}

function getUserInput() {
  let searchType = "";
  let textInput = "";

  // loop through radio buttons and look for checked button
  for (let i = 0; i < myRadioEl.length; i++) {
    if (myRadioEl[i].checked) {
      searchType = myRadioEl[i].value;
    }
  }

  textInput = myInputEl.value;
  chooseFetch(searchType, textInput);
}


function fetchDefinition(lookUpWord) {
  let apiKey = "53fce5b3-3370-4472-9dab-9d3c8647943e";

fetch("https://www.dictionaryapi.com/api/v3/references/collegiate/json/"+lookUpWord+"?key="+apiKey)
    .then(response => response.json())
    .then(data => {
        console.log(data[0].shortdef[0]);
        console.log(data[0].fl);
    });
}



function getSelectedText() {
  let selectedText = "";

  // window.getSelection
  if (window.getSelection) {
    selectedText = window.getSelection().toString();
    fetchDefinition(selectedText);
  }
}

// Event Handlers
mySearchBtnEl.addEventListener("click", getUserInput);
mySelectedTextEl.addEventListener("mouseup", getSelectedText);