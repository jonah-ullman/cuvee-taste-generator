import React from 'react';
import {
  VictoryChart,
  VictoryTheme,
  VictoryArea,
  VictoryPolarAxis,
  VictoryGroup,
} from 'victory';

const Chart = (props) => {
  return (
    <div id="chart-container">
      <VictoryChart
        polar
        theme={VictoryTheme.material}
        id="chart"
        height={400}
        width={400}
      >
        <VictoryGroup
          colorScale={['gold', 'dodgerblue']}
          style={{
            data: {
              fillOpacity: 0.3,
            },
          }}
          domain={{ y: [0, 1] }}
        >
          <VictoryArea data={props.data} animate={{ duration: 700 }} />
          {props.selectedWine && (
            <VictoryArea
              data={props.selectedWine}
              animate={{ duration: 700 }}
            />
          )}
        </VictoryGroup>
        <VictoryPolarAxis />
      </VictoryChart>
    </div>
  );
};

export default Chart;
