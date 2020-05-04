import React, { Component } from 'react';
import {
  VictoryChart,
  VictoryTheme,
  VictoryArea,
  VictoryPolarAxis,
  VictoryGroup,
} from 'victory';
import { Container, Typography } from '@material-ui/core';
import WineTabs from './WineTabs';
import { db } from '..';
import { convertResultsToSentence } from '../utils';

class TasteProfile extends Component {
  constructor(props) {
    super(props);
    this.maxima = {
      acid: 5,
      tannin: 5,
      earth: 5,
      fruit: 5,
      oak: 3,
      body: 3,
    };
    this.state = {
      data: {},
      selectedWine: null,
      wines: {},
    };
    this.tabHandler = this.tabHandler.bind(this);
  }

  // Mutates results object to a structure that Victory chart can use
  formatResults(results) {
    results.fruit = results.flavor;
    results.earth = 5 - results.flavor;
    delete results.flavor;
    return Object.keys(results).map((key) => {
      return {
        x: key,
        y: results[key] / this.maxima[key],
      };
    });
  }

  // Updates state so the selected tab's wine is rendered on the chart
  tabHandler(event, value) {
    this.setState({ selectedWine: value });
  }

  // Makes a label for Material-UI Tab component
  tabLabel(grape, location) {
    return (
      <div>
        <Typography>{grape}</Typography>
        <hr />
        <Typography>{location}</Typography>
      </div>
    );
  }

  // Calls result format, fetches wines from firestore, updates state
  async componentDidMount() {
    const formattedData = this.formatResults(this.props.results);
    const wines = {};
    const snap = await db.collection('wines').get();
    snap.forEach((doc) => (wines[doc.id] = doc.data()[doc.id]));
    this.setState({
      data: formattedData,
      wines: wines,
    });
  }

  render() {
    let selectedWine = this.state.wines[this.state.selectedWine];

    return this.state.data.length ? (
      <Container>
        <WineTabs
          tabHandler={this.tabHandler}
          tabLabel={this.tabLabel}
          selectedWine={this.state.selectedWine}
        />
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
              <VictoryArea data={this.state.data} animate={{ duration: 700 }} />
              {this.state.selectedWine && (
                <VictoryArea data={selectedWine} animate={{ duration: 700 }} />
              )}
            </VictoryGroup>
            <VictoryPolarAxis />
          </VictoryChart>
        </div>
        <Typography variant="h5" id="results-header">
          {convertResultsToSentence(this.props.results)}
        </Typography>
      </Container>
    ) : (
      <div>Loading</div>
    );
  }
}

export default TasteProfile;
