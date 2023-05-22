import { ScreenContainer } from 'components';
import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import DishTypeItem from './DishTypeItem';
import { IDishType } from 'types/dish';
import { PlusRounded } from 'assets/svgs';
import { Colors } from 'constants';
import AddDishTypeForm from './AddDishTypeForm';
import { AddDishTypeFormType } from 'schemas/dishSchemas';

const TYPES: IDishType[] = [
  {
    id: '001',
    name: 'Soup',
    description: 'Lorem ipsum dolor sit amet consectetur adip',
  },
  {
    id: '002',
    name: 'Rice',
    description: 'Lorem ipsum dolor sit amet consectetur adip',
  },
  {
    id: '003',
    name: 'Bistro',
    description: 'Lorem ipsum dolor sit amet consectetur adip',
  },
  {
    id: '004',
    name: 'Beer',
    description: 'Lorem ipsum dolor sit amet consectetur adip',
  },
];

const DishTypeScreen = () => {
  const [modalVisible, setModalVisibility] = useState(false);

  const renderItem = ({ item }: { item: IDishType }) => (
    <DishTypeItem
      key={item.id}
      onPress={() => {}}
      onRemove={() => {}}
      {...item}
    />
  );

  const onAddTypeItem = () => {
    setModalVisibility(true);
  };

  const handleSubmit = (value: AddDishTypeFormType) => {
    setModalVisibility(false);
    TYPES.push(value as any);
  };

  return (
    <>
      <ScreenContainer title="Dish Type" bodyContainerStyle={styles.container}>
        <FlatList
          data={TYPES}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
        <TouchableOpacity style={styles.overlayBtn} onPress={onAddTypeItem}>
          <PlusRounded width={48} height={48} fill={Colors.darkGreen} />
        </TouchableOpacity>
      </ScreenContainer>
      <AddDishTypeForm
        visible={modalVisible}
        onClose={() => setModalVisibility(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default DishTypeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  overlayBtn: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
