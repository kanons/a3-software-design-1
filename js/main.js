// // Load data in using d3's json function.
d3.json('/data/data1.json', function(data) {
    var psc = pieScheduleChart()
        .radius(200)
        .hover(true)
        .colors(['green'])

    var charts = d3.select('#vis')
        .datum(data)

    charts.enter().append("div")
        .attr('class', 'chart')
        .merge(charts)
        .call(psc);
});