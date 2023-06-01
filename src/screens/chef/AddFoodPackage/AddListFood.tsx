import { Text } from '@rneui/themed';
import { PlusRounded } from 'assets/svgs';
import Colors from 'constants/colors';
import React, { useState } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AddFoodPackageFormType } from 'schemas/foodPackageSchemas';
import { IDish } from 'types/dish';
import ListFoodItem from './ListFoodItem';
import SelectDishModal from './SelectDishModal';
import Dimension from 'constants/dimension';

interface AddListFoodProps {
  control: Control<AddFoodPackageFormType>;
  dishesList: IDish[];
  disabled?: boolean;
}

const AddListFood = ({
  control,
  dishesList,
  disabled = false,
}: AddListFoodProps) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'dishes',
  });

  const [modalVisible, setModalVisibility] = useState(false);

  const onChangeQuantity = (item: any, index: number) => (amount: number) => {
    update(index, {
      ...item,
      quantity: amount,
    });
  };

  const onRemove = (index: number) => {
    remove(index);
  };

  const onAddItem = (value: IDish) => {
    setModalVisibility(false);
    const itemIndex = fields.findIndex(item => item.dishId === value.id);
    if (itemIndex !== -1) {
      update(itemIndex, {
        ...fields[itemIndex],
        quantity: (fields[itemIndex]?.quantity || 0) + 1,
      });
    } else {
      append({ dishId: value.id, quantity: 1, title: value.name });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Dishes List</Text>
          {!disabled && (
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => setModalVisibility(true)}>
              <Text style={styles.addBtnLabel}>Add</Text>
              <PlusRounded width={16} height={16} fill={Colors.black} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.body}>
          {fields.map((item, index) =>
            disabled ? (
              <View style={styles.foodItemWrapper}>
                <Text style={styles.foodItemLabel}>
                  {item.title || 'No Title'}
                </Text>
                <Text>{item.quantity}</Text>
              </View>
            ) : (
              <ListFoodItem
                key={item.id}
                name={item.title}
                quantity={item.quantity}
                onRemove={() => onRemove(index)}
                onChangeQuantity={onChangeQuantity(item, index)}
              />
            ),
          )}
        </View>
      </View>
      <SelectDishModal
        isVisible={modalVisible}
        dishesList={dishesList}
        onClose={() => setModalVisibility(false)}
        onItemSelect={onAddItem}
      />
    </>
  );
};

export default AddListFood;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.superDarkPink,
    marginLeft: 12,
  },
  addBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGreen,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Dimension.RADIUS_2,
  },
  addBtnLabel: {
    marginRight: 4,
  },
  body: {
    paddingHorizontal: 8,
  },
  foodItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
    backgroundColor: Colors.gray,
  },
  foodItemLabel: {
    fontWeight: 'bold',
  },
});
