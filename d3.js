d3.json('bookdata.json').then(data => {
    console.log(data);
    let dataset = data[0].data
    var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 720 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;



    var xScale = d3.scaleLinear()
        .rangeRound([0, width], .1);
    var yScale = d3.scaleLinear()
        .range([height, 0],);


    var xAxis = d3.axisBottom(xScale)
                  .scale(xScale);

    
    var yAxis = d3.axisLeft(yScale)
                  .scale(yScale)    
                  .ticks(10, "%"); 
                                          
    
    var chart = d3.select(".chart")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");     
                    
    
    chart.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);   
                  
    chart.append("g")
                  .attr("class", "y axis")
                  .call(yAxis);
    chart.selectAll(".bar")
                  .data(data[0].data)
                    .enter().append("rect")
                  .attr("class", "bar")
                  .attr("x", function(d) {
                      return xScale(d.title.length); 
                    })
                  .attr("y", function(d) { 
                      return yScale(d.coverImage.length); 
                    })
                  .attr("height", function(d) { return height - yScale(d.value); })
                  .attr("width", function(d) { return width - xScale(d.value); })
                //   .attr("width", xScale.bandwidth());

 
    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
            .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");   
        

        function type(d) {
        d.value = +d.value; // coerce to number
        return d;
        }
 
})





.catch(err => {
    console.log(err);
})