import { Text } from '@rneui/themed';
import Colors from 'constants/colors';
import Dimension from 'constants/dimension';
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
    width: Dimension.SCREEN_WIDTH / 2 - 48,
    height: Dimension.SCREEN_WIDTH / 2 - 48,
    backgroundColor: Colors.white,
    borderRadius: Dimension.RADIUS_3,
    margin: 12,
    borderColor: Colors.lightGreen,
    borderWidth: 1,
    ...shadowStyle.ELEVATOR_4,
  },
  touchableMenu: {
    flex: 1,
    borderRadius: Dimension.RADIUS_3,
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
