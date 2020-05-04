import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';
import 'firebase/firestore';
import Quiz from './Quiz';
import TasteProfile from './TasteProfile';
import Home from './Home';

class App extends Component {
  constructor() {
    super();
    this.state = {
      results: {
        acid: 0,
        tannin: 0,
        body: 0,
        oak: 0,
        flavor: 0,
      },
    };
    this.setResults = this.setResults.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user: user });
    });
  }

  setResults(results) {
    this.setState({ results: results });
  }

  render() {
    return (
      <div>
        <div id="header">
          <h2 id="logo">cuvee</h2>
          <h3 className="nav-item">Wine Palate Generator</h3>
        </div>

        <Router>
          <Switch>
            <Route
              exact
              path="/quiz"
              render={() => (
                <Quiz
                  setResults={this.setResults}
                  results={this.state.results}
                />
              )}
            />
            <Route
              path="/taste-profile"
              render={() => <TasteProfile results={this.state.results} />}
            />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
