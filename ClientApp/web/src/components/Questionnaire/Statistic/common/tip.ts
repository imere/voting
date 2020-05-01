import { event as d3event, select } from 'd3';
import { EnterElement, Selection } from 'd3-selection';

/**
 * Show a tooltip
 *
 * @export
 * @param {(Selection<Element | SVGRectElement | EnterElement | Document | Window | null, {
 *   value: string;
 *   count: number;
 * }, SVGSVGElement, unknown>)} selection
 */
export function tip(selection: Selection<Element | SVGRectElement | EnterElement | Document | Window | null, {
  value: string;
  count: number;
}, SVGSVGElement, unknown>) {
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
        选项: ${d.value}
        个数: ${d.count}`
      );
    }).
    on('mouseout', function () {
      tip.transition().duration(200).style('opacity', '0');
      select(this).style('opacity', '1');
    });
}
