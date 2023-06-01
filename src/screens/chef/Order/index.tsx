import { Tab, TabView } from '@rneui/themed';
import { OrderList, ScreenContainer } from 'components';
import Colors from 'constants/colors';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { IOrder } from 'types/order';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { changeOrderStatus, getOrders } from 'redux/actions/order';
import { getRecentOrders } from 'redux/actions/chefHome';

const Order = () => {
  const dispatch = useDispatch<any>();
  const { items: orderList, isLoading } = useSelector(
    (state: RootState) => state.order,
  );

  const fetchOrderList = () => {
    dispatch(getOrders());
  };

  const fetchRecentOrderList = () => {
    dispatch(getRecentOrders());
  };

  useEffect(() => {
    fetchOrderList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeStatus = (id: number) => {
    dispatch(changeOrderStatus(id))
      .unwrap()
      .then(() => {
        fetchOrderList();
        fetchRecentOrderList();
      });
  };

  const [tabIndex, setTabIndex] = useState(0);

  const data = useMemo(() => {
    const dataByStatus: { [x: string]: IOrder[] } = {
      New: [],
      Confirmed: [],
      Preparing: [],
      Pending: [],
      Completed: [],
      Cancelled: [],
    };

    !!orderList.length &&
      orderList.forEach(item => {
        const value = item?.deliveryStatus;

        if (!Object.keys(dataByStatus).includes(value)) {
          return;
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
          title="Confirmed"
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
          title="Processing"
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
          title="Completed"
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
          <OrderList
            orders={data.New}
            changeStatus={onChangeStatus}
            onRefreshData={fetchOrderList}
          />
        </TabView.Item>
        <TabView.Item style={styles.tabViewItemContainer}>
          <OrderList
            orders={data.Confirmed}
            changeStatus={onChangeStatus}
            onRefreshData={fetchOrderList}
          />
        </TabView.Item>
        <TabView.Item style={styles.tabViewItemContainer}>
          <OrderList
            orders={data.Preparing}
            changeStatus={onChangeStatus}
            onRefreshData={fetchOrderList}
          />
        </TabView.Item>
        <TabView.Item style={styles.tabViewItemContainer}>
          <OrderList
            orders={[...data.Pending, ...data.Completed]}
            onRefreshData={fetchOrderList}
          />
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
    // marginTop: 12,
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
