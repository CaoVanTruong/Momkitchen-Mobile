import { Button, Text } from '@rneui/themed';
import { UserPlaceholder } from 'assets/svgs';
import { ScreenContainer } from 'components';
import { Colors, Dimensions } from 'constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/actions/user';
import { RootState } from 'store';

const SettingsScreen = () => {
  const dispatch = useDispatch<any>();
  const user = useSelector((state: RootState) => state.user.user);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <ScreenContainer
      hasBack={false}
      title="Profile"
      bodyContainerStyle={styles.container}>
      <View style={styles.imgPlaceholder}>
        <UserPlaceholder width={64} height={64} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Icon
            name="user"
            size={24}
            color={Colors.orange}
            style={styles.infoIcon}
          />
          <Text style={styles.infoContent}>{user!.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon
            name="envelope"
            size={24}
            color={Colors.orange}
            style={styles.infoIcon}
          />
          <Text style={styles.infoContent}>{user!.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon
            name="phone"
            size={24}
            color={Colors.orange}
            style={styles.infoIcon}
          />
          <Text style={styles.infoContent}>{user!.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon
            name="map-marker-alt"
            size={24}
            color={Colors.orange}
            style={styles.infoIcon}
          />
          <Text style={styles.infoContent}>{user!.address}</Text>
        </View>
      </View>
      <View style={styles.actionContainer}>
        <Button
          buttonStyle={styles.logoutBtn}
          titleStyle={styles.buttonTitle}
          title={'Logout'}
          onPress={onLogout}
        />
      </View>
    </ScreenContainer>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  imgPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGreen,
    alignSelf: 'center',
    padding: 24,
    marginBottom: 16,
    borderRadius: 64,
  },
  infoContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16,
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
  },
  infoIcon: {
    width: 24,
    marginRight: 16,
  },
  infoContent: {
    fontSize: 14,
  },
  actionContainer: {},
  logoutBtn: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: Dimensions.RADIUS_2,
    backgroundColor: Colors.red,
  },
  buttonTitle: {
    fontWeight: 'bold',
  },
});
