import { Text } from '@rneui/themed';
import { Bell, Category, History, Kitchen, Market, Setting } from 'assets/svgs';
import { Colors } from 'constants';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogOutBtn from './components/LogOutBtn';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/slices/User';
import { DashboardItem } from 'components';

const DASHBOARD_MENU = [
  {
    icon: <Market width={36} height={36} />,
    title: 'Markets',
    subtitle: 'Tap here to sale',
    screenName: '',
  },
  {
    icon: <History width={36} height={36} />,
    title: 'History',
    subtitle: 'View all your orders',
    screenName: '',
  },
  {
    icon: <Kitchen width={36} height={36} />,
    title: 'Kitchen',
    subtitle: 'Manage your dishes',
    screenName: '',
  },
  {
    icon: <Setting width={36} height={36} />,
    title: 'Settings',
    subtitle: 'Setting your profile',
    screenName: '',
  },
  {
    icon: <Category width={36} height={36} />,
    title: 'Category',
    subtitle: 'Many type of foods',
    screenName: '',
  },
];

const DashboardScreen = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  const onNotificationPress = () => {};
  return (
    <LinearGradient colors={Colors.gradient_2} style={styles.gradientbg}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerWrapper}>
          <Text style={styles.welcomeTitle}>Welcome to Mom Kitchen</Text>
          <TouchableOpacity onPress={onNotificationPress}>
            <Bell width={40} height={40} fill={Colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Text h2 style={styles.headerTitle}>
            Dashboard
          </Text>
          <View style={styles.menuContainer}>
            {DASHBOARD_MENU.map(menu => (
              <DashboardItem key={menu.title} onPress={() => {}} {...menu} />
            ))}
          </View>
        </View>
        <LogOutBtn onLogout={onLogout} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  gradientbg: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerWrapper: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  welcomeTitle: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: Colors.gray,
    fontSize: 12,
  },
  contentContainer: {
    flex: 1,
  },
  headerTitle: {
    color: Colors.white,
  },
  menuContainer: {
    flex: 1,
    marginVertical: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 24,
  },
});
