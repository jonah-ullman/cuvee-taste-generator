import React, { Component } from 'react';
import {
  VictoryChart,
  VictoryTheme,
  VictoryArea,
  VictoryPolarAxis,
  VictoryGroup,
} from 'victory';
import { Container } from '@material-ui/core';
import { db } from '..';

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
  }
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
  async componentDidMount() {
    const formattedData = this.formatResults(this.props.results);
    const wines = {};
    const snap = await db.collection('wines').get();
    snap.forEach((doc) => (wines[doc.id] = doc.data()[doc.id]));
    this.setState({
      data: formattedData,
      wines: wines,
      selectedWine: 'riesling',
    });
  }

  render() {
    let selectedWine = this.state.wines[this.state.selectedWine];
    console.log('selectedWine', selectedWine);
    return this.state.data.length ? (
      <Container>
        <div>Results!</div>
        <VictoryChart polar theme={VictoryTheme.material}>
          <VictoryGroup
            colorScale={['#fa9584', 'blue', 'green']}
            style={{
              data: {
                fillOpacity: 0.3,
              },
            }}
          >
            <VictoryArea data={this.state.data} animate={{ duration: 700 }} />
            {this.state.selectedWine && (
              <VictoryArea data={selectedWine} animate={{ duration: 700 }} />
            )}
          </VictoryGroup>
          <VictoryPolarAxis />
        </VictoryChart>
      </Container>
    ) : (
      <div>Loading</div>
    );
  }
}

export default TasteProfile;
