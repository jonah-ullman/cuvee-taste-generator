import React, { Component } from 'react';
import {
  VictoryChart,
  VictoryTheme,
  VictoryArea,
  VictoryPolarAxis,
  VictoryLabel,
} from 'victory';
import { Container } from '@material-ui/core';

console.log(VictoryTheme);

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
  componentDidMount() {
    // console.log('results', this.formatResults(this.props.results));
    const formattedData = this.formatResults(this.props.results);
    console.log(formattedData, 'format');
    this.setState({ data: formattedData });
  }

  // data = [
  //   { element: 'acid', value: 5 },
  //   { element: 'tannin', value: 5 },
  //   { element: 'body', value: 3 },
  //   { element: 'oak', value: 3 },
  //   { element: 'flavor', value: 5 },
  // ];
  render() {
    console.log(this.state.data, 'state data');
    return this.state.data.length ? (
      <Container>
        <div>Results!</div>
        <VictoryChart polar>
          <VictoryArea data={this.state.data} />
          <VictoryPolarAxis />
        </VictoryChart>
      </Container>
    ) : (
      <div>Loading</div>
    );
  }
}

export default TasteProfile;
