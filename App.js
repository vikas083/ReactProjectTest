import React from 'react';
import {enableScreens} from 'react-native-screens';
// import Routing from './assets/Routing';
import 'react-native-gesture-handler';
import Router from './assets/Router';
enableScreens();
export default class App extends React.Component {
  render() {
    return <Router />;
  }
}
