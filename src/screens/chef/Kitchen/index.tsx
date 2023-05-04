import { ScreenContainer } from 'components';
import React from 'react';
import { StyleSheet } from 'react-native';

const KitchenScreen = () => {
  return (
    <ScreenContainer
      hasBack={false}
      title="Kitchen"
      bodyContainerStyle={styles.container}
    />
  );
};

export default KitchenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
