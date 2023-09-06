# belly-button-challenge
Repository for Monash University Bootcamp Module 14

## GitHub Pages
Link to the dasboard: https://benoitchamot.github.io/belly-button-challenge/

## File structure
- the `static/js` directory contains `app.js`, a Javascript file used to handle and display the data
- `index.html` is the main HTML page used as a front end. The page can be accessed at the link above.

# About the code
## HTML
All the HTML code is in `index.html`. The general structure of the file is the following:
- The head references the bootstrap CSS used for the page (this code is not mine)
- The body contains the main div's for the page to display the main elements: title box, dropdown menu, demographic summary information, Top 10 OTU bar chart, "scrubs per week" gauge and bubble chart.
- To get the data from a specific test subject, simply use the dropdown menu.

## JavaScript
### Main logic
The main function in `app.js` is the callback used in `d3.json(url).then()`. The code uses the following logic:
- It first lists all the subject IDs to populate the dropdown menu.
- Two global variables are updated to hold the metadata and samples data so they can be available to any function in the code.
- The default value in the dropdown is used to initialise all the charts.
- `optionChanged()` is the event listener linked to the dropdown menu that contains the logic to update the dashboard: update the demographic data, the bar chart, the bubble chart and the gauge.

The functions used in the code are listed next.

### Functions
- `listOptions(samples)`: populate the dropdown menu with all the available ids
- `displayDemoInfo()`: display the demographic info in the text box (div: `sample-metadata`)
- `optionChanged(value)`: event listener. Update the dashboard when the dropdown menu is used
- `getMetadataById()`: retrieve all the metadata for a given id
- `getSampleById()`: retrieve all the metadata for a given id
- `displayHBar()`: logic to render the bar chart
- `displayBubbleChart()`: logic to render the bubble chart
- `displayGauge()`: logic to render the gauge. The code was modified from https://plotly.com/javascript/gauge-charts/