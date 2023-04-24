import { Text } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const MarketScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Market Screen</Text>
    </View>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
