import React from 'react';
import {View, Text} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        margin: 25,
        borderColor: 'black',
        padding: 10,
        justifyContent: 'space-around',
      }}
    >
      <Text style={{fontSize: 40}}>TeamUp!</Text>
      <Text style={{fontSize: 18}}>Lets play games.</Text>
    </View>
  );
};

export default HomeScreen;
