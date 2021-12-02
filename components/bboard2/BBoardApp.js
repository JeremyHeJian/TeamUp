import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View, Button} from 'react-native';

import ValueProvider from '../ValueContext';

import Profile from './Profile';
import Home from './Home';
import BBoards from './BBoards';
import Registration from './Registration';

const Tab = createBottomTabNavigator();

const App = () => {
  const data = {
    name: '',
    email: '',
    appURL: 'https://pure-sands-98303.herokuapp.com',
    //appURL: 'http://127.0.0.1:3000',
    secret: '',
  };

  return (
    <ValueProvider value={data}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="TeamUp!" component={BBoards} />
          <Tab.Screen name="About" component={Home} />
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Register" component={Registration} />
        </Tab.Navigator>
      </NavigationContainer>
    </ValueProvider>
  );
};

export default App;
