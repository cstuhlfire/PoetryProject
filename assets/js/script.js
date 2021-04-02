// Poetry Project - script.js

// Global Definitions
let wordArray = [];
let storageArray ="storageArray";
let maxWords = 10;
let titleSearch = true;

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
let lookWordEl = document.getElementById("look-word");
let defTextEl = document.getElementById("def-text");
let wordListEl = document.getElementById("word-list");

// Function Calls
init();

// Function Defintions
function init() {
  // Call function to fetch and display random poem on open.
  fetchRandom();

  // Get recent search words from localStorage
  let tempArray = JSON.parse(localStorage.getItem(storageArray));

  if (tempArray !== null && tempArray.length > 0) {
    wordArray = tempArray;

    // Render recent searches and details
    displayWordList();
  }
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
      if (data.length > 0) {
        displayPoem(data);
        displaySearchResults(data);      
      } else {
        return;
      }
    });
}

function fetchByTitle(input) {
  let apiSearch =
    "https://poetrydb.org/title/" + input + "/author,title,lines.json";

  fetch(apiSearch)
    .then((response) => response.json())
    .then((data) => {
      // Display first poem and a list of search results
      if (data.length > 0) {
        displayPoem(data);
        if (titleSearch) {
          displaySearchResults(data);      
        }

        titleSearch = true;
      }
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
    myEl.textContent = myObject[i].title + ", " + myObject[i].author;
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
  myInputEl.value = "";
}

//fetch the definition and the part of speech
function fetchDefinition(lookUpWord) {
  let apiKey = "53fce5b3-3370-4472-9dab-9d3c8647943e";
  let definition = "";
  let partOfSpeech = "";

  fetch(
    "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" +
      lookUpWord +
      "?key=" +
      apiKey
  )
    .then((response) => response.json())
    .then((data) => {

      if (data.length > 0 && data !== undefined) {
        console.log(typeof(data));
        definition = data[0].shortdef[0];
        partOfSpeech = data[0].fl;
  
        displayDefinition(lookUpWord, definition, partOfSpeech);
        // add new word to word list array
        addWordArray(lookUpWord);
        
      } else {
        return;
      }
    });
}

function displayDefinition(lookUpWord, definition, partOfSpeech) {
  lookWordEl.textContent = lookUpWord;
  defTextEl.textContent = "("+partOfSpeech+") "+ definition;
 
}

function displayWordList(){
  // Clear HTML
  wordListEl.innerHTML = "";

  //Creating word list
  for (let i = 0; i < wordArray.length; i++) {
    let myEl = document.createElement("p");
    myEl.textContent = wordArray[i];
    wordListEl.appendChild(myEl);
  }
}

function addWordArray(word){
  let found = 0;

  found = wordArray.indexOf(word);
  if (found < 0) {
    // If the city is not in the array, add it
    wordArray.unshift(word);
  } else {
    // If the city is already in the array, move it to the first element
    wordArray.splice(found, 1);
    wordArray.unshift(word);
  }

  wordArray.splice(maxWords);

  // wordListEl.innerHTML = "";
  // wordArray.unshift(word);
 
  displayWordList();
  storeWordList();

}

//local storage function 
function storeWordList() {
  // stringify the Array and store it in localStorage
  localStorage.setItem(storageArray, JSON.stringify(wordArray));
}

//selected word from the window
function getSelectedText() {
  let selectedText = "";

  // window.getSelection
  if (window.getSelection) {
    selectedText = window.getSelection().toString();
    selectedText = selectedText.trim();

    if (selectedText.length > 0 ) {
      fetchDefinition(selectedText);
    }

  }
}

function getSelectedPoem(event) {
  let idx = 0;
  let str = "";
  let title = [];
  let firstItem = 0;

  str = event.target.textContent;
  idx = str.indexOf(",");

  if (idx > -1) { 
    title = str.split(',') 
  } 

  title = title[firstItem];
  if(title.length > 0) {
    titleSearch = false;
    fetchByTitle(title);
  }
}

// Event Handlers
mySearchBtnEl.addEventListener("click", getUserInput);
mySelectedTextEl.addEventListener("mouseup", getSelectedText);
mySearchResultsEl.addEventListener("click", getSelectedPoem);
