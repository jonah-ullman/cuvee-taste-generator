import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';
import 'firebase/firestore';
import MyAccount from './MyAccount';
import Quiz from './Quiz';
import TasteProfile from './TasteProfile';

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
      isLoggedIn: false,
      user: {},
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
      <Router>
        <Switch>
          {/* <Route path="/login" component={Login} /> */}
          <Route
            exact
            path="/quiz"
            render={() => (
              <Quiz setResults={this.setResults} results={this.state.results} />
            )}
          />
          <Route
            path="/taste-profile"
            render={() => <TasteProfile results={this.state.results} />}
          />
          <Route
            path="/account"
            render={() => <MyAccount user={this.state.user} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
