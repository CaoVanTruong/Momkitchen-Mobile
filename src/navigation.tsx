/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { registrationConfig } from 'types/navigationConfig';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  AddFoodPackageScreen,
  DashboardScreen as ChefDashboardScreen,
  DishesScreen,
  DishTypeScreen,
  FoodPackageDetailScreen,
  FoodPackageScreen,
  FoodStyleScreen,
  KitchenScreen,
  MarketDetailScreen,
  MarketScreen,
  OrderDetailScreen,
  OrderScreen,
  ProfileScreen as ChefProfileScreen,
} from 'screens/chef';
import {
  DashboardScreen as DriverDashboardScreen,
  HistoryScreen,
  ShipperOrderDetailScreen,
  ShipperOrderScreen,
  ProfileScreen as ShipperProfileScreen,
} from 'screens/driver';
import { Clock, Home, Kitchen, List, Market, User } from 'assets/svgs';

import { getCacheUserState } from 'redux/actions/user';
import { ChefStackParamList } from 'types/navigation';
import Colors from 'constants/colors';

const ChefTab = createBottomTabNavigator();
const ChefStack = createStackNavigator<ChefStackParamList>();

const LoginStack = createStackNavigator();

const ShipperTab = createBottomTabNavigator();
const ShipperStack = createStackNavigator();

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
      component={ChefProfileScreen}
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
    <ChefStack.Screen name="addFoodPackage" component={AddFoodPackageScreen} />
    <ChefStack.Screen name="orderDetail" component={OrderDetailScreen} />
    <ChefStack.Screen
      name="foodPackageDetail"
      component={FoodPackageDetailScreen}
    />
  </ChefStack.Navigator>
);

const ShipperTabNavigator = () => (
  <ShipperTab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.orange,
      tabBarStyle: {
        paddingVertical: 8,
      },
    }}>
    <ShipperTab.Screen
      name="Home"
      component={DriverDashboardScreen}
      options={{
        tabBarIcon: ({ color }: { color: string }) => (
          <Home width={28} height={28} fill={color} />
        ),
      }}
    />
    <ShipperTab.Screen
      name={'Order'}
      component={ShipperOrderScreen}
      options={{
        tabBarIcon: ({ color }: { color: string }) => (
          <List width={28} height={28} fill={color} />
        ),
      }}
    />
    <ShipperTab.Screen
      name={'History'}
      component={HistoryScreen}
      options={{
        tabBarIcon: ({ color }: { color: string }) => (
          <Clock width={28} height={28} fill={color} />
        ),
      }}
    />
    <ShipperTab.Screen
      name={'Profile'}
      component={ShipperProfileScreen}
      options={{
        tabBarIcon: ({ color }: { color: string }) => (
          <User width={28} height={28} fill={color} />
        ),
      }}
    />
  </ShipperTab.Navigator>
);

const ShipperStackNavigator = () => (
  <ShipperStack.Navigator screenOptions={{ headerShown: false }}>
    <ShipperStack.Screen
      name="shipperHomeTab"
      component={ShipperTabNavigator}
    />
    <ShipperStack.Screen
      name="orderDetail"
      component={ShipperOrderDetailScreen}
    />
  </ShipperStack.Navigator>
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

  useEffect(() => {
    dispatch(getCacheUserState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderApp = (() => {
    if (!user || !user.role) {
      return <LoginNavigator />;
    }

    if (user.role === 'Chef') {
      return <ChefNavigator />;
    }

    if (user.role === 'Shipper') {
      return <ShipperStackNavigator />;
    }

    return <LoginNavigator />;
  })();

  return <NavigationContainer>{renderApp}</NavigationContainer>;
};

export default Navigation;
