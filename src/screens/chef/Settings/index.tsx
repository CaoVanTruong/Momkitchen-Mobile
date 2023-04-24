import { ScreenContainer } from 'components';
import React from 'react';
import { StyleSheet } from 'react-native';

const SettingsScreen = () => {
  return <ScreenContainer title="Settings" />;
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
