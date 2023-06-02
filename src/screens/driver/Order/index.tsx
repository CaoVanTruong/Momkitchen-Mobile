import { Tab, TabView, Text } from '@rneui/themed';
import { ScreenContainer, ShipperOrderList } from 'components';
import Colors from 'constants/colors';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { changeOrderStatus, getShipperOrders } from 'redux/actions/order';
import { getReadyOrders } from 'redux/actions/shipperHome';
import { IShipperOrder } from 'types/shipperHome';

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

  const [tabIndex, setTabIndex] = useState(0);

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

    const dataByBatch: { [x: string]: IShipperOrder[] } = {
      collection: [],
      delivery: [],
    };

    const filteredOrders = sortedOrders.filter(
      x => !EXCEPTED_STATUS.includes(x.deliveryStatus),
    );

    !!filteredOrders.length &&
      filteredOrders.forEach(item => {
        const batchValue = item?.batch.status || false;

        if (batchValue) {
          dataByBatch.delivery.push(item);
        } else {
          dataByBatch.collection.push(item);
        }
      });

    return dataByBatch;
  }, [orderList]);

  return (
    <ScreenContainer
      title="Order"
      hasBack={false}
      isLoading={isChangeStatusLoading || isLoading}
      bodyContainerStyle={styles.container}>
      <Tab
        value={tabIndex}
        onChange={e => setTabIndex(e)}
        variant="primary"
        indicatorStyle={styles.tabIndicator}
        style={styles.tab}>
        <Tab.Item
          title="Collection"
          titleStyle={active => [
            styles.tabItemTitle,
            active && styles.activeTabItemTitle,
          ]}
          buttonStyle={styles.tabItem}
          containerStyle={active => [
            styles.tabHeader,
            active && styles.activeTabHeader,
          ]}
        />
        <Tab.Item
          title="Delivery"
          titleStyle={active => [
            styles.tabItemTitle,
            active && styles.activeTabItemTitle,
          ]}
          buttonStyle={styles.tabItem}
          containerStyle={active => [
            styles.tabHeader,
            active && styles.activeTabHeader,
          ]}
        />
      </Tab>
      <TabView
        value={tabIndex}
        onChange={e => setTabIndex(e)}
        animationType="spring">
        <TabView.Item style={styles.tabViewItemContainer}>
          <ShipperOrderList
            orders={data.collection}
            changeStatus={onChangeStatus}
            onRefreshData={fetchOrderList}
            EmptyListComponent={
              <View>
                <Text>No Collection Order</Text>
              </View>
            }
          />
        </TabView.Item>
        <TabView.Item style={styles.tabViewItemContainer}>
          <ShipperOrderList
            orders={data.delivery}
            changeStatus={onChangeStatus}
            onRefreshData={fetchOrderList}
            EmptyListComponent={
              <View>
                <Text>No Deliver Order</Text>
              </View>
            }
          />
        </TabView.Item>
      </TabView>
    </ScreenContainer>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  tab: {},
  tabIndicator: {
    backgroundColor: Colors.darkPink,
  },
  tabHeader: {
    backgroundColor: Colors.darkPink,
  },
  activeTabHeader: {
    backgroundColor: Colors.white,
  },
  tabItem: {
    paddingHorizontal: 0,
  },
  tabItemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.white,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  activeTabItemTitle: {
    color: Colors.black,
  },
  tabViewItemContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});
