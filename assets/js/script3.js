$(document).ready(() => {
    const planner = $(".day-planner");
    const selectedDay = sessionStorage.getItem("selectedDay")

    //Array for time values, to increase the day planner simply add the new time to the array and everything will dynamically update
    let time = ["9:00am", "10:00am", "11:00am", "12:00am", "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm"];

    const dateDisplay = () => {
        $(".time-date").text(selectedDay); 
    }

    //Function to dynamically display the planner
    const listDisplay = () => {
        for(i=0; i<time.length; i++) {
            
            let row = $("<div>");
            let column = $("<div>");
            let input = $("<textarea>");
            let save = $("<div>");
            let button = $("<button>")

            //Create a row for each time period
            row.attr("class", "row");
            row.attr("style", "margin-bottom:10px;")

            //Creating the space for the time display
            column.attr("class", "col-sm-2 text-center");
            column.attr("id", "time"+i);
            
            column.attr("style", "background-color:white;");
            column.text(time[i]);

            //Creating text area input
            input.attr("class", "col-sm-8 inputarea");
            input.attr("style", "width:100%; height:100%; resize:none;");
            input.attr("id", "textarea"+i);

            //Creating the area for the save button
            save.attr("class", "col-sm-2 text-center save");
            

            //Creating the save button
            button.text("Save");
            button.attr("class", "save-button");
            button.attr("id", i);
            button.attr("style", "height:90%; width:100%;");

            row.append(column);
            row.append(input);
            row.append(save);
            save.append(button);
            planner.append(row);
        }

        //Creating clear buttons
        let row = $("<div>");
        let clearB = $("<button>");

        row.addClass("d-flex justify-content-center");

        clearB.attr("class", "clear-button bg-primary");
        clearB.attr("style", "margin-top:10px; display:inline-block;")
        clearB.text("Clear");

        //Appending the buttons
        row.append(clearB);
        planner.append(row);
    }

    //Function to load any local storage saved data into the textareas
    const loadSaved = () => {
        for(i=0; i<time.length; i++) {
            $("#textarea"+i).val(localStorage.getItem(time[i]+selectedDay));
        }
    }

    //function to delete only the relavent data in the localstorage
    const deleteSpecific = () => {
        const specificDay = [];
        for (let key in localStorage){
            if(key.includes(selectedDay)) {
                specificDay.push(key);
            }
        }
        for(z=0; z<specificDay.length; z++) {
            localStorage.removeItem(specificDay[z]);
        }
    }

    //Event listener on the save button to save any textarea value to the local storage
    $(".save").on("click", event => {
        let save = event.target.id;
        let time = $("#time"+save).text();
        let input = $("#textarea"+save).val();
        localStorage.setItem(time+selectedDay, input);
    });

    //Button to clear just the current inputs, upon refresh local storage values will still be inserted
    $(".clear-button").on("click", () => {
        $(".inputarea").val("");
        deleteSpecific();
    });

    dateDisplay();
    listDisplay();
    loadSaved();

});