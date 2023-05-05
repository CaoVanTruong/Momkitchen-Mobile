import { Text } from '@rneui/themed';
import { ScreenContainer } from 'components';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const FoodStyleScreen = () => {
  return (
    <ScreenContainer title="Food Styles" bodyContainerStyle={styles.container}>
      <View>
        <Text>Dishes Screen</Text>
      </View>
    </ScreenContainer>
  );
};

export default FoodStyleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
