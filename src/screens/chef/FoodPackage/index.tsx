import { ScreenContainer } from 'components';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getFoodPackages } from 'redux/actions/foodPackage';
import { RootState } from 'store';
import { IFoodPackage } from 'types/foodPackage';
import FoodPackageItem from './FoodPackageItem';
import { PlusRounded } from 'assets/svgs';
import Colors from 'constants/colors';
import { useNavigation } from '@react-navigation/native';

const FoodPackageScreen = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();

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

  const onAddTypeItem = () => {
    navigation.navigate('addFoodPackage');
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
      <TouchableOpacity style={styles.overlayBtn} onPress={onAddTypeItem}>
        <PlusRounded width={48} height={48} fill={Colors.darkGreen} />
      </TouchableOpacity>
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
  overlayBtn: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
