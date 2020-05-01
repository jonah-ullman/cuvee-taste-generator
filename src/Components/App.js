import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';
import 'firebase/firestore';
import MyAccount from './MyAccount';
import Quiz from './Quiz';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      user: {},
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user: user });
    });
  }
  render() {
    return (
      <Router>
        <Switch>
          {/* <Route path="/login" component={Login} /> */}
          <Route path="/quiz" component={Quiz} />
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
