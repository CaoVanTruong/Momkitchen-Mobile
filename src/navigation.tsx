import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  chefNavigationConfig,
  driverNavigationConfig,
  registrationConfig,
} from 'types/navigationConfig';

const ChefStack = createStackNavigator();
const LoginStack = createStackNavigator();
const DriverStack = createStackNavigator();

const ChefNavigator = () => (
  <ChefStack.Navigator>
    {chefNavigationConfig.map(item => (
      <ChefStack.Screen name={item.name} component={item.component} />
    ))}
  </ChefStack.Navigator>
);

const DriverNavigator = () => (
  <DriverStack.Navigator>
    {driverNavigationConfig.map(item => (
      <DriverStack.Screen name={item.name} component={item.component} />
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
  return (
    <NavigationContainer>
      <LoginNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
