import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Navigation from 'navigation';

function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
