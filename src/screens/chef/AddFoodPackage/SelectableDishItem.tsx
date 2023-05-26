import { Text } from '@rneui/themed';
import Colors from 'constants/colors';
import Dimension from 'constants/dimension';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface SelectableDishItemProps {
  name: string;
  dishType?: string;
  onPress: () => void;
}

const SelectableDishItem = ({
  name,
  dishType,
  onPress,
}: SelectableDishItemProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.touchableItem}>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          {!!dishType && <Text style={styles.desc}>{dishType}</Text>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SelectableDishItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: Dimension.RADIUS_2,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  touchableItem: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  info: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  desc: {
    fontSize: 12,
    color: Colors.black,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: Colors.lightGreen,
    borderRadius: Dimension.RADIUS_2,
  },
});
