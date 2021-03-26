import React, { FC } from 'react';
import { View } from 'react-native';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryZoomContainer,
} from 'victory-native';
import { colors } from '../../themes';
import { IMoodFetchedStatistics } from '../../types';

interface MoodChartProps {
  moods: IMoodFetchedStatistics[];
}

export const MoodChart: FC<MoodChartProps> = ({ moods }) => {
  const chartData = moods.map((mood) => {
    return {
      x: mood.date,
      y: mood.value,
    };
  });

  const formatDate = (date: Date) =>
    date.toLocaleDateString(undefined, {
      month: 'numeric',
      day: 'numeric',
    });

  return (
    <View>
      <VictoryChart
        domainPadding={5}
        scale={{ x: 'time' }}
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryZoomContainer
            allowZoom={false}
            zoomDimension='x'
            zoomDomain={{
              x: [new Date().getTime() - 6.048e8, new Date().getTime()], // today minus one week in miliseconds - today
              y: [0, 10],
            }}
          />
        }
      >
        <VictoryBar
          data={chartData}
          alignment='middle'
          style={{
            data: { strokeWidth: 10, fill: colors.main },
          }}
        />
        <VictoryAxis
          domain={[0, 10]}
          dependentAxis
          style={{
            grid: { stroke: 'grey', opacity: 0.3, strokeWidth: 0.8 },
          }}
        />
        <VictoryAxis
          tickFormat={(tick) => formatDate(tick)}
          style={{
            tickLabels: {
              angle: 40,
              padding: 10,
              fontSize: 12,
            },
            grid: {
              strokeWidth: 0,
            },
          }}
        />
      </VictoryChart>
    </View>
  );
};
