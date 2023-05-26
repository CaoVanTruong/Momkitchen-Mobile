import { Text } from '@rneui/themed';
import { Times } from 'assets/svgs';
import Colors from 'constants/colors';
import Dimension from 'constants/dimension';

import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface ListFoodItemProps {
  name?: string;
  quantity?: number;
  onChangeQuantity?: (amount: number) => void;
  onRemove?: () => void;
}

const ListFoodItem = ({
  name = 'No title',
  quantity = 0,
  onRemove,
  onChangeQuantity = () => {},
}: ListFoodItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.dishInfo}>
        <Text style={styles.dishTitle}>{name}</Text>
        <View style={styles.quantityWrapper}>
          <TouchableOpacity
            style={[styles.quantityBtn, styles.minusBtn]}
            onPress={() => onChangeQuantity(quantity - 1)}>
            <Text style={styles.quantityBtnLabel}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityLabel}>{quantity}</Text>
          <TouchableOpacity
            style={[styles.quantityBtn, styles.plusBtn]}
            onPress={() => onChangeQuantity(quantity + 1)}>
            <Text style={styles.quantityBtnLabel}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
        <Times width={24} height={24} fill={Colors.red} />
      </TouchableOpacity>
    </View>
  );
};

export default ListFoodItem;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.border,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Dimension.RADIUS_2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  dishInfo: {
    flex: 1,
  },
  dishTitle: {
    marginBottom: 8,
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  quantityLabel: {
    padding: 4,
    width: 32,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  quantityBtn: {
    padding: 4,
    width: 32,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  plusBtn: {
    borderLeftWidth: 0,
  },
  minusBtn: {
    borderRightWidth: 0,
  },
  quantityBtnLabel: {
    textAlign: 'center',
  },
  removeBtn: {
    padding: 8,
    marginRight: -8,
  },
});
