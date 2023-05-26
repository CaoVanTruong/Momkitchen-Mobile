import { Modal } from 'components';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { IDish } from 'types/dish';
import SelectableDishItem from './SelectableDishItem';

interface SelectDishModalProps {
  isVisible: boolean;
  dishesList: IDish[];
  onItemSelect: (item: IDish) => void;
  onClose: () => void;
}

const SelectDishModal = ({
  isVisible,
  dishesList,
  onItemSelect,
  onClose,
}: SelectDishModalProps) => {
  const renderItem = ({ item }: { item: IDish }) => {
    return (
      <SelectableDishItem
        name={item.name}
        dishType={item.dishType?.name}
        onPress={() => onItemSelect(item)}
      />
    );
  };
  return (
    <Modal
      isVisible={isVisible}
      title="Select Dish"
      actionBtnShown={false}
      onClose={onClose}>
      <FlatList
        data={dishesList}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        style={styles.list}
      />
    </Modal>
  );
};

export default SelectDishModal;

const styles = StyleSheet.create({
  list: {
    maxHeight: 400,
  },
});
