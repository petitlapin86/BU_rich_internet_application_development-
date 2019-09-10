//define the main variables
var canvas;
var ring;

window.onload = init;

function init(){ //initialize canvas
  canvas = document.getElementById("theCanvas");
  ring = theCanvas.getContext("2d");

  var centerX = canvas.width / 2; //define variables for center points of canvas
  var centerY = canvas.height / 2;

  makeRings(); //call function
}

function makeRings(){
  ring.clearRect(0,0,canvas.width, canvas.height);
  var radius = document.getElementById("radius").value;
  var remainingRadius = 200; //baseline 200
  var colorCheck = 0; //baseline 0

  document.getElementById("bandwNumber").innerHTML = radius; //read html label to define the radius

  while(remainingRadius > 0) //as long as remaining radius is highter than 0
    {
      if(colorCheck == 0) //use if else logic to decide which color to fill
        {
          ring.fillStyle = "#F75D59";
        }
      else{
        ring.fillStyle = "#82CAFF";
      }

      ring.beginPath(); //stylize rings
      ring.arc(200, 200, remainingRadius, 0, 2*Math.PI,true); //create ring size
      ring.fill(); //fill with appropriate color
      ring.closePath(); //finish
      remainingRadius -= radius; //decrement radius

      if(colorCheck == 0) //this essentially swaps colors red to blue each time through
        {
          colorCheck += 1; //increment
        }
      else{
        colorCheck -= 1; //otherwise decrement
      }
    }
}
