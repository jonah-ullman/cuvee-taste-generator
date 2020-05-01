import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';
import Auth from './Auth';
import MyAccount from './MyAccount';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      user: {},
    };
  }
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => true,
    },
    signInSuccessUrl: '/account',
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user: user });
    });
  }
  render() {
    console.log('user', this.state.user);
    return (
      <Router>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route
            path="/account"
            render={() => <MyAccount user={this.state.user} />}
          />
        </Switch>
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
        <div className="App">This is my app</div>
      </Router>
    );
  }
}

export default App;
