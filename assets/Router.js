
// import React from 'react';
// import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './Home';

console.disableYellowBox = true;

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      path: '/Home',
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
      swipeEnabled: false,
    },
    defaultNavigationOptions: {
      gesturesEnabled: false,
      swipeEnabled: false,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  },
);

export default createAppContainer(AppNavigator);
