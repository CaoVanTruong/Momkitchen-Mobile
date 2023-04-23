import { Image, Text } from '@rneui/themed';

import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, Colors } from 'constants';
import LoginForm from './components/LoginForm';
import { Logo } from 'assets/svgs';

const LoginScreen = () => {
  return (
    <LinearGradient
      colors={[Colors.lightPink, Colors.white]}
      style={styles.container}>
      <SafeAreaView style={styles.contentWrapper}>
        <View style={styles.content}>
          <Text>Mom - Kitchen</Text>
          <View style={styles.imageWrapper}>
            {/* <Image
              source={{ uri: 'http://via.placeholder.com/640x360' }}
              style={styles.image}
              resizeMode="cover"
            /> */}
            <Logo
              width={Dimensions.responsiveHeight(221)}
              height={Dimensions.responsiveWidth(248)}
            />
          </View>
        </View>
        <LoginForm />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  image: {
    height: Dimensions.responsiveHeight(221),
    width: Dimensions.responsiveWidth(248),
  },
});
