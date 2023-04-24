import { ScreenContainer } from 'components';
import React from 'react';
import { StyleSheet } from 'react-native';

const KitchenScreen = () => {
  return <ScreenContainer title="Kitchen" />;
};

export default KitchenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
