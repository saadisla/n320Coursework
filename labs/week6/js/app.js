
var app = new Vue({
    el: "#app",
    data: {
        gameOver: false,
        playerTurn: 1,
        grid: [
            [ 0,0,0,0,0,0,0 ],
            [ 0,0,0,0,0,0,0 ],
            [ 0,0,0,0,0,0,0 ],
            [ 0,0,0,0,0,0,0 ],
            [ 0,0,0,0,0,0,0 ],
            [ 0,0,0,0,0,0,0 ]
        ]
    },
    methods: {
        selectCell: function(row, col) {

            //get the row to place the puck at
            var moveRow = this.lowestMove(col);
            
            if(moveRow >= 0) {
                //copy grid to a temporary var
                var tempGrid = this.grid.slice(0);

                //modify the cloned version
                tempGrid[moveRow][col] = this.playerTurn;

                //replace
                this.grid = tempGrid;

                //swap player turn
                this.playerTurn = (this.playerTurn == 1) ? 2 : 1;

                //check for win
                this.checkWin();
            }
            
        },
        checkWin: function() {
            //loop through all columns to check
            //if win found, set over to true
            for(var row = 0; row < this.grid.length; row++){
                for(var i = 0; i < this.grid[row].length; i++){
                    if (row-3 >= 0) {
                        if ((this.grid[row-3][i] == this.grid[row-2][i] && this.grid[row-1][i] == this.grid[row][i] && this.grid[row][i] == this.grid[row-3][i]) && (this.grid[row][i] == 1 || this.grid[row][i] == 2)){
                            this.gameOver = true;
                            this.winningplayer = this.playerTurn;
                            
                            
                            break;
                        }
                    }
                    if (i-3 >= 0) {
                        if ((this.grid[row][i-3] == this.grid[row][i-2] && this.grid[row][i-1] == this.grid[row][i] && this.grid[row][i] == this.grid[row][i-3]) && (this.grid[row][i] == 1 || this.grid[row][i] == 2)) {
                            this.gameOver = true;
                            this.winningplayer = this.playerTurn;
                            break;
                        }
                    }
                    if(row - 3 >= 0 && i - 3 >= 0){
                        if ((this.grid[row-3][i-3] == this.grid[row-2][i-2] && this.grid[row-1][i-1] == this.grid[row][i] && this.grid[row][i] == this.grid[row-3][i-3]) && (this.grid[row][i] == 1 || this.grid[row][i] == 2)) {
                            this.gameOver = true;
                            this.winningplayer = this.playerTurn;
                            break;
                        }
                    }
                    if(row - 3 >= 0 && i + 3 <= this.grid[row].length){
                        if ((this.grid[row-3][i+3] == this.grid[row-2][i+2] && this.grid[row-1][i+1] == this.grid[row][i] && this.grid[row][i] == this.grid[row-3][i+3]) && (this.grid[row][i] == 1 || this.grid[row][i] == 2)) {
                            this.gameOver = true;
                            this.winningplayer = this.playerTurn;
                            break;
                        }
                    }
                }
            }
            

        },
        lowestMove: function(col) {
            //start at the bottom of a col, loop upwards
            for(var row = 5; row >= 0; row--) {
                //check to see if current row is free
                if(this.grid[row][col]==0) {
                    //if it is free, return the row index
                    return(row);
                }
            }
        }
    }
})