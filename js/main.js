d3.json("/data/data.json", function(data){
    var psc = pieScheduleChart().radius(200)
                                .hover(true)
                                .fillColor('blue')

    var charts = d3.select('#my-div')
                        .datum(data)

    charts.enter().append("div")
        .attr('class', 'chart')
        .merge(charts)
        .call(psc);
})