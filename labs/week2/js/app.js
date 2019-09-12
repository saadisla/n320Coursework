//Saad Islam
//N320
//9/12/2019

//got help from Drennen during tutor hours

class Drop {
    constructor() {
        this.x = Math.random() * 400;
        this.y = 0;
    }

    update() {
        this.y ++;
        fill(0,0,200);
        circle(this.x, this.y, 5);

       if(this.y >=250){
            this.y=0;
            this.x = Math.random() * 400;
            ground.hitCount();
       }

    }
}

class RainManager {
    constructor() {
        this.drops = [];
    }

    createDrop() {
        //make a new drop
        var newDrop = new Drop();

        //add drop to collection
        this.drops.push(newDrop);
    }

    update() {
        for(var i = 0; i < this.drops.length; i++){
            this.drops[i].update();
        }
    }

}

class Ground{
    //constructor
        //set starting color
        //start the drop hit color
    constructor() {
        this.ground=[];
        this.startColor = 13;
        

    }

    //update - draws the retangle to the screen
    createRectangle(){
        
        //making new rectangle
        fill(0,0,this.startColor);

        rectMode("CENTER");
        rect(0,250,600,50);
        

        

        //add ground
    
        var newGround = new Ground();
        this.ground.push(newGround);
       
        
    }
    //drop hit - called when a rain drop gets low enough (how do you inform it?)
        //change the color for every ten rain drops hit
    hitCount(){
        hitval++;
        console.log(hitval);
        
        if(hitval >= 10){
            hitval = 0;
            this.startColor= this.startColor + 15;
        }

    }
    


}

//global variables
var rainManager = new RainManager();
var ground = new Ground();
var dropNum = 0;
var hitval=0;

//Run once before the application starts
function setup() {
    createCanvas(400,300);
}

//runs 60 times a second, or so
function draw() {

    //clear out background
    background(255);

    //create a new drop on a 3% chance
    if(Math.random() < .03 && dropNum <20){
        dropNum++;
        
        rainManager.createDrop();

    }

    ground.createRectangle();

    rainManager.update();

}




