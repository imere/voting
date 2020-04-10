import { axisBottom, axisLeft, max, range, scaleBand, scaleLinear, select } from 'd3';
import { Selection } from 'd3-selection';

import { Geometry, StatisticData } from '@/components/Questionnaire/Statistic/statistic';

import { tip } from '../common/tip';
import { parse } from '../util';

/**
 * Draw a horizontal bar chart
 *
 * @export
 * @param {string} selector
 * @param {Geometry} geo
 * @param {StatisticData[number]} data
 */
export function HorizontalBar(selector: string, geo: Geometry, data: StatisticData[number]) {
  const arr: Array<{ value: string; count: number; }> = parse(data);

  const x = scaleBand().
    domain(range(arr.length) as any as string[]).
    range([
      geo.margin.left,
      geo.width - geo.margin.right
    ]);

  const y = scaleLinear().
    domain([
      0,
      max(arr, (d) => d.count) as number
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
        tickFormat((v) => arr[v as any].value).
        tickSizeOuter(0)
    );

  const yAxis = (g: Selection<SVGGElement, any, any, any>) => g.
    attr('transform', `translate(${geo.margin.left},0)`).
    call(axisLeft(y).tickValues(arr.map((d) => d.count))).
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
    data(arr).
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
 * @param {StatisticData[number]} data
 */
export function VerticalBar(selector: string, geo: Geometry, data: StatisticData[number]) {
  const arr: Array<{ value: string; count: number; }> = parse(data);

  const x = scaleBand().
    domain(range(arr.length).reverse() as any as string[]).
    range([
      geo.height - geo.margin.bottom,
      geo.margin.top,
    ]);

  const y = scaleLinear().
    domain([
      0,
      max(arr, (d) => d.count)
    ] as any).
    range([
      geo.margin.left,
      geo.width - geo.margin.right
    ]);

  const xAxis = (g: Selection<SVGGElement, any, HTMLElement, any>) => g.
    attr('transform', `translate(${geo.margin.left},0)`).
    call(axisLeft(x).tickFormat((v) => arr[v as any].value)).
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
    call(axisBottom(y).tickValues(arr.map((d) => d.count)));

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
    data(arr).
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
