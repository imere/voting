import React, { useEffect } from 'react';

import { ChartReceivedProps, Geometry } from '@/components/Questionnaire/Statistic/statistic';

import { HorizontalBar } from './bar';

type BarChartProps = ChartReceivedProps

const BarChart: React.FC<BarChartProps> = ({ data }: BarChartProps) => {
  const name = '_' + data.name;

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

  useEffect(() => {
    HorizontalBar(`#${name}`, geometry, data);
  }, []);

  return (
    <div id={name}></div>
  );
};

export { BarChart };
