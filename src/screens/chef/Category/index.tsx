import { Text } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const CategoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Category Screen</Text>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
