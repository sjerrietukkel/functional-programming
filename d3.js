d3.json("data/all.json").then(function(data) {
    var bookNested = d3
        .nest()
        .key(data => data.pubYear)
        // .key(data => data.publication)
        .rollup(function(data) {
            return data.length
        })
        .entries(data) 
        return bookNested  
})

.then(data => {
    console.log(data)
    var margin = {top: 20, right: 20, bottom: 60, left: 60},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var parseTime = d3.timeParse("%Y");
    var x = d3.scaleTime().range([0, width])
    var y = d3.scaleLinear().range([height, 0])

    x.domain([1980, 2018])
    .tickFormat(d3.timeFormat("%Y"))
    y.domain([0, 45])

    var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    // .classed("holder", true)
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


    

    // Add the X axis
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
    svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .style("font-family", "Arial, Helvetica, sans-serif")
      .text("Jaartal");

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
        svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1.5em")
      .style("text-anchor", "middle")
      .style("font-family", "Arial, Helvetica, sans-serif")
      .text("Uitgebrachte boeken");    

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("image")
        .attr("xlink:href", function(d){ return d.src })
        .attr("cx", d => {
            return x(Number(d.key))
        })
        .attr("cy", d => {
            return y(Number(d.value))
        })
        .attr("width", 16)
        .attr("height", 16);
        // .style('background-image', 'url("https://static.thenounproject.com/png/1571948-200.png")')
        // .style('fill', 'orange')
        // .style('opacity', '.3')
        // .attr("r", 5)
      

})