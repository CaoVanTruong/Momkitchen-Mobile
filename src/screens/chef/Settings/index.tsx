import { Text } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Setting Screen</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
