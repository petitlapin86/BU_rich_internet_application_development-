var canvas;
var ctx;
var centerX;
var centerY;

window.onload = init;

function init(){
  canvas = document.getElementById("c");
  ctx = c.getContext("2d");

  centerX = canvas.width / 2;
  centerY = canvas.height / 2;

  drawPattern();
}

function drawPattern(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  var radius = document.getElementById("radius").value;
  var currentRadius = 200;
  var colorCheck = 0;

  document.getElementById("bandnumber").innerHTML = radius;

  while(currentRadius > 0)
    {
      if(colorCheck == 0)
        {
          ctx.fillStyle = "#F75D59";
        }
      else{
        ctx.fillStyle = "#82CAFF";
      }

      ctx.beginPath();
      ctx.arc(200, 200, currentRadius, 0, 2*Math.PI,true);
      ctx.fill();
      ctx.closePath();
      currentRadius -= radius;

      if(colorCheck == 0)
        {
          colorCheck += 1;
        }
      else{
        colorCheck -= 1;
      }
    }
}
