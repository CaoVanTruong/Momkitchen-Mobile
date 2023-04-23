import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const LoadingScreen = () => {
  return (
    <View>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export default LoadingScreen;
