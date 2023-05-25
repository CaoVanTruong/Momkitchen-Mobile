import React from 'react';
import { Text } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';
import { Dimensions, Colors } from 'constants';
import { Logo } from 'assets/svgs';
import { LoginFormType } from 'schemas/loginSchema';
import LoginForm from './components/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/actions/user';
import { ScreenContainer } from 'components';
import { RootState } from 'store';

const LoginScreen = () => {
  const dispatch = useDispatch<any>();

  const isLoading = useSelector((state: RootState) => state.user.isLoading);

  const onSubmit = (value: LoginFormType) => {
    dispatch(login({ email: value.email, password: value.password }));
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
            width={Dimensions.responsiveHeight(221)}
            height={Dimensions.responsiveWidth(248)}
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
    height: Dimensions.responsiveHeight(221),
    width: Dimensions.responsiveWidth(248),
  },
});
