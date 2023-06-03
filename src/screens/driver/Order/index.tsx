import { Text } from '@rneui/themed';
import { ScreenContainer, ShipperOrderList } from 'components';
import Colors from 'constants/colors';
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { changeOrderStatus, getShipperOrders } from 'redux/actions/order';
import { getReadyOrders } from 'redux/actions/shipperHome';

const EXCEPTED_STATUS = ['New', 'Completed', 'Failed'];

const OrderScreen = () => {
  const dispatch = useDispatch<any>();
  const isChangeStatusLoading = useSelector(
    (state: RootState) => state.order.isLoading,
  );

  const { orders: orderList, isLoading } = useSelector(
    (state: RootState) => state.shipperOrder,
  );

  const fetchOrderList = () => {
    dispatch(getShipperOrders());
  };

  const fetchReadyOrderList = () => {
    dispatch(getReadyOrders());
  };

  useEffect(() => {
    fetchOrderList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeStatus = (id: number) => {
    dispatch(changeOrderStatus(id))
      .unwrap()
      .then(() => {
        fetchReadyOrderList();
      })
      .catch((err: any) => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  };

  const data = useMemo(() => {
    const statusOrder = new Map([
      ['Delivering', 1],
      ['Pending', 2],
      ['Preparing', 3],
      ['Confirmed', 4],
    ]);

    const sortedOrders = [...orderList];
    sortedOrders.sort(
      (a, b) =>
        (statusOrder.get(a.deliveryStatus) || 4) -
        (statusOrder.get(b.deliveryStatus) || 4),
    );

    const filteredOrders = sortedOrders.filter(
      x => !EXCEPTED_STATUS.includes(x.deliveryStatus),
    );

    const dataByBatch = filteredOrders.filter(item => !!item.batch.status);

    return dataByBatch;
  }, [orderList]);

  return (
    <ScreenContainer
      title="Order"
      hasBack={false}
      isLoading={isChangeStatusLoading}
      bodyContainerStyle={styles.container}>
      <ShipperOrderList
        orders={data}
        isLoading={isLoading}
        changeStatus={onChangeStatus}
        onRefreshData={fetchOrderList}
        EmptyListComponent={
          <View>
            <Text>No Delivering Order</Text>
          </View>
        }
      />
    </ScreenContainer>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});
