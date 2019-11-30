# assignment5

A simple application to schedule events during your work day. It works by placing text within the coloured boxes and then saving them with the save button provided. It is colour coded to represent the present hour in red, any previous hour slots in grey and any hour slots in the future in green. On load the application checks the local storage for the date and any previously save data. 

If it detects that it is a new day, all local storage data is cleared. If it is the same date then it will dynamically load the information to the related times.

The two buttons at the bottom are to clear the the current data, clear simply empties the html elements on the page while clear all will empty the elements and the local storage.

![Day Planner](/assets/images/indexSS.png?raw=true "Day Planner") 

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
