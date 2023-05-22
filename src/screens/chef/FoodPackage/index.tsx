import { ScreenContainer } from 'components';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getFoodPackages } from 'redux/actions/foodPackage';
import { RootState } from 'store';
import { IFoodPackage } from 'types/foodPackage';
import FoodPackageItem from './FoodPackageItem';

const FoodPackageScreen = () => {
  const dispatch = useDispatch<any>();
  const { items: listFoodPackages, isLoading } = useSelector(
    (state: RootState) => state.foodPackage,
  );

  useEffect(() => {
    getFoodPackagesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFoodPackagesList = () => {
    dispatch(getFoodPackages());
  };

  const renderItem = ({ item }: { item: IFoodPackage }) => {
    return <FoodPackageItem {...item} onPress={() => {}} />;
  };

  return (
    <ScreenContainer title="Food Package" bodyContainerStyle={styles.container}>
      <FlatList
        data={listFoodPackages}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        refreshing={isLoading}
        onRefresh={getFoodPackagesList}
      />
    </ScreenContainer>
  );
};

export default FoodPackageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});
