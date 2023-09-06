// Global variables
let metadata = [];
let samples = [];

// Read data with D3
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
d3.json(url).then(function(data){

    // Add the ids to the dropdown menu
    listOptions(data.samples);

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

    // Update the gauge
    displayGauge(info.wfreq)

    // Update the charts
    let sample = getSampleById(samples, value);
    displayHBar(sample);
    displayBubbleChart(sample);
}

// function selectId(object, id){
//     return object.id == id;
// }

// TODO: use .filter function instead!
function getMetadataById(metadata, id) {
// Retrieve all the metadata for a given id
    // Loop through the metadata
    for (let i = 0; i<metadata.length; i++){
        // Add data from the specified id
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

function displayHBar(samples) {
// Display horizontal bar chart for top 10 otu ids

    // Combine the arrays into a single object
    // Prototype: [{otu_ids: ..., sample_values: ...}, {...}, {...}]
    let samples_list = [];
    for (let i=0; i<samples.otu_ids.length;i++) {
        samples_list.push({
            otu_ids: samples.otu_ids[i],
            sample_values: samples.sample_values[i]
        });
    }

    // Sort the data by sample values in descending order
    let samplesSorted = samples_list.sort((a, b) => b.sample_values - a.sample_values);

    // // Slice the first 10 objects
    let samplesSortedTop10 = samplesSorted.slice(0,10);

    // // Reverse the array to accommodate Plotly's defaults
    samplesSortedTop10.reverse()
    
    // Trace for the OTU data
    let trace = {
        x: samplesSortedTop10.map(index => index.sample_values),
        y: samplesSortedTop10.map(index => `OTU ${index.otu_ids}`),
        type: "bar",
        orientation: 'h'
    };

    // Data array
    let data = [trace]

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", data)
}

function displayBubbleChart(samples) {
// Display bubble chart

    function scaleSize(value) {
        return Math.sqrt(value)*8;
    }

    // Trace for the OTU data
    let trace = {
        x: samples.otu_ids,
        y: samples.sample_values,
        mode: 'markers',
        marker: {
          size: samples.sample_values.map(index => scaleSize(index)),
          color: samples.otu_ids
        },
        text: samples.otu_labels
      };

    let layout = {
        xaxis: {title: {text: 'OTU ID'}}
    }

    // Data array
    let data = [trace]

    // Render the plot to the div tag with id "bubble"
    Plotly.newPlot("bubble", data, layout)
}

function displayGauge(value) {

    let data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: value,
            title: { text: "Scrubs per week" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                bar: {
                    color: "black"
                },
                axis:{range: [0, 9]},
                steps: [
                { range: [0, 1], color: "#ED7D31" },
                { range: [1, 2], color: "#F4B183" },
                { range: [2, 3], color: "FFD966" },
                { range: [3, 4], color: "#FFE699" },
                { range: [4, 5], color: "#FFF2CC" },
                { range: [5, 6], color: "#E2F0D9" },
                { range: [6, 7], color: "#C5E0B4" },
                { range: [7, 8], color: "#A9D18E" },
                { range: [8, 9], color: "#548235" }
              ],
              threshold: {
                line: {'color': "black", 'width': 4},
                thickness: 0.75,
                value: value}
            }
        }
    ];
    
    Plotly.newPlot('gauge', data);
}