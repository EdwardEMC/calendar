$(document).ready(function(){
    var month = $(".monthDisplay");
    var m = 0; //counter for next and previous months
    var today = moment().format("DD-MMMM-YYYY");
    console.log(today);
    
    dateDisplay();
    displayGrid();
    todayFocus();
    hover();

    //display the current month on the initial calender landing page
    function dateDisplay() {
        $(".time-date").text(moment().add(m, 'months').format('MMMM-YYYY')); 
    }

    //function to detect how many days are in the month
    function dayDetermine() {
        return moment(moment().add(m, 'months')).daysInMonth();
    }

    //add function to determine the offset for the starting box if month doesn't start on sunday
    function offset() {
        var offsetNum = [];
        var initial = moment().add(m, 'months').startOf('month').format('dddd');
        var day = moment().add(m, 'months').startOf('month').format('dddd');
        var i = 0;
        while(day!=="Sunday") {
            i--;
            offsetNum.push("Day");
            day = moment().day(initial).add(i,'days').format('dddd');
        }
        return parseInt(offsetNum.length);
    }

    //function to display number of days as boxes
    function displayGrid() {
        var leftOvers = offset()+dayDetermine();
        var r = 0;
        var startOfMonth = moment().add(m, 'months').startOf('month').format('dddd');
        var currentMonth = moment().add(m, 'months').format('MMMM-YYYY');
        var row = $("<div>").addClass("row row0");
        month.append(row);
            
        for(y=0; y<offset(); y++) { //adding in columns so the month starts on the right day
            var box = $("<div>").addClass("col-sm text-left");
            box.attr("style", "height:100px;")
            $(".row0").append(box);
        }

        for(d=1, i=0; i<dayDetermine(); d++, i++) { //d for date, i for counter
            var day = moment().day(startOfMonth).add(i,'days').format('dddd');

            if(day==="Sunday") {
                r++;
                var row = $("<div>").addClass("row row"+r);
                month.append(row);
            }

            var box = $("<div>").addClass("col-sm text-left");
            box.attr("id", d + "-" + currentMonth);
            box.attr("style", "height:100px;")
            box.text(d);
            $(".row"+r).append(box);
        }

        if(leftOvers<35) { //if the calender isn't a square
            for(i=0; i<(35-leftOvers); i++) { //adding in columns so the last row is not expanding to take up the page
                var box = $("<div>").addClass("col-sm text-left");
                box.attr("style", "height:100px;")
                $(".row"+r).append(box);
            }
        }
        
        if(leftOvers>35) {
            for(i=0; i<(42-leftOvers); i++) {
                var box = $("<div>").addClass("col-sm text-left");
                box.attr("style", "height:100px;")
                $(".row"+r).append(box);
            }
        }
    }

    //function to make the current day a different color
    function todayFocus() {
        $("#"+today).attr("style", "color:red;");
    }

    //onclick function for next button
    $("#nextMonth").on("click", function() {
        m++;
        month.empty();
        dateDisplay();
        displayGrid();
        todayFocus();
        hover();
    });

    //onclick function for previous button
    $("#previousMonth").on("click", function() {
        m--;
        month.empty();
        dateDisplay();
        displayGrid();
        todayFocus();
        hover();
    });

    //onclick function for days in the month
    month.on("click", function(event) {
        var selectedDay = event.target.id;
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
    function hover() {
        $(".monthDisplay .col-sm").on("mouseover", function() {
            $(this).addClass("hover");
        });

        $(".monthDisplay .col-sm").on("mouseout", function() {
            $(this).removeClass("hover");
        });
    }  
});