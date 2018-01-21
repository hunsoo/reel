import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import store from './src/store';
import Router from './src/Router';

export default class App extends React.Component {
  constructor() {
    super();

    var config = {
      apiKey: "AIzaSyAJyNdma79U9uZZR3aLgm_ylrBChPZdPjU",
      authDomain: "reel-stackathon.firebaseapp.com",
      databaseURL: "https://reel-stackathon.firebaseio.com",
      projectId: "reel-stackathon",
      storageBucket: "reel-stackathon.appspot.com",
      messagingSenderId: "491423434758"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
