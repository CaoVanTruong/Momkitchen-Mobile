import React from 'react';
import { Text } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, Colors } from 'constants';
import { Logo } from 'assets/svgs';
import { LoginFormType } from 'schemas/loginSchema';
import LoginForm from './components/LoginForm';
import { useDispatch } from 'react-redux';
import { login } from 'redux/slices/User';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const onSubmit = (value: LoginFormType) => {
    console.log(value);
    dispatch(login());
  };

  return (
    <LinearGradient colors={Colors.gradient_1} style={styles.container}>
      <SafeAreaView style={styles.contentWrapper}>
        <View style={styles.content}>
          <Text h2>Mom - Kitchen</Text>
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
        <LoginForm onSubmit={onSubmit} />
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
