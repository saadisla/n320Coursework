//creating the Vue application
var app = new Vue({
    //refers to html element
    el: "#app",
    //data/objects that make up the tic-tac-toe game
    data: {
        //stays false until a player wins
        gameOver: false, 
        
        //used to swap between player turns
        playerTurn: "X", 
        
        //creates a 3x3 grid for game
        grid: [
            [" "," "," "],
            [" "," "," "],
            [" "," "," "]
        ],

        //a numeric counter that calls a draw if no one wins in 9 turns
        ticCounter:0,
        drawGame:false
    },

    //methods
    methods: {

        //selects the cell and modifies value
        selectCell: function(row,col){ 
            //an if statement that makes sure cannot interact with tic tac toe elements that have been interacted w/ already  
            if(this.grid[row][col] == 0 && this.gameOver == false){
                //copy grid to a temporary variable
                var tempGrid = this.grid.slice(0);

                //modify the copied grid 
                tempGrid[row][col] = this.playerTurn;
                
                //replaces the grid with the copied version of the tempgrid
                //so it updates and becomes the current grid
                this.grid = tempGrid;

                //swap player turn
                //cool syntax to use instead of if statements, thanks Travis!
                this.playerTurn = (this.playerTurn == "X") ? "O" : "X";

                //add to the ticCounter
                this.ticCounter++;

                //check for win
                this.checkWin();
            }
        },

        //checks for win 
        checkWin: function(){
            //loop through all columns to check 
            //as soon as win condition is met code breaks and gameover is set to true
            for(var row = 0; row< this.grid.length; row++){
                
                    for(var i = 0; i < this.grid[row].length; i++){
                        if (row-2 >= 0) {

                            //checks horizontal matches
                            if ((this.grid[row-2][i] == this.grid[row-1][i] && this.grid[row-1][i] == this.grid[row][i] && this.grid[row][i] == this.grid[row-2][i]) && (this.grid[row][i] == "X" || this.grid[row][i] == "O")){
                                this.gameOver = true;
                                this.winningplayer = this.playerTurn;

                                //reset the ticCounter and make drawGame false so both if a 
                                //player wins on the 9th move it doesn't print out both things
                                this.ticCounter=0;
                                this.drawGame = false;
                                
                                
                                break;
                            }else if(this.ticCounter >=9){
                                //setting drawgame to true if no matches go through on the last move
                                this.drawGame = true;
                            }
                        }
                        if (i-2 >= 0) {
                            //checks vertical matches
                            if ((this.grid[row][i-2] == this.grid[row][i-1] && this.grid[row][i-1] == this.grid[row][i] && this.grid[row][i] == this.grid[row][i-2]) && (this.grid[row][i] == "X" || this.grid[row][i] == "O")) {
                                this.gameOver = true;
                                this.winningplayer = this.playerTurn;

                                //reset the ticCounter and make drawGame false so both if a 
                                //player wins on the 9th move it doesn't print out both things
                                this.ticCounter=0;
                                this.drawGame = false;
                                


                                break;
                            }else if(this.ticCounter >=9){
                                //setting drawgame to true if no matches go through on the last move
                                
                                this.drawGame = true;
                            }
                        }
                        if(row - 2 >= 0 && i - 2 >= 0){
                            //checks diagonal matches going left to right
                            if ((this.grid[row-2][i-2] == this.grid[row-1][i-1] && this.grid[row][i] == this.grid[row][i] && this.grid[row][i] == this.grid[row-2][i-2]) && (this.grid[row][i] == "X" || this.grid[row][i] == "O")) {
                                this.gameOver = true;
                                this.winningplayer = this.playerTurn;

                                //reset the ticCounter and make drawGame false so both if a 
                                //player wins on the 9th move it doesn't print out both things
                                this.ticCounter=0;
                                this.drawGame = false; 
                                


                                break;
                            }else if(this.ticCounter >=9){
                                //setting drawgame to true if no matches go through on the last move
                                
                                this.drawGame = true;
                            }
                        }
                        if(row - 2 >= 0 && i + 2 <= this.grid[row].length){
                            //checks diagonal matches going right to left
                            if ((this.grid[row-2][i+2] == this.grid[row-1][i+1] && this.grid[row][i] == this.grid[row][i] && this.grid[row][i] == this.grid[row-2][i+2]) && (this.grid[row][i] == "X" || this.grid[row][i] == "O")) {
                                this.gameOver = true;
                                this.winningplayer = this.playerTurn;

                                //reset the ticCounter and make drawGame false so both if a 
                                //player wins on the 9th move it doesn't print out both things
                                this.ticCounter=0;
                                this.drawGame = false;
                                


                                break;
                            }else if(this.ticCounter >=9){
                                //setting drawgame to true if no matches go through on the last move
                                this.drawGame = true;
                            }
                        }
                        
                }
                
            }
        }

    }

})