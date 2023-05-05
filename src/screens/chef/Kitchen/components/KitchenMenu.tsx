import { Text } from '@rneui/themed';
import { Colors, Dimensions } from 'constants';
import shadowStyle from 'constants/shadowStyle';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface KitchenMenuProps {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
}

const KitchenMenu = ({ label, icon, onPress }: KitchenMenuProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchableMenu} onPress={onPress}>
        <View style={styles.iconWrapper}>{icon}</View>
        <Text style={styles.menuLabel}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default KitchenMenu;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.SCREEN_WIDTH / 2 - 48,
    height: Dimensions.SCREEN_WIDTH / 2 - 48,
    backgroundColor: Colors.white,
    borderRadius: Dimensions.RADIUS_3,
    margin: 12,
    borderColor: Colors.lightGreen,
    borderWidth: 1,
    ...shadowStyle.ELEVATOR_4,
  },
  touchableMenu: {
    flex: 1,
    borderRadius: Dimensions.RADIUS_3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    padding: 12,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
