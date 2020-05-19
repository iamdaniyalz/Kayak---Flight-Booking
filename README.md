#Kayak - Flight Booking

> Made with Cypress

1. Clone the repo
2. Do "npm install"
3. Then in the root, open cypress with ***"node_modules\.bin\cypress open"*** 

Note:
1. Could not use “Current date + 3” for departure date and “Current date + 6” for Arrival date.
The system did not have some flights in those days so chose dates for a month later
2. Passenger selection did not work as expected. Tried using the invoke function.
Tried API calls (commented out inside code)
3. Cheapest price calculation logic is scripted in the "common" page but somehow its not parsing the string to int.