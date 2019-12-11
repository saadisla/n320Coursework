/* get the audio tag here
var myAudio = document.getElementById("myAudio");

//myAudio.play();

function playAudio(){
    myAudio.play();
}

function stopMainAudio(){
    myAudio.pause();
    myAudio.currentTime = 0;
} */

var soundButtons = document.getElementById("soundButtons");

var sounds = [
    "chimes_long.mp3", "click_clock_loop.mp3",
    "pop_10.mp3", "puff.mp3", "rustle_5.mp3"
];

var soundElements = [];

//loop through all sounds and create audio tags

sounds.forEach((soundURL, idx) =>{
    //sound
    var newSound = new Audio("sounds/" +soundURL);
    //console.log(newSound);

    //store each sound in an array for later reference
    soundElements.push(newSound);

    //buttons for sound
    var newButton = document.createElement("button");

    //newButton.innerHTML = soundURL; 
    if(soundURL == "chimes_long.mp3"){
        newButton.innerHTML = "Chimes";
    }else if(soundURL == "click_clock_loop.mp3"){
        newButton.innerHTML = "Clock";
    }else if(soundURL == "pop_10.mp3"){
        newButton.innerHTML = "Pop";
    }else if(soundURL == "puff.mp3"){
        newButton.innerHTML = "Puff";
    }else if(soundURL == "rustle_5.mp3"){
        newButton.innerHTML = "Rustle";
    }


    //store sounds
    newButton.setAttribute("data-sound-id", idx);
    //add to page
    soundButtons.appendChild(newButton);

    //listen for a click on the button and invoke play sound function

    newButton.addEventListener("click", playSoundInArray);

})

console.log(soundElements);

function playSoundInArray(event){
    //get sound index
    var soundIndex = Number( event.target.getAttribute("data-sound-id")); 

    //get sound from array 
    var selectedSound = soundElements[soundIndex];
    //console.log(selectedSound);

    selectedSound.play();
}