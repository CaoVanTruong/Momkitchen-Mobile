import { useRoute } from '@react-navigation/native';
import { ScreenContainer } from 'components';
import Colors from 'constants/colors';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFoodPackageToSession,
  getFoodPackages,
  getFoodPackagesInSession,
} from 'redux/actions/foodPackage';
import { RootState } from 'store';
import FoodPackageItem from './FoodPackageItem';
import { PlusRounded } from 'assets/svgs';
import AddFoodPackage from './AddFoodPackage';
import { IFoodPackageInSession } from 'types/foodPackage';
import { AddFoodPackageToSessionFormType } from 'schemas/foodPackageSchemas';

const MarketDetail = () => {
  const router = useRoute();
  const dispatch = useDispatch<any>();

  const { items: sessions } = useSelector((state: RootState) => state.session);

  const { items: foodPackagesList, isLoading } = useSelector(
    (state: RootState) => state.foodPackage,
  );

  const { sessionId } = router.params as any;

  const sessionInfo = sessions.find(ss => ss.id === sessionId);

  const [pksList, setPkgList] = useState<IFoodPackageInSession[]>([]);
  const [modalVisible, setModalVisibility] = useState(false);

  const fetchFoodPackageInSession = useCallback(() => {
    dispatch(getFoodPackagesInSession(sessionId))
      .unwrap()
      .then((foodPackages: IFoodPackageInSession[]) =>
        setPkgList(foodPackages),
      );
  }, [dispatch, sessionId]);

  const fetchFoodPackages = () => {
    dispatch(getFoodPackages());
  };

  useEffect(() => {
    if (sessionId) {
      fetchFoodPackageInSession();
      fetchFoodPackages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const renderItem = ({ item }: { item: IFoodPackageInSession }) => {
    return (
      <FoodPackageItem
        name={item.foodPackage.name}
        createDate={item.createDate}
        description={item.foodPackage.description}
        image={item.foodPackage.image}
        price={item.price}
        quantity={item.quantity}
        remainQuantity={item.remainQuantity}
      />
    );
  };

  const handleSubmit = (values: AddFoodPackageToSessionFormType) => {
    setModalVisibility(false);
    const params = {
      ...values,
      sessionId,
    };
    dispatch(addFoodPackageToSession(params))
      .unwrap()
      .then(fetchFoodPackageInSession);
  };

  return (
    <>
      <ScreenContainer
        title={sessionInfo?.title || `Session #${sessionInfo?.id}`}
        isLoading={isLoading}
        bodyContainerStyle={styles.container}>
        <FlatList
          data={pksList}
          renderItem={renderItem}
          keyExtractor={item => item?.id.toString()}
          refreshing={false}
          onRefresh={fetchFoodPackageInSession}
        />
        <TouchableOpacity
          style={styles.overlayBtn}
          onPress={() => setModalVisibility(true)}>
          <PlusRounded width={48} height={48} fill={Colors.darkGreen} />
        </TouchableOpacity>
      </ScreenContainer>
      <AddFoodPackage
        visible={modalVisible}
        foodPackages={foodPackagesList}
        onClose={() => setModalVisibility(false)}
        onSubmit={handleSubmit}
      />
    </>
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
  overlayBtn: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
