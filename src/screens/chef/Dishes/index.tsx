import { Text } from '@rneui/themed';
import { ScreenContainer } from 'components';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const DishesScreen = () => {
  return (
    <ScreenContainer title="Dishes" bodyContainerStyle={styles.container}>
      <View>
        <Text>Dishes Screen</Text>
      </View>
    </ScreenContainer>
  );
};

export default DishesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
