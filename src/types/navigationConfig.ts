import { LoginScreen } from 'screens';
import {
  CategoryScreen,
  DashboardScreen as ChefDashboardScreen,
  HistoryScreen,
  KitchenScreen,
  MarketScreen,
  SettingScreen,
} from 'screens/chef';
import { DashboardScreen as DriverDashboardScreen } from 'screens/driver';

export const CHEF_DASHBOARD = 'chefDashboard';
export const CHEF_MARKET = 'chefMarket';
export const CHEF_SETTINGS = 'chefSettings';
export const CHEF_KITCHEN = 'chefKitchen';
export const CHEF_HISTORY = 'chefHistory';
export const CHEF_CATEGORY = 'chefCategory';

export const chefNavigationConfig = [
  {
    name: CHEF_DASHBOARD,
    component: ChefDashboardScreen,
    title: 'Dashboard',
  },
  {
    name: CHEF_MARKET,
    component: MarketScreen,
    title: 'Market',
  },
  {
    name: CHEF_HISTORY,
    component: HistoryScreen,
    title: 'History',
  },
  {
    name: CHEF_KITCHEN,
    component: KitchenScreen,
    title: 'Kitchen',
  },
  {
    name: CHEF_CATEGORY,
    component: CategoryScreen,
    title: 'Category',
  },
  {
    name: CHEF_SETTINGS,
    component: SettingScreen,
    title: 'Settings',
  },
];

export const registrationConfig = [
  {
    name: 'loginScreen',
    component: LoginScreen,
    title: 'Login Screen',
  },
];

export const driverNavigationConfig = [
  {
    name: 'driverDashboard',
    component: DriverDashboardScreen,
    title: 'Dashboard',
  },
];
