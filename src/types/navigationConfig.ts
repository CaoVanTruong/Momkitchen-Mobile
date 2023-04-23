import { LoginScreen } from 'screens';
import { DashboardScreen as ChefDashboardScreen } from 'screens/chef';
import { DashboardScreen as DriverDashboardScreen } from 'screens/driver';

export const chefNavigationConfig = [
  {
    name: 'chefDashboard',
    component: ChefDashboardScreen,
    title: 'Dashboard',
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
