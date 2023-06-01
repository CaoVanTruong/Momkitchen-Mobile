import React from 'react';
import { Text } from '@rneui/themed';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import Colors from 'constants/colors';
import { Logo } from 'assets/svgs';
import { LoginFormType } from 'schemas/loginSchema';
import LoginForm from './components/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/actions/user';
import { ScreenContainer } from 'components';
import { RootState } from 'store';
import Dimension from 'constants/dimension';

const LoginScreen = () => {
  const dispatch = useDispatch<any>();

  const isLoading = useSelector((state: RootState) => state.user.isLoading);

  const onSubmit = (value: LoginFormType) => {
    dispatch(login({ email: value.email, password: value.password }))
      .unwrap()
      .catch((err: any) => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  };

  return (
    <ScreenContainer
      isLoading={isLoading}
      hasGradientBg
      gradientColors={Colors.gradient_1}
      bodyContainerStyle={styles.contentWrapper}
      headerShown={false}>
      <View style={styles.content}>
        <Text h2>Mom - Kitchen</Text>
        <View style={styles.imageWrapper}>
          <Logo
            width={Dimension.responsiveHeight(221)}
            height={Dimension.responsiveWidth(248)}
          />
        </View>
      </View>
      <LoginForm onSubmit={onSubmit} />
    </ScreenContainer>
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
    height: Dimension.responsiveHeight(221),
    width: Dimension.responsiveWidth(248),
  },
});
