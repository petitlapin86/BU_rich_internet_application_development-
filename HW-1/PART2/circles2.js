
    //<!--I began with the code from the suggested example wherein the entire canvas changes color on click-->
        (function (doc) {

            var canvas = doc.getElementById("testCanvas");
            var context = canvas.getContext("2d");

            // click event handler
            let circles = []; //create an empty array
            let remove = false; //begin with no ability to remove a circle
            canvas.onclick = function (e) {
                let mousePosition = getMousePos(canvas, e);
                let posX = mousePosition.x; //track the position of each circle
                let posY = mousePosition.y; //track the position of each circle

                circles.forEach((circle, index, circles) => { //iterate over circles
                    if (isIntersection(mousePosition, circle)) { //if circles intersect
                        circles.splice(index, 1); //cut circle from circles array
                        remove = true; //then allow removal of circle
                    }
                });
                if (remove) {
                    remove = false;
                    context.clearRect(0, 0, canvas.width, canvas.height); //clear the shape
                    generateCircles(circles); //continue making circles on next click
                    return false;
                }
                var nextColor = randomColor(); //create a random color variable
                context.fillStyle = nextColor;
                context.beginPath();
                context.arc(posX, posY, 30, 0, 2 * Math.PI); //create a circle shape
                context.fill();
                let circle = { //create an object called circle
                    x: posX, //store position of object
                    y: posY,
                    radius: 30, //with the size of 30
                    color: nextColor //fill with random color
                }
                circles.push(circle); //push circle object to circles array
            }

            function isIntersection(point, circle) { //create a mathematical function to find overlap of circles
                return Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius;
            }


            function getMousePos(canvas, evt) { // create function to get mouse Position where just tapped
                // console.log(evt);
                let rect = canvas.getBoundingClientRect();
                return {
                    x: evt.clientX - rect.left,
                    y: evt.clientY - rect.top
                }
            }

            function generateCircles(circles) {
                circles.forEach(circle => {
                    context.beginPath();
                    context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
                    context.fillStyle = circle.color;
                    context.fill();
                });
            }

        })(document);
