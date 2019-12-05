var canvas = document.getElementById("renderCanvas"); 
var rgCost = document.getElementById("rgCost");
var infoBox = document.getElementById("infoBox"); 
var filterButtons = document.querySelectorAll(".filterNav");
var camera, scene, data, selectedPieces, selectedType; 

var selectedType = "all";


//app setup stuff
fetch("data/furniture.json", {method: 'get'})
    .then(response => response.json())
    .then((jsonData) =>{
        //json representation of the data 
        console.log(jsonData);
        data = jsonData;

        //load in all the models 
        data.furniture.forEach((piece, idx) => {
            var p = BABYLON.SceneLoader.ImportMesh(
                "", "./models/house/", piece.asset, scene,
                    (meshes) => {
                        var containerNode = new BABYLON.TransformNode("root"); 
                        piece.asset = containerNode; 
                        piece.asset.dataId = idx; 

                        meshes.forEach((mesh) => {
                            mesh.parent = containerNode; 
                        })
                    }
                );

                
        })

        console.log(data);
    })

//engine setup stuff
var engine = new BABYLON.Engine(canvas, true); 

scene = createScene(); 
engine.runRenderLoop(function(){
    scene.render();
})
    


function createScene(){

    var scene = new BABYLON.Scene(engine);

    //add cam to scene
    camera = new BABYLON.ArcRotateCamera(
        "c", Math.PI/2, Math.PI/4, 
        4, BABYLON.Vector3.Zero(), scene
    );

    //add a light to the scene
    var light = new BABYLON.DirectionalLight(
        "l", new BABYLON.Vector3(0,-.5, 1.0), scene    
    );

    //load model
    /*var bed = BABYLON.SceneLoader.Append(
        "./models/house/", 
        "bathroomMirror.obj", 
        scene
    );*/

    return scene; 
}
//end setup stuffs

//app functions
function selectType(event){
   //remember what was seleted
    selectedType = event.target.getAttribute("data-type"); 

    //filter selected class 
    filterButtons.forEach((button) => {button.classList.remove("selected")});

    //add the selected class to the item clicked
    event.target.classList.add("selected");

    
}

function showAvailable(){
    //get the slider cost val
    var amount = Number(rgCost.value);

    //filter selected pieces
    selectedPieces = data.furniture.filter((piece) => {
        //only on price if all 
        if(selectType == "all"){
            return piece.price <amount;
        }  else{
            //price and type otherwise
            return (piece.price <amount) && (piece.type == selectType); 
        }
    })

    //hide all pieces
    data.furniture.forEach((piece) => {
        TweenLite.to(piece.asset.position, .7, 
            {y: 5, onComplete: showFiltered})
    })
}

function showFiltered(){
    selectedPieces.forEach((piece)=>{
        TweenLite.to(piece.asset.position, .7, 
            {y:0, x:idx})
    })
}

window.addEventListener("click", function() { 
    var pickResult = scene.pick(scene.pointerX, scene.pointerY); 
    var selectedObject = pickResult.pickedMesh; 

    if(selectedObject){
        //get id of the object
        var dataId = selectedObject.parent.dataId; 

        //pull rest of obj info
        var itemInfo = data.furniture[dataId];
        infoBox.innerHTML = `${itemInfo.style} ${itemInfo.type} : $${itemInfo.price}`;

    }
}); 