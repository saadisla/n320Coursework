 //Saad Islam
 //N320 9/19/2019
 //I make the squares become small after they get too big just cause y'know

class Ball {
    //constructor that handles the position and velocity of the ball class
    constructor() {
      //ball starts at the 100 x and y coordinates when it first spawns
      this.position = { x: 150, y: 200};
      //determines the horizontal movement speed of the ball after it is spawned into the canvas
      //velocity is set at 0 so no verticla motion but it can be changed later on
      this.velocity = { x: 10, y: 0 };
    }
    
    //update function puts the ball on canvas
    update() {
      
      //change in horizontal motion per frame, position x is added to by the velocity
      this.position.x += this.velocity.x;
      //change in vertical motion per frame, position y is added to by the velocity
      this.position.y += this.velocity.y;
      
      //drawing circle
      circle(this.position.x, this.position.y, 20);
      
      //when the ball reaches the edge of the canvas (left or right) it invokes the ballbeyond function in the world variable
      if(this.position.x < 0 || this.position.x > 400) {
        World.ballBeyond(this);
        
        box1.enlarge();
        box2.enlarge();
      }
    }
    
  }
  
  //World variable that controls background color, ball repositioning, and randomizes horizontal velocity
  var World = {
    //starting background color
    bgcolor: [237, 119, 83],
    //ballbeyond function that is invoked when the ball reaches either side of the canvas
    ballBeyond: function(whichBall) {
      //randomizes background color
      this.bgcolor = [ Math.random()*255, Math.random()*255, 83 ];
      //sets ball back to the center of the screen
      whichBall.position.x = 100;
      //randomizes horizontal velocity
      whichBall.velocity.x = (Math.random() - .5) * 20;

      

    }
  }
  
  //class for a box
  //Grows in size every time a ball hits an edge and is reset
  class Box {
    constructor(x,y){
        this.x = x; 
        this.y = y;
        this.size = 10;

    }

    update(){
        fill(0,0,50);
        rectMode("CENTER");
        rect(this.x,this.y,this.size,this.size);
    }

    enlarge(){
        this.size +=10;

        if(this.size >=125){
            this.size=10;
        }
    }

  }

  // "For fun": multiple balls
  

  //instance of the ball class
  var ball = new Ball();
  var ball2 = new Ball();
  var box1 = new Box(75,50);
  var box2 = new Box(250,50);
  
  
  //creates a 400x300 canvas for the animation to occur within
  function setup() {
    //width and height of canvas 
    createCanvas(400,300);
    
  }
  
  //updates every 60 seconds or so
  function draw() {
    //sets background color
    background( World.bgcolor );
    ball.update();
    box1.update();
    box2.update();
  }
  
  