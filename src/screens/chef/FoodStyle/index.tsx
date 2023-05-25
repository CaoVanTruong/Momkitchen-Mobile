import { ScreenContainer } from 'components';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import FoodStyleItem from './FoodStyleItem';
import { IFoodStyle } from 'types/foodStyle';
import {
  addFoodStyle,
  getFoodStyles,
  removeFoodStyle,
} from 'redux/actions/market';
import AddFoodStyleForm from './AddFoodStyleForm';
import { PlusRounded } from 'assets/svgs';
import { Colors } from 'constants';
import { AddFoodStyleFormType } from 'schemas/dishSchemas';

const FoodStyleScreen = () => {
  const dispatch = useDispatch<any>();

  const { foodStyles, isLoading } = useSelector(
    (state: RootState) => state.market,
  );

  const fetchFoodStyles = () => {
    dispatch(getFoodStyles());
  };

  useEffect(() => {
    fetchFoodStyles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [modalVisible, setModalVisibility] = useState(false);

  const showAddModal = () => {
    setModalVisibility(true);
  };

  const onAddFoodStyle = (values: AddFoodStyleFormType) => {
    setModalVisibility(false);
    dispatch(addFoodStyle(values))
      .unwrap()
      .then(fetchFoodStyles)
      .catch((err: Error) => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  };

  const removeFoodStyleItem = (id: number) => {
    dispatch(removeFoodStyle(id))
      .unwrap()
      .catch((err: Error) => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  };

  const renderItem = ({ item }: { item: IFoodStyle }) => {
    return (
      <FoodStyleItem
        {...item}
        onPress={() => {}}
        onRemove={() => {
          removeFoodStyleItem(item.id);
        }}
      />
    );
  };
  return (
    <>
      <ScreenContainer
        isLoading={isLoading}
        title="Food Styles"
        bodyContainerStyle={styles.container}>
        <FlatList
          data={foodStyles}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          refreshing={false}
          onRefresh={fetchFoodStyles}
        />
        <TouchableOpacity style={styles.overlayBtn} onPress={showAddModal}>
          <PlusRounded width={48} height={48} fill={Colors.darkGreen} />
        </TouchableOpacity>
      </ScreenContainer>
      <AddFoodStyleForm
        visible={modalVisible}
        onClose={() => {
          setModalVisibility(false);
        }}
        onSubmit={onAddFoodStyle}
      />
    </>
  );
};

export default FoodStyleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  overlayBtn: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
