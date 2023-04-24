import { Text } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const KitchenScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Kitchen Screen</Text>
    </View>
  );
};

export default KitchenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
