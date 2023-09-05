// Global variables
let metadata = [];
let samples = [];

// Read data with D3
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
d3.json(url).then(function(data){

    // Add the ids to the dropdown menu
    listOptions(data.samples);
    console.log(data.metadata)

    // Update global variables
    metadata = data.metadata;
    samples = data.samples;

    // Update the demographic information
    let dropDownMenuValue = d3.select("#selDataset").property("value");
    optionChanged(dropDownMenuValue);
});

function listOptions(samples){
// Populate the dropdown menu with all the available ids
    let dropDownMenu = d3.select("#selDataset");

    // Loop through the samples
    for (let i=0; i<samples.length; i++){
        // Add the sample id to the dropdown menu
        dropDownMenu.append("option")
            .attr("value", samples[i].id)
            .text(samples[i].id);
    }
}

function displayDemoInfo(metadata) {
// Display the demographic info in the text box
    d3.select("#sample-metadata-id").text(`id: ${metadata.id}`);
    d3.select("#sample-metadata-ethnicity").text(`ethnicity: ${metadata.ethnicity}`);
    d3.select("#sample-metadata-gender").text(`gender: ${metadata.gender}`);
    d3.select("#sample-metadata-age").text(`age: ${metadata.age}`);
    d3.select("#sample-metadata-location").text(`location: ${metadata.location}`);
    d3.select("#sample-metadata-bbtype").text(`bbtype: ${metadata.bbtype}`);
    d3.select("#sample-metadata-wfreq").text(`wfreq: ${metadata.wfreq}`);
}

function optionChanged(value) {
// Update all viz when the dropdown menu is used
    let info = getMetadataById(metadata, value);
    displayDemoInfo(info);

    // Update the bar chart
    let sample = getSampleById(samples, value);
    displayHBar(sample);
    displayBubbleChart(sample);
}

function selectId(object, id){
    return object.id == id;
}

// TODO: use .filter function instead!
function getMetadataById(metadata, id) {
// Retrieve all the metadata for a given id
    // Loop through the metadata
    for (let i = 0; i<metadata.length; i++){
        if (metadata[i].id == id) {
            return {
                id: metadata[i].id,
                ethnicity: metadata[i].ethnicity,
                gender: metadata[i].gender,
                age: metadata[i].age,
                location: metadata[i].location,
                bbtype: metadata[i].bbtype,
                wfreq: metadata[i].wfreq
            };
        }
    }

}

// TODO: use .filter function instead!
function getSampleById(samples, id) {
// Retrieve all the samples for a given id
    // Loop through the samples
    for (let i = 0; i<samples.length; i++){
        if (samples[i].id == id) {
            return {
                id: samples[i].id,
                otu_ids: samples[i].otu_ids,
                sample_values: samples[i].sample_values,
                otu_labels: samples[i].otu_labels
            };
        }
    }    
}

// TODO: get sort and slice functions working
function displayHBar(samples) {
    console.log(samples)
    // Sort the data by Greek search results descending
    // let samplesSorted = samples.sort((a, b) => b.sample_values - a.sample_values);

    // // Slice the first 10 objects for plotting
    // let samplesSortedTop10 = samplesSorted.slice(0,10);

    // // Reverse the array to accommodate Plotly's defaults
    // samplesSortedTop10.reverse()

    // Trace for the Greek Data
    // trace = {
    //     x: samples.map(index => index.sample_values),
    //     y: samples.map(index => index.otu_ids),
    //     type: "bar",
    //     orientation: 'h'
    // }

    trace = {
        x: samples.sample_values,
        y: samples.otu_ids,
        type: "bar",
        orientation: 'h'
    }

    // Data array
    data = [trace]

    // Apply a title to the layout
    layout = {
        title: "Top 10 OTU"
    }

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", data, layout)
}

function displayBubbleChart(samples) {
    console.log("Display bubble chart...")

    let trace = {
        x: samples.otu_ids,
        y: samples.sample_values,
        mode: 'markers',
        marker: {
          size: samples.sample_values,
          color: samples.otu_ids
        }
      };

    // Data array
    data = [trace]

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bubble", data)

    
    console.log("OK")
}