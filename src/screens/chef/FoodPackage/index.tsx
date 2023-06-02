import { ScreenContainer } from 'components';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getFoodPackages, removeFoodPackage } from 'redux/actions/foodPackage';
import { RootState } from 'store';
import { IFoodPackage } from 'types/foodPackage';
import FoodPackageItem from './FoodPackageItem';
import { PlusRounded, Search } from 'assets/svgs';
import Colors from 'constants/colors';
import { useNavigation } from '@react-navigation/native';
import { Input } from '@rneui/themed';
import Dimension from 'constants/dimension';

const FoodPackageScreen = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const [searchText, setSearchText] = useState('');

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

  const goToDetail = (id: number) => {
    navigation.navigate('addFoodPackage', { foodPackageId: id });
  };

  const handleRemoveFoodPackage = (id: number) => {
    dispatch(removeFoodPackage(id))
      .unwrap()
      .catch((err: any) => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  };

  const renderItem = ({ item }: { item: IFoodPackage }) => {
    return (
      <FoodPackageItem
        {...item}
        onRemove={() => handleRemoveFoodPackage(item.id)}
        onPress={() => goToDetail(item.id)}
      />
    );
  };

  return (
    <ScreenContainer
      title="Food Package"
      isLoading={isLoading}
      bodyContainerStyle={styles.container}>
      <View>
        <Input
          value={searchText}
          inputStyle={styles.searchInput}
          inputContainerStyle={styles.searchInputContainer}
          placeholder="Search"
          onChangeText={text =>
            setSearchText(prev => (text !== prev ? text : prev))
          }
          rightIcon={<Search width={20} height={20} stroke={Colors.black_80} />}
        />
      </View>
      <FlatList
        data={listFoodPackages.filter(fp =>
          fp.name.toLowerCase().includes(searchText.toLowerCase()),
        )}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        refreshing={false}
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
  searchInput: {
    paddingVertical: 4,
  },
  searchInputContainer: {
    paddingHorizontal: 8,
    borderRadius: Dimension.RADIUS_3,
    borderColor: Colors.gray,
    borderWidth: 1,
    backgroundColor: Colors.white,
  },
  overlayBtn: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
