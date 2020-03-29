import React, { useEffect } from 'react';

import {
  extractAnswersToArray,
  transformObjectToArrayData,
  transformToObjectData,
} from '@/components/Questionnaire/Statistic/util';
import { Geometry, ChartReceivedProps } from '@/components/Questionnaire/Statistic/statistic';

import { HorizontalBar } from './bar';

type BarChartProps = ChartReceivedProps

const BarChart: React.FC<BarChartProps> = ({ item, answers }: BarChartProps) => {
  let { name } = item;
  name = '_' + name;

  const geometry: Geometry = {
    width: 800,
    height: 200,
    margin: {
      left: 40,
      right: 20,
      top: 50,
      bottom: 20,
    }
  };

  const data = transformObjectToArrayData(transformToObjectData(
    extractAnswersToArray(item, answers)
  ));

  useEffect(() => {
    HorizontalBar(`#${name}`, geometry, data);
  }, []);

  return (
    <div id={name}></div>
  );
};

export { BarChart };
