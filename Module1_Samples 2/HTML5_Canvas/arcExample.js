var sliderModule = (function(win, doc) {

    win.onload = init;

    // canvas and context variables
    var canvas;
    var context;

    // center of the pattern
    var centerX, centerY;

    var radius = 100;

    function init() {
        
            canvas = doc.getElementById("testCanvas");
            context = canvas.getContext("2d");

            centerX = canvas.width / 2;
            centerY = canvas.height / 2;
            
            // draw the initial pattern
            drawPattern();
    }


    // called whenever the slider value changes
    function drawPattern() {
        // clear the drawing area
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.font = "14px serif";
        context.strokeStyle = "#000000";
        context.lineWidth = 1;

        context.fillText("0 / 360", centerX + radius + 15, centerY );
        context.fillText("90", centerX - 10 , centerY + radius + 25);
        context.fillText("180", centerX - radius - 35, centerY);
        context.fillText("270", centerX, centerY - radius - 15);
        
        context.beginPath();
        context.arc(centerX, centerY, radius + 10, 0, 2 * Math.PI);
        context.stroke();
        context.closePath();

        // get the current angle
        var angle = doc.getElementById("angle").value;
        var direction = doc.getElementById("direction").checked;
        var fill = doc.getElementById("fill").checked;

        
        context.strokeStyle = "#A52A2A";
        context.lineWidth = 3;

        // draw the pattern
       context.beginPath();
       context.arc(centerX, centerY, radius, 0, 2 * Math.PI * angle / 360, direction);
       
       if ((angle > 0) && (angle < 360)) {
        context.lineTo(centerX, centerY);
        context.lineTo(centerX + radius, centerY); 
       }
       
        if (fill) {
            context.fillColor = "#FFFF00";
            context.fill();
        } else {
            context.stroke();
        }
        
        context.closePath();
        
        context.fillText("Current Angle: " + angle, 25, canvas.height - 25);
        //(angle, 2 * Math.PI * angle / 360);
    }

    return {
        drawPattern: drawPattern
    };

})(window, document);






