import { Text } from '@rneui/themed';
import { ScreenContainer } from 'components';
import Colors from 'constants/colors';
import React from 'react';
import { StyleSheet } from 'react-native';

const Order = () => {
  return (
    <ScreenContainer
      hasBack={false}
      title="Order"
      bodyContainerStyle={styles.container}>
      <Text>Order Screen</Text>
    </ScreenContainer>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
