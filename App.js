import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, StackActions } from '@react-navigation/native'

import Tabs from './navigation/tabs'

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions} initialRouteName="MainLayout">
        <Stack.Screen name="MainLayout" component={Tabs}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App