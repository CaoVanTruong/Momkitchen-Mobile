import { Text } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const HistoryScreen = () => {
  return (
    <View style={StyleSheet.container}>
      <Text>History Screen</Text>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
