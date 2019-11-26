var planner = $(".day-planner");

function listDisplay(){
    for(i=0; i<9; i++) {
        var time = ["9:00am", "10:00am", "11:00am", "12:00am", "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm"];
        var row = $("<div>");
        var column = $("<div>");
        var input = $("<textarea>");
        var save = $("<div>");
        var button = $("<button>")

        //Create a row for each time period
        row.attr("class", "row");

        //Creating the space for the time display
        column.attr("class", "col-sm-1 text-center");
        column.attr("style", "background-color:white;");
        column.text(time[i]);

        //Creating text area input
        input.attr("class", "col-sm-10");
        input.attr("style", "width:100%; height:100%; resize:none; background-color:aqua;");

        //Creating the area for the save button
        save.attr("class", "col-sm-1");

        //Creating the save button
        button.text("Save");
        
        row.append(column);
        row.append(input);
        row.append(save);
        save.append(button);
        planner.append(row);
    }
}

listDisplay();