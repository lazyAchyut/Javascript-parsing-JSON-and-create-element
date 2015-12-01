//function to fetch data form external json file
function getData(){
	var req = new XMLHttpRequest();
    req.open( "GET", "js/trainee.js", true );
    req.setRequestHeader("Content-type", "application/json");
 
    req.onreadystatechange = function()
    {	
        if( req.readyState == 4 && req.status == 200 )
        { 
            var response = JSON.parse( req.responseText ); 
            console.log("JSON File parsed");
 		    createTable(response);	
        }
    }
    req.send();
}

//function to create table
function createTable(response){ 
	//write heading in index page
	document.getElementById("heading").innerHTML = "<h1>List of Trainee</h1>";

	//list of heading text
	var tableHeaderList = ['Roll No','Name','Course','College'];

	var body = document.getElementsByTagName("body")[0];
	var table = document.createElement("table");
	var tableHead = document.createElement("thead");
	var tableBody = document.createElement("tbody");

	//creating thead 
	var row = document.createElement("tr");
	for(var i=0;i<=3;i++){
		var colHead = document.createElement("th");
		var headText = document.createTextNode(tableHeaderList[i]);
		colHead.appendChild(headText);
		row.appendChild(colHead);
		tableHead.appendChild(row);
	}
	table.appendChild(tableHead);

    //get number of students
    var numberOfStudent = response.length;

    //sort the list according to roll number
    response.sort(function(a, b) {
	    return (a.roll - b.roll);
	});

    //create tbody
    for(var i=0;i<numberOfStudent;i++){
    	var row = document.createElement("tr");
    		var cell = document.createElement("td");
    		var text = document.createTextNode(response[i].roll);
    		cell.appendChild(text);
    		row.appendChild(cell);

    		var cell = document.createElement("td");
    		var text = document.createTextNode(response[i].name);
    		cell.appendChild(text);
    		row.appendChild(cell);

    		var cell = document.createElement("td");
    		var text = document.createTextNode(response[i].college);
    		cell.appendChild(text);
    		row.appendChild(cell);

    		var cell = document.createElement("td");
    		var text = document.createTextNode(response[i].course);
    		cell.appendChild(text);
    		row.appendChild(cell); 		
    	tableBody.appendChild(row);
    }

    table.appendChild(tableBody);
    body.appendChild(table);
    table.setAttribute("border",1);
    table.setAttribute("cellPadding",5);
}