import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, StackActions} from '@react-navigation/native';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './stores/rootReducer';

import Tabs from './navigation/tabs';

const Stack = createStackNavigator();

const store = createStore(rootReducer, applyMiddleware(thunk));

const screenOptions = {
  headerShown: false,
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={screenOptions}
          initialRouteName="MainLayout">
          <Stack.Screen name="MainLayout" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
