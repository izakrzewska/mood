import React, { FC, useState } from 'react';
import { View } from 'react-native';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryZoomContainer,
} from 'victory-native';
import { colors } from '../../themes';
import { IMoodFetched } from '../../types';

interface MoodChartProps {
  moods?: IMoodFetched[];
}

export const MoodChart: FC<MoodChartProps> = ({ moods }) => {
  const getChartData = (): any => {
    const groupedData = moods?.reduce((acc: any, item: any): any => {
      const shortDate = item.date.toDate().toLocaleDateString();
      if (!acc[shortDate]) {
        acc[shortDate] = [];
      }

      acc[shortDate].push(item);
      return acc;
    }, {});

    const chartData = Object.entries(groupedData).map((entry: any) => {
      const finalValue =
        entry[1].reduce((acc: any, item: any): any => {
          return acc + item.value;
        }, 0) / entry[1].length;
      return {
        x: entry[0],
        y: finalValue,
      };
    });
    return chartData;
  };

  // const chartData = moods.map((mood) => {
  //   return {
  //     x: mood.date && mood.date.toDate().setHours(0, 0, 0, 0),
  //     y: mood.value,
  //   };
  // });

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      containerComponent={
        <VictoryZoomContainer
          allowZoom={false}
          allowPan={getChartData().length > 7}
          zoomDimension='x'
          zoomDomain={{
            x: [getChartData().length - 7, getChartData().length],
            y: [1, 10],
          }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      }
    >
      <VictoryBar
        domainPadding={25}
        data={getChartData()}
        alignment='middle'
        style={{
          data: { strokeWidth: 10, fill: colors.main },
        }}
      />
      <VictoryAxis
        dependentAxis
        style={{
          grid: { stroke: 'grey', opacity: 0.3, strokeWidth: 0.8 },
        }}
      />
      <VictoryAxis
        tickFormat={(tick) => tick.slice(0, tick.length - 5)}
        style={{
          tickLabels: {
            angle: 40,
            padding: 15,
            fontSize: 12,
          },
          grid: {
            strokeWidth: 0,
          },
        }}
      />
    </VictoryChart>
  );
};
