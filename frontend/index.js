const data = [10, 30, 20];

const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const xScale = d3.scaleLinear()
    .domain([0, data.length - 1])
    .range([0, width]);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([height, 0]);

const line = d3.line()
    .x((d, i) => xScale(i))
    .y(d => yScale(d));

svg.append('path')
    .data([data])
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('d', line);
