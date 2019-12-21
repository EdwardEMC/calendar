$(document).ready(() => {
    const planner = $(".day-planner");
    const hour = moment().format('HH');
    let selectedDay = sessionStorage.getItem("selectedDay")

    //Array for time values, to increase the day planner simply add the new time to the array and everything will dynamically update
    let time = ["9:00am", "10:00am", "11:00am", "12:00am", "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm"];

    //Function to check if the hour has changed
    const hourChecker = () => {
        let currentHour = hour;
        setInterval(() => {
            if(currentHour !== hour) {
                currentHour = hour;
                location.reload();
            }
        }, 10000)
    }

    hourChecker();

    const dateDisplay = () => $(".time-date").text(moment().format('dddd Do MMMM')); 

    dateDisplay();

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
        clearB.attr("style", "margin-top:10px;");
        clearB.text("Clear");

        //Appending the buttons
        row.append(clearB);
        planner.append(row);
    }

    listDisplay();

    //Function to load any local storage saved data into the textareas
    const loadSaved = () => {
        for(i=0; i<time.length; i++) {
            $("#textarea"+i).val(localStorage.getItem(time[i]+selectedDay));
        }
    }

    loadSaved();

    //Variable to determine the current time/hour
    const currentTime = hour;

    //function to get the first number of the time array inputs and check if there is a second
    const timeCheck = i => {
        if(time[i].charAt(1)===":") {
            //amPmChecker();
            return parseInt(time[i].charAt(0));
        }
        else {
            //amPmChecker();
            return parseInt(time[i].charAt(0)+time[i].charAt(1));
        }
    }

    //function to check AM/PM and return result in 24 hour time
    const amPmChecker = i => {
        if(time[i].charAt(time[i].length-2)==="p")
            return timeCheck(i)+12;
        else {
            return timeCheck(i);
        }
    }

    //Function to use the current time and add/subtract classes to textarea's to show whether the time has passed, current or future
    const currentDisplay = () => {

        for(i=0; i<time.length; i++) {
            if(amPmChecker(i) < currentTime) {
                $("#textarea"+i).attr("class", "col-sm-8 inputarea past");
            }
            else if(amPmChecker(i) == currentTime) {
                $("#textarea"+i).attr("class", "col-sm-8 inputarea present");  
            }
            else if(amPmChecker(i) > currentTime) {
                $("#textarea"+i).attr("class", "col-sm-8 inputarea future"); 
            }
        }
    }

    currentDisplay();

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
});