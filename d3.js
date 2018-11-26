
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
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .classed("holder", true)
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    x.domain([parseTime(1980), parseTime(2018)]);
    y.domain([0, 50]);

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

    // let Xscale = d3.scaleLinear()
    //     .range ([0, 700])
    //     .domain([1980, 2018])


    // let Yscale = d3.scaleLinear()
    //     .range([0, 200])
    //     .domain([100, 0])    
        
    //     // .domain([
    //     //     d3.max(d, d=> {
    //     //         return formatNumbers(d)
    //     //     })
            
    //     // ])    

    // let x_Axis = d3
    //     .axisBottom()
    //     .scale(Xscale)
    //     .tickFormat(d3.format("d"));

    // let y_Axis = d3.axisLeft().scale(Yscale)

   
    // let xAxisGroup = svg
    //     .append("g")
    //     .attr("transform", "translate(0, " + 500 + ")")
    //     .call(x_Axis);
        
    // let yAxisGroup = svg
    //     .append("g")
    //     .call(y_Axis);        

    // svg.selectAll("line")
    // .data(data)
    // .enter()
    // .append("circle")
    // .style('fill', 'orange')
    // .style('opacity', '.3')
    // .attr("r", 5)
    // .attr("cx", d => {
    //     return Xscale(Number(d.key))
    // })
    // .attr("cy", d => {
    //     return Yscale(Number(d.value))
    // })

})