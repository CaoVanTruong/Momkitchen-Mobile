import { ScreenContainer } from 'components';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import DishTypeItem from './DishTypeItem';
import { IDishType } from 'types/dish';
import { PlusRounded } from 'assets/svgs';
import { Colors } from 'constants';
import AddDishTypeForm from './AddDishTypeForm';
import { AddDishTypeFormType } from 'schemas/dishSchemas';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import {
  addDishTypes,
  getDishTypes,
  removeDishTypes,
} from 'redux/actions/market';

const DishTypeScreen = () => {
  const { dishTypes, isLoading } = useSelector(
    (state: RootState) => state.market,
  );
  const dispatch = useDispatch<any>();

  const fetchDishTypes = () => {
    dispatch(getDishTypes());
  };

  useEffect(() => {
    fetchDishTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [modalVisible, setModalVisibility] = useState(false);

  const renderItem = ({ item }: { item: IDishType }) => (
    <DishTypeItem
      key={item.id}
      onPress={() => {}}
      onRemove={() => {
        onRemoveTypeItem(item.id);
      }}
      {...item}
    />
  );

  const onAddTypeItem = () => {
    setModalVisibility(true);
  };

  const onRemoveTypeItem = (id: number) => {
    dispatch(removeDishTypes(id)).unwrap().then(fetchDishTypes);
  };

  const handleSubmit = (value: AddDishTypeFormType) => {
    setModalVisibility(false);
    dispatch(addDishTypes(value)).unwrap().then(fetchDishTypes);
  };

  return (
    <>
      <ScreenContainer
        isLoading={isLoading}
        title="Dish Type"
        bodyContainerStyle={styles.container}>
        <FlatList
          data={dishTypes}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          onRefresh={fetchDishTypes}
          refreshing={false}
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
