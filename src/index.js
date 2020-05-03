import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './Components/App';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const config = {
  apiKey: 'AIzaSyBSKB5Vhb4YtKFnEx-_Nep7ST9rRZwfK5k',
  authDomain: 'cuvee-taste-generator.firebaseapp.com',
  databaseURL: 'https://cuvee-taste-generator.firebaseio.com',
  projectId: 'cuvee-taste-generator',
  storageBucket: 'cuvee-taste-generator.appspot.com',
  messagingSenderId: '585829094239',
  appId: '1:585829094239:web:88e7871387dc80be8fdcea',
  measurementId: 'G-MN0TGKPTYE',
};

export const fire = firebase.initializeApp(config);

export const db = firebase.firestore();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {' '}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
