import { Text } from '@rneui/themed';
import { List } from 'assets/svgs';
import { ScreenContainer, ShipperOrderItem } from 'components';
import Colors from 'constants/colors';
import Dimension from 'constants/dimension';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeOrderStatus, getShipperOrders } from 'redux/actions/order';
import { getNumOfOrders, getReadyOrders } from 'redux/actions/shipperHome';
import { RootState } from 'store';
import { IShipperOrder } from 'types/shipperHome';
import { getChangeStatusButtonLabel } from 'utils/orderStatus';

const DashboardScreen = () => {
  const { isLoading, isCountLoading, numOfOrders, orders } = useSelector(
    (state: RootState) => state.shipperHome,
  );

  const isOrderLoading = useSelector(
    (state: RootState) => state.order.isLoading,
  );

  const dispatch = useDispatch<any>();

  const fetchNumOfOrders = () => {
    dispatch(getNumOfOrders());
  };

  const fetchReadyOrders = () => {
    dispatch(getReadyOrders());
  };

  const fetchShipperOrders = () => {
    dispatch(getShipperOrders());
  };

  const changeStatus = (id: number) => {
    dispatch(changeOrderStatus(id))
      .unwrap()
      .then(() => {
        fetchReadyOrders();
        fetchShipperOrders();
        fetchNumOfOrders();
      })
      .catch((err: any) => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  };

  useEffect(() => {
    fetchReadyOrders();
    fetchNumOfOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onConfirm = (id: number) => {
    if (!id) {
      return;
    }

    changeStatus(id);
  };

  const renderOrderItems = ({ item }: { item: IShipperOrder }) => {
    const batchValue = item.batch?.status || false;
    const btnLabel = batchValue
      ? getChangeStatusButtonLabel(item.deliveryStatus, 'shipper')
      : undefined;
    return (
      <ShipperOrderItem
        confirmBtnLabel={btnLabel}
        onConfirm={() => onConfirm(item.id)}
        disabled
        {...item}
      />
    );
  };
  return (
    <ScreenContainer
      title="Home"
      isLoading={isOrderLoading}
      titleAlignment="left"
      hasBack={false}
      bodyContainerStyle={styles.container}>
      <View style={[styles.section, styles.ph_24]}>
        <View style={styles.statisticContainer}>
          <View>
            <List width={48} height={48} />
          </View>
          <View style={styles.statisticContent}>
            <Text style={styles.statisticLabel}>Orders Completed</Text>
            {isCountLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.statisticValue}>{numOfOrders}</Text>
            )}
          </View>
        </View>
      </View>
      <View style={[styles.section, styles.dynamicContainer]}>
        <View style={[styles.headerWrapper, styles.ph_24]}>
          <Text style={styles.headingTitle}>Ready Orders</Text>
          <Text style={styles.ordersCount}>{orders.length}</Text>
        </View>
        <View style={styles.dynamicContainer}>
          <FlatList
            data={orders}
            keyExtractor={item => item.id.toString()}
            renderItem={renderOrderItems}
            style={[styles.listWrapper, styles.ph_24]}
            refreshing={isLoading}
            onRefresh={() => {
              fetchReadyOrders();
              fetchNumOfOrders();
            }}
            ListEmptyComponent={
              <View style={styles.noOrder}>
                <Text>No order ready to ship</Text>
              </View>
            }
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
    borderTopColor: Colors.gray,
    borderTopWidth: 1,
    paddingTop: 16,
  },
  ph_24: {
    paddingHorizontal: 24,
  },
  headingTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  statisticContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    marginLeft: 16,
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
  ordersCount: {
    marginLeft: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.darkGreen,
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    borderRadius: Dimension.RADIUS_4,
  },
});
