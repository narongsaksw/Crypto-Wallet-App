import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Home, Portfolio, Market, Profile } from '../screens'
import { COLORS } from '../constants'

const Tab = createBottomTabNavigator()
const tabBarOptions = {
    backgroundColor: COLORS.primary,
    borderTopColor: 'transparent'
}

const Tabs = () => {
    return (
        <Tab.Navigator tabBarOptions={tabBarOptions}>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Portfolio" component={Portfolio}/>
            <Tab.Screen name="Market" component={Market}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
    )
}

export default Tabs