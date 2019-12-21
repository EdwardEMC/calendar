$(document).ready(() => {
    const month = $(".monthDisplay");
    let m = 0; //counter for next and previous months
    const today = moment().format("DD-MMMM-YYYY");
    
    //function to detect if anything is in local storage ---- a variation may also be used to delete certain items
    const checkLocal = () => {
        const entries = [];
        for (let key in localStorage){
            if((key.includes("-2019")||(key.includes("-2020")))) {
                entries.push(key);
            }
        }
        for(z=0; z<entries.length; z++) {
            let mIndex = entries[z].indexOf("m");
            let info = entries[z].slice(mIndex+1);
            $("#"+info).addClass("information");
        }
    }

    //display the current month on the initial calender landing page
    const dateDisplay = () => {
        $(".time-date").text(moment().add(m, 'months').format('MMMM-YYYY')); 
    }

    //function to detect how many days are in the month
    const dayDetermine = () => {
        return moment(moment().add(m, 'months')).daysInMonth();
    }

    //add function to determine the offset for the starting box if month doesn't start on sunday
    const offset = () => {
        const offsetNum = [];
        const initial = moment().add(m, 'months').startOf('month').format('dddd');
        let day = moment().add(m, 'months').startOf('month').format('dddd');
        let i = 0;
        while(day!=="Sunday") {
            i--;
            offsetNum.push("Day");
            day = moment().day(initial).add(i,'days').format('dddd');
        }
        return parseInt(offsetNum.length);
    }

    //function to display number of days as boxes
    const displayGrid = () => {
        const leftOvers = offset()+dayDetermine();
        let r = 0;
        const startOfMonth = moment().add(m, 'months').startOf('month').format('dddd');
        const currentMonth = moment().add(m, 'months').format('MMMM-YYYY');
        let row = $("<div>").addClass("row row0");
        month.append(row);
            
        for(y=0; y<offset(); y++) { //adding in columns so the month starts on the right day
            let box = $("<div>").addClass("col-sm text-left");
            box.attr("style", "height:100px;")
            $(".row0").append(box);
        }

        for(d=1, i=0; i<dayDetermine(); d++, i++) { //d for date, i for counter
            let day = moment().day(startOfMonth).add(i,'days').format('dddd');

            if(day==="Sunday") {
                r++;
                let row = $("<div>").addClass("row row"+r);
                month.append(row);
            }

            let box = $("<div>").addClass("col-sm text-left");
            box.attr("id", d + "-" + currentMonth);
            box.attr("style", "height:100px;")
            box.text(d);
            $(".row"+r).append(box);
        }

        if(leftOvers<35) { //if the calender isn't a square
            for(i=0; i<(35-leftOvers); i++) { //adding in columns so the last row is not expanding to take up the page
                let box = $("<div>").addClass("col-sm text-left");
                box.attr("style", "height:100px;")
                $(".row"+r).append(box);
            }
        }
        
        if(leftOvers>35) {
            for(i=0; i<(42-leftOvers); i++) {
                let box = $("<div>").addClass("col-sm text-left");
                box.attr("style", "height:100px;")
                $(".row"+r).append(box);
            }
        }

        //Creating a clear all button
        const clearAllB = $("<button>");

        clearAllB.attr("class", "clearAll-button bg-danger");
        clearAllB.attr("style", "margin-top:10px; display:inline-block;")
        clearAllB.text("Clear All");

        $(".clearAll").append(clearAllB);
    }

    //function to make the current day a different color
    const todayFocus = () => {
        $("#"+today).attr("style", "color:red;");
    }

    //onclick function for next button
    $("#nextMonth").on("click", () => {
        m++;
        month.empty();
        $(".clearAll").empty();
        dateDisplay();
        displayGrid();
        todayFocus();
        hover();
        checkLocal();
    });

    //onclick function for previous button
    $("#previousMonth").on("click", () => {
        m--;
        month.empty();
        $(".clearAll").empty();
        dateDisplay();
        displayGrid();
        todayFocus();
        hover();
        checkLocal();
    });

    //onclick function for days in the month
    month.on("click", event => {
        let selectedDay = event.target.id;
        if(selectedDay){
            sessionStorage.setItem("selectedDay", selectedDay);
            if(selectedDay===moment().format("DD-MMMM-YYYY")) {
                location.href="currentDay.html";
            }
            else {
                location.href="selectedDay.html";
            }
        }
    });

    //onhover background change for columns
    const hover = () => {
        $(".monthDisplay .col-sm").on("mouseover", function() {
            $(this).addClass("hover");
        });

        $(".monthDisplay .col-sm").on("mouseout", function() {
            $(this).removeClass("hover");
        });
    }  

    //Button to clear all current textarea input and local storage 
    $(".clearAll-button").on("click", () => {
        if(confirm("Warning this will clear all current inputs and local storage as well, do you wish to proceed?")) {
            $(".inputarea").val("");
            localStorage.clear(); //change so only the specific local storage is cleared
        }
    });

    //
    const myFunction = x => {
        if (x.matches) {
            $(".weekdays").addClass("invisible");
        }
        else {
            $(".weekdays").removeClass("invisible");
        }
      }
      
    const x = window.matchMedia("(max-width: 576px)");
    myFunction(x);
    x.addListener(myFunction);
    
    //functions to run on landing page start up
    dateDisplay();
    displayGrid();
    todayFocus();
    hover();
    checkLocal();
});