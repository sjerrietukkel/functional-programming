d3.json('bookdata.json').then(data => {

    let dataset = data[0].data
    var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 1080 - margin.left - margin.right,
    domain = 10,
    minMax = d3.extent(dataset.map(book => book.title.length)),
    height = 300 - margin.top - margin.bottom;

    var yScale = d3
        .scaleLinear()
        .domain(minMax)
        .range([0, height])

    var xScale = d3.scaleLinear()
        .range([height, 0],);

   var xBand = d3.scaleBand()
	    .rangeRound([0, width])
	    .padding(0.1);


        console.log(minMax);


    var yAxis = d3.axisLeft(yScale)
                  .scale(yScale)    
                                          
    
    var chart = d3.select(".chart")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");     
                    
    
    chart.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    //.call(xAxis);   
                  
    chart.append("g")
                  .attr("class", "y axis")
                  .call(yAxis);



    chart.selectAll(".bar")
                  .data(dataset)
                   .enter().append("rect")
                  .attr("class", "bar")
                  .attr("x", function(d) {
                    //   console.log(d.title.length)
                      console.log(xBand(d.title) )  
                      return xScale(d.title.length) 
                    })
                  .attr("y", function(d) { 
                      return yScale(d.title.length)
                    })
                  .attr("height", function(d) {
                    return 10
                    //   return height - yScale(d.coverImage.length); 
                })
                .attr("width", xBand.bandwidth())
                //    .attr("width", xScale.bandwidth());
 
    chart.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                    .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Frequency");   
})





.catch(err => {
    console.log(err);
})