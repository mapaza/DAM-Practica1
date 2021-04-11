import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Detail from './components/Detail';

const Stack = createStackNavigator();

function App() {
  const options = {
    headerStyle: {
      backgroundColor: '#D39BC1',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{...options, title: '♫  Lyrics Finder  ♫'}}/>
        <Stack.Screen name="Details" component={Detail} options={{...options, title: 'Letra'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App