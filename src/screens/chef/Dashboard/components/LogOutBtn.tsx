import { Text } from '@rneui/themed';
import { Logout } from 'assets/svgs';
import { Colors } from 'constants';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface LogoutBtnProps {
  onLogout: () => void;
}

const LogOutBtn = ({ onLogout }: LogoutBtnProps) => {
  return (
    <TouchableOpacity onPress={onLogout} style={styles.footerWrapper}>
      <Logout width={40} height={40} fill={Colors.orange} />
      <View style={styles.logoutWrapper}>
        <Text h3 style={styles.logout}>
          LOGOUT
        </Text>
        <Text style={styles.logoutSubcript}>Close your session</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LogOutBtn;

const styles = StyleSheet.create({
  footerWrapper: {
    alignSelf: 'stretch',
    backgroundColor: Colors.gray,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  logoutWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logout: {
    color: Colors.darkGreen,
  },
  logoutSubcript: {
    color: Colors.darkGreen,
    fontSize: 12,
    textTransform: 'uppercase',
  },
});
