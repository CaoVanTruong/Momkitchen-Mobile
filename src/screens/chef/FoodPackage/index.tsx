import { Text } from '@rneui/themed';
import { ScreenContainer } from 'components';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const FoodPackageScreen = () => {
  return (
    <ScreenContainer title="Food Package" bodyContainerStyle={styles.container}>
      <View>
        <Text>Dishes Screen</Text>
      </View>
    </ScreenContainer>
  );
};

export default FoodPackageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
