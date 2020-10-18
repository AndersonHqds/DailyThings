import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

import Financial from './screens/Financial';

interface Screen {
  [key: string]: {
    normalIcon: string;
    focusedIcon: string;
  };
}

const Screens: Screen = {
  Financial: {
    normalIcon: 'ios-cash',
    focusedIcon: 'ios-cash-outline',
  },
  Food: {
    normalIcon: 'ios-fast-food',
    focusedIcon: 'ios-fast-food-outline',
  },
  Targets: {
    normalIcon: 'ios-checkmark',
    focusedIcon: 'ios-checkmark-outline',
  },
};

const App = () => {
  const Tab = createBottomTabNavigator();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <StyleProvider style={getTheme(material as any)}>
      <NavigationContainer>
        <StatusBar backgroundColor="#00BCD4" barStyle="dark-content" />
        <Tab.Navigator
          initialRouteName="Financial"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              const { normalIcon, focusedIcon } = Screens[route.name] ?? {
                normalIcon: null,
                focusedIcon: null,
              };

              if (!normalIcon && !focusedIcon) return;

              return (
                <Ionicons
                  name={focused ? focusedIcon : normalIcon}
                  size={focused ? size + 10 : size}
                  color={color}
                />
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: 'white',
            inactiveTintColor: 'white',
            tabStyle: {
              backgroundColor: '#009688',
            },
          }}>
          <Tab.Screen
            name="Financial"
            options={{ title: 'Gastos' }}
            component={Financial}
          />
          <Tab.Screen
            name="Food"
            options={{ title: 'Alimentos' }}
            component={Financial}
          />
          <Tab.Screen
            name="Targets"
            options={{ title: 'Objetivos' }}
            component={Financial}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </StyleProvider>
  );
};

export default App;
