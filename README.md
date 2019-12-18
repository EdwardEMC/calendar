# assignment5

A calendar application to schedule events. The entire application is dynamically updated with momemnt.js so that the days of the month are always in the correct position and the date is correct. 

![Calendar](/assets/images/indexSS.png?raw=true "Calendar") 

Hovering over the days will show the user which day is being focused and clicking on any one of the days will bring up the day planner where information about a certain day/time can be saved. 

![Hover](/assets/images/hoverSS.png?raw=true "Hover") 

All days in the past and present are displayed as simple input boxes while the current date (red color coded date display) will bring up the advanced day planner (updated hourly to keep track of events). 

![Basic Day](/assets/images/basicDaySS.png?raw=true "Basic Day") 

It works by placing text within the coloured boxes and then saving them with the save button provided. It is colour coded to represent the present hour in red, any previous hour slots in grey and any hour slots in the future in green. On load the application checks the local storage for the date and any previously save data. 

![Day Planner](/assets/images/advDaySS.png?raw=true "Day Planner") 

Any days with data saved will be displayed with a light green background color on the main calendar page as to signal to the user there is something within this day.

![Saved Data](/assets/images/savedSS.png?raw=true "Saved Data") 

There are two clear buttons one on the main calendar page and one inside every day planner extension, clear simply empties the html elements local to the page while clear all will empty the elements and the local storage for all days.

# Built with

Bootstrap\
Jquery\
Moment.js

# Authors 

Edward Coad

# Acknowledgements

bootstrap.com\
stackoverflow.com\
w3school.com\
momentjs.com
