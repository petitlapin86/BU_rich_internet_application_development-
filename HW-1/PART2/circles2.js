(function(doc) {

  var canvas = doc.getElementById("testCanvas");
  var context = canvas.getContext("2d");

   // click event handler
  canvas.onclick = function(e) {
      var nextColor = randomColor();
      context.fillStyle = nextColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
  }
})(document);
