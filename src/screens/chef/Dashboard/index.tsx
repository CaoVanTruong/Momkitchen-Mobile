import { Text } from '@rneui/themed';
import { Bell, Cash, List } from 'assets/svgs';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { OrderItem, ScreenContainer } from 'components';
import { IOrder } from 'types/order';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import {
  getNumOfOrders,
  getRecentOrders,
  getRevenue,
} from 'redux/actions/chefHome';
import Colors from 'constants/colors';
import Dimension from 'constants/dimension';

const DashboardScreen = () => {
  const { isLoading, revenue, orders, numberOfOrders } = useSelector(
    (state: RootState) => state.chefHome,
  );

  const dispatch = useDispatch<any>();

  const fetchRevenue = () => {
    dispatch(getRevenue());
  };

  const fetchNumOfOrders = () => {
    dispatch(getNumOfOrders());
  };

  const fetchRecentOrders = () => {
    dispatch(getRecentOrders());
  };

  useEffect(() => {
    fetchRecentOrders();
    fetchRevenue();
    fetchNumOfOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onNotificationPress = () => {};

  const onConfirm = (id: number) => {
    if (!id) {
      return;
    }
    console.log('confirm order', id);
  };

  const renderOrderItems = ({ item }: { item: IOrder }) => (
    <OrderItem onConfirm={() => onConfirm(item.id)} disabled {...item} />
  );

  return (
    <ScreenContainer
      hasGradientBg
      isLoading={isLoading}
      title="Home"
      hasBack={false}
      bodyContainerStyle={styles.container}
      titleAlignment="left"
      rightIcon={<Bell width={30} height={30} fill={Colors.white} />}
      onRightIconPress={onNotificationPress}
      gradientColors={Colors.gradient_2}>
      <View style={[styles.section, styles.ph_24]}>
        <View style={styles.headerWrapper}>
          <Text style={styles.headingTitle}>Total</Text>
        </View>
        <View style={styles.statisticContainer}>
          <View
            style={[
              styles.statisticItem,
              { backgroundColor: Colors.gradient_2[0] },
            ]}>
            <View>
              <List width={48} height={48} />
            </View>
            <View style={styles.statisticContent}>
              <Text style={styles.statisticLabel}>Orders</Text>
              <Text style={styles.statisticValue}>{numberOfOrders}</Text>
            </View>
          </View>
          <View
            style={[
              styles.statisticItem,
              { backgroundColor: Colors.gradient_2[1] },
            ]}>
            <View>
              <Cash width={48} height={48} />
            </View>
            <View style={styles.statisticContent}>
              <Text style={styles.statisticLabel}>Revenue</Text>
              <Text style={styles.statisticValue}>{`${revenue} VND`}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.section, styles.dynamicContainer]}>
        <View style={[styles.headerWrapper, styles.ph_24]}>
          <Text style={styles.headingTitle}>Recent Orders</Text>
        </View>
        <View style={styles.dynamicContainer}>
          {orders.length ? (
            <FlatList
              data={orders}
              keyExtractor={item => item.id.toString()}
              renderItem={renderOrderItems}
              style={[styles.listWrapper, styles.ph_24]}
            />
          ) : (
            <View style={styles.noOrder}>
              <Text>No recent orders</Text>
            </View>
          )}
        </View>
      </View>
    </ScreenContainer>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
  },
  dynamicContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
    marginTop: 8,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ph_24: {
    paddingHorizontal: 24,
  },
  headingTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  statisticContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statisticItem: {
    backgroundColor: Colors.white,
    width: Dimension.SCREEN_WIDTH / 2 - 36,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Dimension.RADIUS_2,
  },
  statisticContent: {
    marginTop: 8,
  },
  statisticLabel: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statisticValue: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    // color: Colors.orange,
  },
  link: {},
  listWrapper: {
    paddingVertical: 4,
    backgroundColor: Colors.white,
    borderRadius: Dimension.RADIUS_2,
  },
  noOrder: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingVertical: 4,
  },
});
