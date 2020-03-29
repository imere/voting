import { axisBottom, axisLeft, event as d3event, max, range, scaleBand, scaleLinear, select } from 'd3';
import { EnterElement, Selection } from 'd3-selection';

import { ArrayData, Geometry } from '@/components/Questionnaire/Statistic/statistic';

/**
 * Show a tooltip
 *
 * @param {(Selection<Element | EnterElement | Document | Window | SVGRectElement | null, ArrayData[number], SVGSVGElement, unknown>)} selection
 */
function tip(selection: Selection<Element | EnterElement | Document | Window | SVGRectElement | null, ArrayData[number], SVGSVGElement, unknown>) {
  const tip = select('body').
    append('div').
    style('position', 'absolute').
    style('top', '0').
    style('left', '0').
    style('padding', '10px 15px').
    style('opacity', '0').
    style('z-index', '10').
    style('pointer-events', 'none');

  tip.style('background-color', 'white').
    style('font-weight', 'bold');

  selection.
    on('mouseover', function () {
      tip.transition().duration(100).style('opacity', '1');
      select(this).style('opacity', '0.8');
    }).
    on('mousemove', function (d) {
      const { clientWidth, clientHeight } = tip.node() || { clientWidth: 30, clientHeight: 30 };
      tip.style(
        'transform',
        `translate(${d3event.pageX - clientWidth}px,${d3event.pageY - clientHeight}px)`
      );
      tip.text(`
        选项: ${d.name}
        个数: ${d.count}`
      );
    }).
    on('mouseout', function () {
      tip.transition().duration(200).style('opacity', '0');
      select(this).style('opacity', '1');
    });
}

/**
 * Draw a horizontal bar chart
 *
 * @export
 * @param {string} selector
 * @param {Geometry} geo
 * @param {ArrayData} data
 */
export function HorizontalBar(selector: string, geo: Geometry, data: ArrayData) {
  const x = scaleBand().
    domain(range(data.length) as any as string[]).
    range([
      geo.margin.left,
      geo.width - geo.margin.right
    ]);

  const y = scaleLinear().
    domain([
      0,
      max(data, (d) => d.count) as number
    ]).
    nice().
    range([
      geo.height - geo.margin.bottom,
      geo.margin.top
    ]);

  const xAxis = (g: Selection<SVGGElement, any, any, any>) => g.
    attr('transform', `translate(0,${geo.height - geo.margin.bottom})`).
    call(
      axisBottom(x).
        tickFormat((v) => data[v as any].name).tickSizeOuter(0)
    );

  const yAxis = (g: Selection<SVGGElement, any, any, any>) => g.
    attr('transform', `translate(${geo.margin.left},0)`).
    call(axisLeft(y).tickValues(data.map((d) => d.count))).
    call(
      (g) => g.append('text').
        attr('x', -geo.margin.left).
        attr('y', 10).
        attr('fill', 'currentColor').
        attr('text-anchor', 'start').
        text('数量')
    );

  const svg = select(selector).
    append('svg').
    attr('viewBox', [
      0,
      0,
      geo.width,
      geo.height
    ] as any).
    attr('fill', 'steelblue');

  svg.selectAll('rect').
    data(data).
    join('rect').
    attr('x', (_, i) => x(i as any) as any).
    attr('y', (d) => y(d.count)).
    attr('width', x.bandwidth()).
    attr('height', (d) => y(0) - y(d.count)).
    call(tip);

  svg.append('g').
    call(xAxis);

  svg.append('g').
    call(yAxis);
}

/**
 * Draw a vertical bar chart
 *
 * @export
 * @param {string} selector
 * @param {Geometry} geo
 * @param {ArrayData} data
 */
export function VerticalBar(selector: string, geo: Geometry, data: ArrayData) {

  const x = scaleBand().
    domain(range(data.length).reverse() as any as string[]).
    range([
      geo.height - geo.margin.bottom,
      geo.margin.top,
    ]);

  const y = scaleLinear().
    domain([
      0,
      max(data, (d) => d.count)
    ] as any).
    range([
      geo.margin.left,
      geo.width - geo.margin.right
    ]);

  const xAxis = (g: Selection<SVGGElement, any, HTMLElement, any>) => g.
    attr('transform', `translate(${geo.margin.left},0)`).
    call(axisLeft(x).tickFormat((v) => data[v as any].name)).
    call(
      (g) => g.append('text').
        attr('x', -geo.margin.left).
        attr('y', geo.margin.top).
        attr('fill', 'currentColor').
        attr('text-anchor', 'start').
        text('选项')
    );

  const yAxis = (g: Selection<SVGGElement, any, HTMLElement, any>) => g.
    attr('transform', `translate(0,${geo.height - geo.margin.bottom})`).
    call(axisBottom(y).tickValues(data.map((d) => d.count)));

  const svg = select(selector).
    append('svg').
    attr('viewBox', [
      0,
      0,
      geo.width,
      geo.height
    ] as any).
    attr('fill', 'steelblue');

  svg.selectAll('rect').
    data(data).
    join('rect').
    attr('x', geo.margin.left).
    attr('y', (_, i) => i * x.bandwidth() + geo.margin.top).
    attr('width', (d) => y(d.count) - y(0)).
    attr('height', x.bandwidth()).
    call(tip);

  svg.append('g').
    call(xAxis);

  svg.append('g').
    call(yAxis);
}
