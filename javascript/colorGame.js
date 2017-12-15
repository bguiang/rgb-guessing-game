var colors; //Array of Strings of rgb colors

var easyModeTileCount = 3;
var hardModeTileCount = 6;
var currentModeTileCount = hardModeTileCount;

var clue;
var tiles;
var correctIndex;
var title;
var message;
var newColorsButton;
var hardButton;
var easyButton;


// Get DOM Elements Needed
function getDomElements(){
    tiles = document.getElementsByClassName("square");
    clue = document.querySelector("h1");
    title = document.getElementById("title");
    message = document.getElementById("message");
    newColorsButton = document.getElementById("newColorsButton");
    easyButton = document.getElementById("easyButton");
    hardButton = document.getElementById("hardButton");
}

function changeTileColors(color){
    for(var i = 0; i < tiles.length; i++)
    {
        tiles[i].style.backgroundColor = color;
    }    
}

//Returns an array of strings of random rgb values
function generateColors(size){
    var colorArray = []
    
    //Generate Color Array
    for(var i = 0; i < size; i++){
        var r = Math.floor((Math.random()*255));
        var g = Math.floor((Math.random()*255));
        var b = Math.floor((Math.random()*255));
        
        colorArray.push("rgb(" + r + ", " + g + ", " + b + ")");
    }
    return colorArray;
}

function resetGame(tileCount){
    newColorsButton.textContent = "NEW COLORS";
    message.textContent = "";
    //Generate Random Colors
    colors = generateColors(tileCount);
    
    correctIndex = Math.floor(Math.random()*tileCount);
    
    //Reset Title Color
    title.style.backgroundColor = "#232323";
    
    //Reset Tile visibility: Hide all tiles
    changeTileColors("#232323");
    
    //Unhide All tiles
    for(var i = 0; i < tiles.length; i++){
        tiles[i].style.display = "block";
    }
    
    //Hide unneeded tiles
    for(var i = tileCount; i < tiles.length; i++){
        tiles[i].style.display = "none";
    }
    
    //Reset Tile visibility: Color the tiles of the ones that matter
    for(var i = 0; i < tileCount; i++){
        tiles[i].style.backgroundColor = colors[i];
    }
    
    clue.textContent = colors[correctIndex];
}


function startGame(){
    getDomElements();
    
    newColorsButton.addEventListener("click", function() {
        resetGame(currentModeTileCount); 
    });

    easyButton.addEventListener("click", function() {
        currentModeTileCount = easyModeTileCount;
        resetGame(currentModeTileCount); 
        easyButton.classList.add("selected");
        hardButton.classList.remove("selected");
    });

    hardButton.addEventListener("click", function() {
        currentModeTileCount = hardModeTileCount;
        resetGame(currentModeTileCount); 
        easyButton.classList.remove("selected");
        hardButton.classList.add("selected");
    });

    // Add Listener to Each Tile
    for(var i = 0; i < tiles.length; i++){
        tiles[i].addEventListener("click", function (){
            if(colors[correctIndex] === this.style.backgroundColor){
            //Set Message
            message.textContent = "Correct!"

            //Color All Tiles that matter
            for(var i = 0; i < currentModeTileCount; i++){
                tiles[i].style.backgroundColor = colors[correctIndex];
            }

            //Color The Title
            title.style.backgroundColor = colors[correctIndex];

            //Change reset button text
            newColorsButton.textContent = "Play Again?"
            } 
            else {
                message.textContent = "Incorrect!!"
                this.style.backgroundColor = "#232323";
            }
        });
    }

    // Start Game in Hard Mode
    hardButton.click();
}

startGame();
