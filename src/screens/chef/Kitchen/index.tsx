import { ScreenContainer } from 'components';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const KitchenScreen = () => {
  return (
    <ScreenContainer
      hasBack={false}
      title="Kitchen"
      bodyContainerStyle={styles.container}>
      <View />
    </ScreenContainer>
  );
};

export default KitchenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
