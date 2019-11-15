//I used a lot of resources off of the babylon.js site to make this work
//https://playground.babylonjs.com/#TC2K69#1 <--- color changing, works slightly better than the addeventlistener
//https://www.babylonjs-playground.com/#0D883E#18 <-- getting the W and S key presses to work 


//create canvas object and 3d elements
var canvas = document.getElementById("renderCanvas");

var engine = new BABYLON.Engine(canvas, true);

var camera, sphere;

//create scene
var scene = createScene();

//create scene method
function createScene(){


    var scene = new BABYLON.Scene(engine);

    //sets up camera controls
    camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 15, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

      //creates 3D objects, I never renamed them from sphere because I'm lazy
      sphere = BABYLON.MeshBuilder.CreateBox("box", {height: 2.5, width: 1.5, depth: 1.5}, scene);
      sphere.material = new BABYLON.StandardMaterial("sphere_mat",scene);
      
      var lesserSphere =  BABYLON.MeshBuilder.CreateBox("box", {height: 2.5, width: 1.5, depth: 1.5}, scene);
      lesserSphere.material = new BABYLON.StandardMaterial("sphere_mat",scene);
      lesserSphere.position.x = 5;
      
      var lesserSphere2 =  BABYLON.MeshBuilder.CreateBox("box", {height: 2.5, width: 1.5, depth: 1.5}, scene);
      lesserSphere2.material = new BABYLON.StandardMaterial("sphere_mat",scene);
      lesserSphere2.position.x = -5;
      
      
     /* function checkUp(evt) {
          var pickResult = scene.pick(scene.PointerX, scene.PointerY);

          evt.pickInfo.pickedMesh.material.diffuseColor = BABYLON.Color3.Green();
          
          selectedMesh = pickResult.pickedMesh;
      }*/

      //null variable that turns into the selected 3D object for the click events and rotation
      var selected = null;

      //used a different syntax than addeventlisteners cause it was easy. Found by reading through babylon website and forums
      scene.onPointerObservable.add(function(evt){
          if(selected) {
              //turns selected item gray again when you click away or click another object
              selected.material.diffuseColor = BABYLON.Color3.Gray();
            
              selected = null;
          }
          if(evt.pickInfo.hit && evt.pickInfo.pickedMesh && evt.event.button === 0){
              //turns selected green 
              selected = evt.pickInfo.pickedMesh;
              
              evt.pickInfo.pickedMesh.material.diffuseColor = BABYLON.Color3.Blue();

              //addeventlistener that activates rotation when you press a key and let go
              //used keyup so holding the key down wouldn't make the radians freak out and make lining them up impossible
              window.addEventListener("keyup",handleKeyPress,false);
             
              


              }
            //checks w and s keys and rotates
              function handleKeyPress(evt){
                if(evt.keyCode ==87){
                  TweenMax.to(selected.rotation,.2,{x:"+=1"});
                  
                }
                if(evt.keyCode ==83){
                  TweenMax.to(selected.rotation,.2,{x:"-=1"});
                  
                }
          }
          //after doing all this it checks for alignment
          checkover();
      }, BABYLON.PointerEventTypes.POINTERUP);

      
      //checkover function
      function checkover(){
          console.log("yeet");

          //turn rotation values into their own variable
          var check1 = sphere.rotation.x; 
          var check2 = lesserSphere.rotation.x;
          var check3 = lesserSphere2.rotation.x;
          console.log(check1,check2,check3);

          //round the variables up to bypass radian shenanigans
          var a = Math.ceil(check1);
          var b = Math.ceil(check2);
          var c = Math.ceil(check3);
          
          console.log(a,b,c);

            //if they line up and aren't starting position 0 they go green
          if(a === b && b === c && c===a && a!=0){
              console.log("Breh");


              sphere.material.diffuseColor =  BABYLON.Color3.Green();
              lesserSphere.material.diffuseColor =  BABYLON.Color3.Green();
              lesserSphere2.material.diffuseColor =  BABYLON.Color3.Green();
              

          }
          
      }

    

     
      //lighting
      var light = new BABYLON.HemisphericLight("HemiLight", 
            new BABYLON.Vector3(0, -0.5, 1.0), scene);
        light.diffuse = new BABYLON.Color3(1,1,1);
        light.specular = new BABYLON.Color3(1,1,1);

       


    return scene;

}

window.addEventListener("click", function(){
    //TweenMax.to(sphere.rotation,1.2,{x:"+=2"});
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    var rotation1 = sphere.rotation.x;


    console.log(pickResult);
});



//runs scene. 
engine.runRenderLoop(function () { 

   

    scene.render();

});