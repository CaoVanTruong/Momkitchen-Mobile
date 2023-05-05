import { Text } from '@rneui/themed';
import { Times } from 'assets/svgs';
import { Colors, Dimensions } from 'constants';
import shadowStyle from 'constants/shadowStyle';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface DishTypeItemProps {
  name: string;
  description: string;
  onPress: () => void;
  onRemove: () => void;
}

const DishTypeItem = ({
  name,
  description,
  onPress,
  onRemove,
}: DishTypeItemProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.touchableItem}>
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.desc}>{description}</Text>
        </View>
        <View style={styles.action}>
          <TouchableOpacity onPress={onRemove} style={styles.actionBtn}>
            <Times width={24} height={24} fill={Colors.red} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DishTypeItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: Dimensions.RADIUS_2,
    marginBottom: 12,
    ...shadowStyle.ELEVATOR_4,
  },
  touchableItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  content: {},
  action: {
    position: 'absolute',
    right: 4,
    top: 12,
  },
  actionBtn: {
    padding: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  desc: {
    fontSize: 12,
    color: Colors.black,
  },
});
