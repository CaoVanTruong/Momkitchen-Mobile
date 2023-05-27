import { Tab, TabView } from '@rneui/themed';
import { ScreenContainer } from 'components';
import Colors from 'constants/colors';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import OrderList from './OrderList';
import { IOrder } from 'types/order';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getOrders } from 'redux/actions/order';

const Order = () => {
  const dispatch = useDispatch<any>();
  const { items: orderList, isLoading } = useSelector(
    (state: RootState) => state.order,
  );

  const fetchOrderList = () => {
    dispatch(getOrders());
  };

  useEffect(() => {
    fetchOrderList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [tabIndex, setTabIndex] = useState(0);

  const data = useMemo(() => {
    const dataByStatus: { [x: string]: IOrder[] } = {};

    orderList.forEach(item => {
      const value = item.deliveryStatus;

      if (!dataByStatus[value]) {
        dataByStatus[value] = [];
      }

      dataByStatus[value].push(item);
    });

    return dataByStatus;
  }, [orderList]);

  return (
    <ScreenContainer
      hasBack={false}
      title="Order"
      isLoading={isLoading}
      bodyContainerStyle={styles.container}>
      <Tab
        value={tabIndex}
        onChange={e => setTabIndex(e)}
        variant="primary"
        indicatorStyle={styles.tabIndicator}
        style={styles.tab}>
        <Tab.Item
          title="New Order"
          titleStyle={active => [
            styles.tabItem,
            active && styles.activeTabItemTitle,
          ]}
          buttonStyle={styles.tabItem}
          containerStyle={active => [
            styles.tabHeader,
            active && styles.activeTabHeader,
          ]}
        />
        <Tab.Item
          title="Processing"
          titleStyle={active => [
            styles.tabItem,
            active && styles.activeTabItemTitle,
          ]}
          buttonStyle={styles.tabItem}
          containerStyle={active => [
            styles.tabHeader,
            active && styles.activeTabHeader,
          ]}
        />
        <Tab.Item
          title="Completed"
          titleStyle={active => [
            styles.tabItem,
            active && styles.activeTabItemTitle,
          ]}
          buttonStyle={styles.tabItem}
          containerStyle={active => [
            styles.tabHeader,
            active && styles.activeTabHeader,
          ]}
        />
        <Tab.Item
          title="Cancelled"
          titleStyle={active => [
            styles.tabItem,
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
          <OrderList orders={data.New} onRefreshData={fetchOrderList} />
        </TabView.Item>
        <TabView.Item style={styles.tabViewItemContainer}>
          <OrderList orders={data.Processing} onRefreshData={fetchOrderList} />
        </TabView.Item>
        <TabView.Item style={styles.tabViewItemContainer}>
          <OrderList orders={data.Completed} onRefreshData={fetchOrderList} />
        </TabView.Item>
        <TabView.Item style={styles.tabViewItemContainer}>
          <OrderList orders={data.Cancelled} onRefreshData={fetchOrderList} />
        </TabView.Item>
      </TabView>
    </ScreenContainer>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  tab: {
    marginTop: 12,
  },
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
    color: Colors.orange,
    backgroundColor: 'transparent',
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
