/* eslint-disable react/no-unstable-nested-components */
import React, { useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { registrationConfig } from 'types/navigationConfig';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DashboardScreen as ChefDashboardScreen,
  DishesScreen,
  DishTypeScreen,
  FoodPackageScreen,
  FoodStyleScreen,
  KitchenScreen,
  MarketDetailScreen,
  MarketScreen,
  OrderScreen,
  ProfileScreen,
} from 'screens/chef';
import { Home, Kitchen, List, Market, User } from 'assets/svgs';
import { Colors } from 'constants';
import { getCacheUserState } from 'redux/actions/user';
import { ChefStackParamList } from 'types/navigation';

const ChefTab = createBottomTabNavigator();
const ChefStack = createStackNavigator<ChefStackParamList>();
const LoginStack = createStackNavigator();

const ChefTabNavigator = () => (
  <ChefTab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.orange,
      tabBarStyle: {
        paddingVertical: 8,
      },
    }}>
    <ChefTab.Screen
      name={'Home'}
      component={ChefDashboardScreen}
      options={{
        tabBarIcon: ({ color }: { color: string }) => (
          <Home width={28} height={28} fill={color} />
        ),
      }}
    />
    <ChefTab.Screen
      name={'Market'}
      component={MarketScreen}
      options={{
        tabBarIcon: ({ color }: { color: string }) => (
          <Market width={28} height={28} fill={color} />
        ),
      }}
    />
    <ChefTab.Screen
      name={'Kitchen'}
      component={KitchenScreen}
      options={{
        tabBarIcon: ({ color }: { color: string }) => (
          <Kitchen width={28} height={28} fill={color} />
        ),
      }}
    />
    <ChefTab.Screen
      name={'Order'}
      component={OrderScreen}
      options={{
        tabBarIcon: ({ color }: { color: string }) => (
          <List width={28} height={28} fill={color} />
        ),
      }}
    />
    <ChefTab.Screen
      name={'Profile'}
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color }: { color: string }) => (
          <User width={28} height={28} fill={color} />
        ),
      }}
    />
  </ChefTab.Navigator>
);

const ChefNavigator = () => (
  <ChefStack.Navigator screenOptions={{ headerShown: false }}>
    <ChefStack.Screen name="homeTab" component={ChefTabNavigator} />
    <ChefStack.Screen name="dishType" component={DishTypeScreen} />
    <ChefStack.Screen name="dishes" component={DishesScreen} />
    <ChefStack.Screen name="foodPackage" component={FoodPackageScreen} />
    <ChefStack.Screen name="foodStyle" component={FoodStyleScreen} />
    <ChefStack.Screen name="marketDetail" component={MarketDetailScreen} />
  </ChefStack.Navigator>
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
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<any>();

  useLayoutEffect(() => {
    dispatch(getCacheUserState());
  });

  const renderApp = (() => {
    if (!user || !user.role) {
      return <LoginNavigator />;
    }

    if (user.role === 'Chef') {
      return <ChefNavigator />;
    }

    return <LoginNavigator />;
  })();

  return <NavigationContainer>{renderApp}</NavigationContainer>;
};

export default Navigation;
