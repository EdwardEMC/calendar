var planner = $(".day-planner");
var time = ["9:00am", "10:00am", "11:00am", "12:00am", "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm"];


function dateDisplay(){
    $(".time-date").text(moment().format('dddd Do MMMM')); 
}

dateDisplay();

function listDisplay(){
    for(i=0; i<time.length; i++) {
        
        var row = $("<div>");
        var column = $("<div>");
        var input = $("<textarea>");
        var save = $("<div>");
        var button = $("<button>")

        //Create a row for each time period
        row.attr("class", "row");

        //Creating the space for the time display
        column.attr("class", "col-sm-1 text-center");
        column.attr("id", "time"+i);
        column.attr("style", "background-color:white;");
        column.text(time[i]);

        //Creating text area input
        input.attr("class", "col-sm-10 inputarea");
        input.attr("style", "width:100%; height:100%; resize:none; background-color:aqua;");
        input.attr("id", "textarea"+i);

        //Creating the area for the save button
        save.attr("class", "col-sm-1 text-center save");

        //Creating the save button
        button.text("Save");
        button.attr("id", i);
        
        row.append(column);
        row.append(input);
        row.append(save);
        save.append(button);
        planner.append(row);
    }

    //Creating clear button
    var row = $("<div>");
    var button = $("<button>")

    button.attr("class", "clear-button");
    button.attr("style", "margin-top:10px; margin-left:50%; transform:translate(-50%);")
    button.text("Clear All");

    row.append(button);
    planner.append(row);
}

listDisplay();

//Function to load any local storage saved data into the textareas
function loadSaved(){
    for(i=0; i<time.length; i++){
        $("#textarea"+i).val(localStorage.getItem(time[i]));
    }
}

loadSaved();

//Variable to determine the current time
var currentTime = moment().format('h');
console.log(currentTime);

//Function to use the current time and add/subtract classes to textarea's to show whether the time has passed, current or future

//Event listener on the save button to save any textarea value to the local storage
$(".save").on("click", function(event){
    var save = event.target.id;
    var time = $("#time"+save).text();
    var input = $("#textarea"+save).val();
    localStorage.setItem(time, input);
})

//A button to clear all current textarea input, local storage isn't touched
$(".clear-button").on("click", function(){
    $(".inputarea").val("");
})