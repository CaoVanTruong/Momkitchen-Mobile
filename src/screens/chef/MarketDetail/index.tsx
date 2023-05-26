import { useRoute } from '@react-navigation/native';
import { ScreenContainer } from 'components';
import Colors from 'constants/colors';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getFoodPackagesInSession } from 'redux/actions/foodPackage';
import { RootState } from 'store';
import FoodPackageItem from './FoodPackageItem';

const MarketDetail = () => {
  const router = useRoute();
  const dispatch = useDispatch<any>();

  // const { items: sessions } = useSelector((state: RootState) => state.session);

  const isLoading = useSelector(
    (state: RootState) => state.foodPackage.isLoading,
  );

  const { sessionId } = router.params as any;

  const [pksList, setPkgList] = useState<any[]>([]);

  const fetchFoodPackageInSession = useCallback(() => {
    dispatch(getFoodPackagesInSession(sessionId))
      .unwrap()
      .then((foodPackages: any[]) => setPkgList(foodPackages));
  }, [dispatch, sessionId]);

  useEffect(() => {
    if (sessionId) {
      fetchFoodPackageInSession();
    }
  }, [fetchFoodPackageInSession, sessionId]);

  const renderItem = ({ item }: { item: any }) => {
    return <FoodPackageItem {...item} />;
  };

  return (
    <ScreenContainer title="No Title" bodyContainerStyle={styles.container}>
      <FlatList
        data={pksList}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
        refreshing={isLoading}
        onRefresh={fetchFoodPackageInSession}
      />
    </ScreenContainer>
  );
};

export default MarketDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});
