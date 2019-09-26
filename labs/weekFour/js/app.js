//Saad Islam
//Animation Lab 9/26/19

var theplace = document.querySelector("#theplace");
var cardTemplate = document.querySelector("#cardTemplate");
var titleSelector = document.querySelector(".title");
var bigSquareSelect = document.querySelector(".bigSquare");

var suits = [ "", ""];
var values = [ " ", "", ""];

var i = 0;
for(i=0; i<6; i++) {
    //We know we have a specific combination of suit + value
    
    //create and customize the element
    let newCard = document.createElement("div");
    newCard.classList.add("card");
    
    
    
    //set up connections and events
    newCard.addEventListener("mouseover", onCardOver);
    newCard.addEventListener("mouseout", onCardOut);
    newCard.addEventListener("mousedown", onCardDown);
    
    //put onto the page
    theplace.appendChild(newCard);
    
}
function onCardOver(event) {
    event.target.style.animationDelay = "0s";
    event.target.classList.add("cardOver");
    event.target.classList.remove("cardOut");
 
}

function onCardOut(event) {
    event.target.classList.add("cardOut");
    event.target.classList.remove("cardOver");
  
}

function onCardDown(event) {
    event.target.classList.add("cardDown");

  
}

titleSelector.addEventListener("mousedown", onTitleDown);

function onTitleDown(event){
    event.target.classList.add("titleDown");
}

bigSquareSelect.addEventListener("mousedown", bigSquareDown);

function bigSquareDown(){
    event.target.classList.add("bigSquareDown");
}