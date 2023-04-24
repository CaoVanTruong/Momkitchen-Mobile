import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  chefNavigationConfig,
  driverNavigationConfig,
  registrationConfig,
} from 'types/navigationConfig';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const ChefStack = createStackNavigator();
const LoginStack = createStackNavigator();
const DriverStack = createStackNavigator();

const ChefNavigator = () => (
  <ChefStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    {chefNavigationConfig.map(item => (
      <ChefStack.Screen
        name={item.name}
        component={item.component}
        key={item.name}
      />
    ))}
  </ChefStack.Navigator>
);

const DriverNavigator = () => (
  <DriverStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    {driverNavigationConfig.map(item => (
      <DriverStack.Screen
        name={item.name}
        component={item.component}
        key={item.name}
      />
    ))}
  </DriverStack.Navigator>
);

const LoginNavigator = () => (
  <LoginStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    {registrationConfig.map(item => (
      <LoginStack.Screen
        name={item.name}
        component={item.component}
        key={item.name}
      />
    ))}
  </LoginStack.Navigator>
);

const Navigation = () => {
  const user = useSelector((state: RootState) => state.user);

  const renderApp = (() => {
    if (!user || !user.role) {
      return <LoginNavigator />;
    }

    if (user.role === 'Chef') {
      return <ChefNavigator />;
    }

    return <DriverNavigator />;
  })();

  return <NavigationContainer>{renderApp}</NavigationContainer>;
};

export default Navigation;
