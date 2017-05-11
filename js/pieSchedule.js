var pieScheduleChart = function(){
    var margin = {
        top : 70,
        bottom : 70,
        right : 70,
        left : 70
    };
    var height = 800;
    var width = 960;
    var drawHeight = height - margin.bottom - margin.top;
    var drawWidth = width - margin.right - margin.left;
    var radius = drawHeight/2;
    var colorScale = ["#deebf7", "#084594"];
    var clock = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    var hover = true;
    var fillColor = 'red'


    var pieSchedule = function(selection){
        selection.each(function(data){
            var ele = d3.select(this);
            var svg = ele.selectAll("svg").data([data]);

            var svgEnter = svg.enter()
                .append("svg")
                .attr('width', width)
                .attr("height", height);

            var g = svgEnter.append('g')
                .attr('height', drawHeight)
                .attr('width', drawWidth)
                .attr('class', 'graph')

            var background = d3.svg.arc()
                .innerRadius(0)
                .outerRadius(radius-10)
                .startAngle(0)
                .endAngle(Math.PI*2)

            svgEnter.append('path')
                .attr('class', 'arc')
                .attr('d', background)
                .attr("transform", `translate(${(width)/2}, ${(height/2)})`)
                .style('fill', 'lightgrey')
                .style('stroke', 'black')

            var ticks = svgEnter.selectAll("line").data(clock).enter().append("line");
            ticks.attr("x1", (d)=>width/2+Math.cos(Math.PI/12*(d))*(radius-10))
                    .attr("x2", (d)=>width/2+Math.cos(Math.PI/12*(d))*(radius))
                    .attr("y1", (d)=>height/2+Math.sin(Math.PI/12*d)*(radius-10))
                    .attr("y2", (d)=>height/2+Math.sin(Math.PI/12*d)*(radius))
                    .attr("stroke", "black")

            var label = svgEnter.selectAll("text").data(clock).enter().append("text")
                            .attr("dx", (d)=>width/2+Math.cos(Math.PI/12*(d-6))*(radius+10))
                            .attr("dy", (d)=>height/2+Math.sin(Math.PI/12*(d-6))*(radius+10)+3)
                            .text((d)=>d)
                            .attr("text-anchor", "middle") 

            function timeToAngle(h, m){
                return (h*15+m*.25)*Math.PI/180
            }

            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .html(function(d) {
                    if(hover){
                        return `${d.title}</br>${d.startHour}:${d.startMinute} - ${d.endHour}:${d.endMinute}`;
                    } else {
                        return 'hover disabled'
                    }
            });
            g.call(tip);

            var schedule = d3.svg.arc()
                        .innerRadius(0)
                        .outerRadius(radius-10)
                        .startAngle((d)=>timeToAngle(d.startHour, d.startMinute))
                        .endAngle((d)=>timeToAngle(d.endHour, d.endMinute))


            var background2 = d3.svg.arc()
                .innerRadius(0)
                .outerRadius(radius-10)
                .startAngle(0)
                .endAngle((d)=>{Math.PI*2})
            
            var converted = []
            for(var key in data){
                var entry = data[key];
                entry.title = key
                converted.push(entry)
            }

            var schedule = d3.svg.arc()
                        .innerRadius(0)
                        .outerRadius(radius-10)
                        .startAngle((d)=>
                            timeToAngle(d.startHour, d.startMinute))
                        .endAngle((d)=>timeToAngle(d.endHour, d.endMinute))

            svgEnter.selectAll('.schedule')
                .data(converted)
                .enter()
                .append('path')
                .attr('d', schedule)
                .attr('class', 'schedule')
                .attr('data-toggle', 'tooltip')
                .attr("transform", `translate(${(width)/2}, ${(height/2)})`)
                .style('fill', fillColor)
                .style('stroke', 'black')
                .attr('title', function(d) {return d.title + " " + d.startHour + ":" + d.startMinute})
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)

            svg.exit().remove();
        });
    }
    pieSchedule.width = function(value){
        if (!arguments.length) return width;
        width = value;
        return pieSchedule;
    }

    pieSchedule.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return pieSchedule;
    };

    pieSchedule.radius = function(value) {
        if (!arguments.length) return radius;
        radius = value;
        return pieSchedule;
    };

    pieSchedule.hover = function(value) {
        if (!arguments.length) return hover;
        hover = value;
        return pieSchedule;
    };

    pieSchedule.fillColor = function(value) {
        if (!arguments.length) return fillColor;
        fillColor = value;
        return pieSchedule;
    };
    return pieSchedule;
}