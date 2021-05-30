import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';
import {setTradeModalVisibility} from '../stores/tab/tabActions';

import {TabIcon} from '../components';
import {Home, Portfolio, Market, Profile} from '../screens';
import {COLORS, icons} from '../constants';
import {TouchableOpacity} from 'react-native';

const Tab = createBottomTabNavigator();
const tabBarOptions = {
  showLabel: false,
  style: {
    backgroundColor: COLORS.primary,
    borderTopColor: 'transparent',
    height: 140,
  },
};

const TabBarCustomButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const tabScreens = [
  {
    label: 'Home',
    name: 'Home',
    component: Home,
    icon: icons.home,
    isTrade: false,
  },
  {
    label: 'Portfolio',
    name: 'Portfolio',
    component: Portfolio,
    icon: icons.briefcase,
    isTrade: false,
  },
  {
    label: 'Trade',
    name: 'Trade',
    component: Home,
    icon: icons.trade,
    isTrade: true,
  },
  {
    label: 'Market',
    name: 'Market',
    component: Market,
    icon: icons.market,
    isTrade: false,
  },
  {
    label: 'Profile',
    name: 'Profile',
    component: Profile,
    icon: icons.profile,
    isTrade: false,
  },
];

const Tabs = ({isTradeModalVisible, setTradeModalVisibility}) => {
  const tradeTabButtonOnClickHandler = () =>
    setTradeModalVisibility(!isTradeModalVisible);
  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      {tabScreens.map(({name, component, icon, label, isTrade}) => {
        if (isTrade) {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={component}
              options={{
                tabBarIcon: ({focused}) => (
                  <TabIcon
                    focused={focused}
                    icon={isTradeModalVisible ? icons.close : icon}
                    iconStyle={
                      isTradeModalVisible ? {width: 15, height: 15} : null
                    }
                    label={label}
                    isTrade={isTrade}
                  />
                ),
                tabBarButton: props => (
                  <TabBarCustomButton
                    {...props}
                    onPress={tradeTabButtonOnClickHandler}
                  />
                ),
              }}
            />
          );
        } else {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={component}
              options={{
                tabBarIcon: ({focused}) => {
                  if (!isTradeModalVisible) {
                    return (
                      <TabIcon
                        focused={focused}
                        icon={icon}
                        label={label}
                        isTrade={isTrade}
                      />
                    );
                  }
                },
              }}
              listeners={{
                tabPress: e => {
                  if (isTradeModalVisible) {
                    e.preventDefault();
                  }
                },
              }}
            />
          );
        }
      })}
    </Tab.Navigator>
  );
};

const mapStateToProps = state => {
  return {
    isTradeModalVisible: state.tabReducer.isTradeModalVisible,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTradeModalVisibility: isVisible => {
      return dispatch(setTradeModalVisibility(isVisible));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
