import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Navigation from 'navigation';
import { ThemeProvider } from '@rneui/themed';
import theme from 'theme';
import { Provider } from 'react-redux';
import { store } from 'store';

function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle={'dark-content'} />
        <Provider store={store}>
          <Navigation />
        </Provider>
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
