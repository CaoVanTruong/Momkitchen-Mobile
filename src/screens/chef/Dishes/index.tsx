import { ScreenContainer } from 'components';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import DishItem from './DishItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { IDish } from 'types/dish';
import { addDish, getDishTypes, getDishes } from 'redux/actions/market';
import { PlusRounded } from 'assets/svgs';
import Colors from 'constants/colors';
import AddDishForm from './AddDishForm';
import { AddDishFormType } from 'schemas/dishSchemas';

const DishesScreen = () => {
  const { dishes, dishTypes, isLoading } = useSelector(
    (state: RootState) => state.market,
  );

  const dispatch = useDispatch<any>();

  const fetchDishesList = () => {
    dispatch(getDishes());
  };

  const fetchDishTypes = () => {
    dispatch(getDishTypes());
  };

  useEffect(() => {
    fetchDishesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchDishTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [modalVisible, setModalVisibility] = useState(false);

  const renderItem = ({ item }: { item: IDish }) => (
    <DishItem onPress={() => {}} {...item} />
  );

  const showAddModal = () => {
    setModalVisibility(true);
  };

  const onAddDish = (values: AddDishFormType) => {
    setModalVisibility(false);
    dispatch(addDish(values));
  };

  return (
    <>
      <ScreenContainer
        isLoading={isLoading}
        title="Dishes"
        bodyContainerStyle={styles.container}>
        <FlatList
          data={dishes}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          onRefresh={fetchDishesList}
          refreshing={false}
        />
        <TouchableOpacity style={styles.overlayBtn} onPress={showAddModal}>
          <PlusRounded width={48} height={48} fill={Colors.darkGreen} />
        </TouchableOpacity>
      </ScreenContainer>
      <AddDishForm
        visible={modalVisible}
        onClose={() => setModalVisibility(false)}
        onSubmit={onAddDish}
        dishTypes={dishTypes}
      />
    </>
  );
};

export default DishesScreen;

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
