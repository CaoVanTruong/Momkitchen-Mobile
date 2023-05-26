import { Button, Input } from '@rneui/themed';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import Colors from 'constants/colors';
import { loginSchema } from 'schemas';
import type { LoginFormType } from 'schemas/loginSchema';
import { Envelop, Lock } from 'assets/svgs';
import Dimension from 'constants/dimension';

interface LoginFormProps {
  onSubmit: (value: LoginFormType) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const { control, handleSubmit } = useForm<LoginFormType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: 'chef-long@gmail.com',
      password: 'stringAAA@123',
    },
  });

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            placeholder="example@mail.com"
            label="Account Name"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={error?.message}
            errorStyle={styles.error}
            inputStyle={styles.input}
            labelStyle={styles.label}
            leftIcon={<Envelop width={24} height={24} fill={Colors.darkPink} />}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            placeholder="********"
            label="Password"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry
            errorMessage={error?.message}
            errorStyle={styles.error}
            inputStyle={styles.input}
            labelStyle={styles.label}
            leftIcon={<Lock width={24} height={24} fill={Colors.darkPink} />}
          />
        )}
      />
      <Button
        title="Sign In"
        onPress={handleSubmit(onSubmit)}
        buttonStyle={styles.button}
        titleStyle={styles.btnTitle}
      />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginTop: 24,
  },
  input: {
    paddingHorizontal: 8,
  },
  label: {
    color: Colors.superDarkPink,
    textTransform: 'uppercase',
  },
  error: {
    color: Colors.red,
  },
  button: {
    marginHorizontal: 8,
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: Dimension.RADIUS_2,
    backgroundColor: Colors.pink,
  },
  btnTitle: {
    fontWeight: 'bold',
  },
});
