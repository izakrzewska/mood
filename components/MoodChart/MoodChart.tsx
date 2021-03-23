import React, { FC } from 'react';
import { View } from 'react-native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryScatter,
  VictoryTooltip,
  VictoryZoomContainer,
} from 'victory-native';
import { MoodFetched } from '../../types';

interface MoodChartProps {
  moods: MoodFetched[];
}

export const MoodChart: FC<MoodChartProps> = ({ moods }) => {
  const chartData = moods.map((mood) => {
    return {
      x: mood.date && mood.date.getUTCDate(),
      y: mood.value,
    };
  });

  return (
    <View>
      <VictoryChart
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryZoomContainer
            allowZoom={false}
            zoomDimension='x'
            zoomDomain={{ x: [0, 6] }}
          />
        }
      >
        <VictoryLine
          interpolation='linear'
          style={{
            data: { stroke: '#c43a31' },
            parent: { border: '1px solid #ccc' },
          }}
          data={chartData}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
        />
        <VictoryScatter
          data={chartData}
          size={5}
          style={{ data: { fill: '#c43a31' } }}
        />
        <VictoryAxis
          dependentAxis
          label='mood level'
          domain={[0, 10]}
          style={{
            axisLabel: { padding: 30 },
            grid: { stroke: 'grey', opacity: 0.3 },
          }}
        />
        <VictoryAxis
          label='time'
          // fixLabelOverlap
          tickFormat={(tick) => `${tick}.`}
          style={{
            axisLabel: { padding: 30 },
            tickLabels: { padding: 10, angle: 70, fontSize: 8 },
            grid: { stroke: 'grey', opacity: 0.3 },
          }}
        />
      </VictoryChart>
    </View>
  );
};
