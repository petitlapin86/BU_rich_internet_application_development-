window.onload = init;
var senator_list = []; //create an empty array for senators
function init(){ //initialize by finding ids in Html
    All_senator= document.getElementById('senators');
    democrats = document.getElementById('democrats');
    republicans = document.getElementById('republicans');
    alertMsg = document.getElementById("alertMsg");


    if (window.localStorage.getItem('mySenators') == null) {
        alertMsg.innerHTML = "<b>From AJAX Loaded 10 senators</b>";
        console.log("loaded for the first time");
        var Connect = new XMLHttpRequest(); //create a XML request
        Connect.open("GET", "partyList.xml", false);
        Connect.setRequestHeader("Content-Type", "text/xml");
        Connect.send(null);
        var theDocument = Connect.responseXML;
        var Senators = theDocument.childNodes[0];

        for(i=0;i<Senators.children.length;i++){ //iterate over senators
            var Senator = Senators.children[i];

            //drag senator by name
            All_senator.innerHTML += "<li draggable='true'>"+Senator.getElementsByTagName("name")[0].textContent+"</li>";
            senator_list.push({
                name:Senator.getElementsByTagName("name")[0].textContent,
                party:null,
                voted:false
            });
        }
        senator_list = JSON.stringify(senator_list);
        console.log("senator_list: "+senator_list);
        window.localStorage.setItem("mySenators",senator_list);
    }else{
        alertMsg.innerHTML = "<b>From localStorage Loaded 10 senators</b>";
        console.log("not the first time");
        var mySenators = window.localStorage.getItem("mySenators");
        mySenators = JSON.parse(mySenators);
        console.log(mySenators[0]);
        for(i=0;i<mySenators.length;i++){
            All_senator.innerHTML+="<li draggable='true'>"+mySenators[i].name+"</li>";
            if(mySenators[i].party=="democrats"){
                democrats.innerHTML += "<li draggable='true'>"+ mySenators[i].name +"</li>";
            }else if(mySenators[i].party=="republicans"){
                republicans.innerHTML += "<li draggable='true'>" +mySenators[i].name + "</li>";
            }
        }
    }

    All_senator.ondragstart = dragStartHandler;
    All_senator.ondragend = dragEndHandler;
    All_senator.ondrag = dragHandler;

    function dragStartHandler(e){
        console.log("one is ondragstart");
        console.log(e.target.textContent);
        e.dataTransfer.setData("Text",e.target.textContent);
    }
    function dragEndHandler(e){
        alertMsg.innerHTML = "<b>Drag ended</b>";
        console.log("one is ondragend");
        //console.log(e.target.id);
    }
    function dragHandler(e){
        console.log("one is ondraging");
        //console.log(e.target.id);
    }

/*-------REPUBLICANS--------*/

    republicans.addEventListener('dragenter', function(e){ //drag
            console.log(e.target.voted);
            console.log("dragenter!");
            e.preventDefault();
        },
    false);
    republicans.addEventListener("dragover",function(e){ //dragover
             e.preventDefault();
             console.log("dragover!");
        },
    false);
    republicans.addEventListener("drop",function(e){ //drop
            var curr = e.dataTransfer.getData('Text');//curr is one's name
            var mySenators = localStorage.getItem("mySenators");
            mySenators = JSON.parse(mySenators);
            var mySen = findElementByName(curr,mySenators);
            if(mySen.voted==true){
                if(mySen.party!="republicans"){ //if senator is not in republican party
                    alert("Sorry he/she is not republican!"); //display
                }else{
                    alert("You have already voted for this candidate!");
                }
            }else{
                mySen.voted=true;
                mySen.party="republicans";
                republicans.innerHTML += "<li>"+mySen.name+"</li>";
                mySenators = JSON.stringify(mySenators);
                localStorage.setItem("mySenators",mySenators);
                console.log("saved a new localStorage!");
            }
            e.preventDefault();
    });

/*-------DEMOCRATS--------*/

    democrats.addEventListener('dragenter', function(e){ //drag
            console.log(e.target.voted);
            console.log("dragenter!");
            e.preventDefault();
        },
    false);
    democrats.addEventListener("dragover",function(e){ //drag over
             e.preventDefault();
             console.log("dragover!");
        },
    false);
    democrats.addEventListener("drop",function(e){ //drop
            var curr = e.dataTransfer.getData("Text");
            var mySenators = localStorage.getItem("mySenators");
            mySenators = JSON.parse(mySenators);
            var mySen = findElementByName(curr,mySenators);
            if(mySen.voted==true){
                if(mySen.party!="democrats"){ //if senator is not in democrat party
                    alert("Sorry he/she is not democrat!"); //display
                }else{
                    alert("You have already voted for this candidate!");
                }
            }else{
                mySen.voted = true;
                mySen.party = "democrats";
                democrats.innerHTML += "<li>"+curr+"</li>";
                mySenators = JSON.stringify(mySenators);
                localStorage.setItem("mySenators",mySenators);
                console.log("saved a new localStorage!");
            }
            e.preventDefault();
    });
}

function findElementByName(curr,mySenators){   //find the senator by name from localStorage
    for( i=0;i<mySenators.length;i++){
        if(mySenators[i].name==curr){
            console.log("found the name"+ curr);
            return mySenators[i];
        }
    }
}
