import { Text } from '@rneui/themed';
import { ScreenContainer, ShipperOrderList } from 'components';
import Colors from 'constants/colors';
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getShipperOrders } from 'redux/actions/order';
import { RootState } from 'store';

const INCLUDED_STATUS = ['Completed', 'Failed'];

const HistoryScreen = () => {
  const dispatch = useDispatch<any>();

  const { orders: orderList, isLoading } = useSelector(
    (state: RootState) => state.shipperOrder,
  );

  const fetchOrderList = () => {
    dispatch(getShipperOrders());
  };

  useEffect(() => {
    fetchOrderList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useMemo(() => {
    return orderList.filter(x => INCLUDED_STATUS.includes(x.deliveryStatus));
  }, [orderList]);

  return (
    <ScreenContainer
      title="History"
      hasBack={false}
      bodyContainerStyle={styles.container}
      isLoading={isLoading}>
      <ShipperOrderList
        orders={data}
        changeStatus={() => {}}
        onRefreshData={fetchOrderList}
        EmptyListComponent={
          <View>
            <Text>No Collection Order</Text>
          </View>
        }
      />
    </ScreenContainer>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});
