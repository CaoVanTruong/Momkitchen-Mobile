import { useRoute } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import { ScreenContainer } from 'components';
import Colors from 'constants/colors';
import React from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Dimension from 'constants/dimension';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { cancelOrder, changeOrderStatus } from 'redux/actions/order';
import { getChangeStatusButtonLabel } from 'utils/orderStatus';
import { getReadyOrders } from 'redux/actions/shipperHome';
import { Direction, Location } from 'assets/svgs';

const OrderDetailScreen = () => {
  const router = useRoute();
  const dispatch = useDispatch<any>();

  const isChangeOrderLoading = useSelector(
    (state: RootState) => state.order.isLoading,
  );

  const { orders: orderList, isLoading } = useSelector(
    (state: RootState) => state.shipperOrder,
  );

  const { orderId } = router.params as { orderId: number };

  const orderInfo = orderList.find(p => p.id === orderId);

  const totalPrice = orderInfo?.orderDetails.length
    ? orderInfo?.orderDetails.reduce(
        (sum, item) => sum + item.sessionPackage.price * item.quantity,
        0,
      )
    : 0;

  const submitTitle = getChangeStatusButtonLabel(
    orderInfo?.deliveryStatus || '',
    'shipper',
  );

  const fetchReadyOrders = () => {
    dispatch(getReadyOrders());
  };

  const onSubmit = () => {
    dispatch(changeOrderStatus(orderId))
      .unwrap()
      .then(fetchReadyOrders)
      .catch((err: any) => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  };

  const onCancel = () => {
    dispatch(cancelOrder(orderId))
      .unwrap()
      .catch((err: any) => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  };

  return (
    <ScreenContainer
      title="Order detail"
      isLoading={isLoading || isChangeOrderLoading}
      bodyContainerStyle={styles.container}>
      {orderId && orderInfo ? (
        <>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Order Id </Text>
              <Text style={styles.infoValue}>{orderInfo?.id}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Batch</Text>
              <Text style={styles.infoValue}>{orderInfo?.batch.id}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Chef Phone</Text>
              <Text style={styles.infoValue}>{orderInfo?.chef.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Customer Name</Text>
              <Text style={styles.infoValue}>{orderInfo?.customer.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Customer Phone</Text>
              <Text style={styles.infoValue}>{orderInfo?.customer.phone}</Text>
            </View>
            <View style={styles.verticalInfoRow}>
              <Text style={styles.label}>Food Packages</Text>
              <View style={styles.pksWrapper}>
                {!!orderInfo?.orderDetails &&
                  orderInfo.orderDetails.map(o => (
                    <View
                      key={`food-package-${o.sessionPackage.id}`}
                      style={styles.pkgItem}>
                      <Text style={styles.name}>
                        {o.sessionPackage.foodPackage.name}
                      </Text>
                      <Text style={styles.quantity}>{o.quantity}</Text>
                      <Text
                        style={
                          styles.price
                        }>{`${o.sessionPackage.price} VND`}</Text>
                    </View>
                  ))}
              </View>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Total Price</Text>
              <Text style={styles.infoValue}>{`${totalPrice} VND`}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Note</Text>
              <Text style={styles.infoValue}>{orderInfo?.note}</Text>
            </View>
            <View style={styles.verticalInfoRow}>
              <Text style={styles.label}>Delivery Address</Text>
              <View style={styles.pksWrapper}>
                <View style={styles.directionItem}>
                  <View style={styles.directionTitle}>
                    <Direction width={28} height={28} fill={Colors.black} />
                    <Text style={styles.directionTitleLabel}>From</Text>
                  </View>
                  <Text style={styles.directionValue}>
                    {orderInfo.chef.address}
                  </Text>
                </View>
                <View style={styles.directionItem}>
                  <View style={styles.directionTitle}>
                    <Location width={28} height={28} fill={Colors.black} />
                    <Text style={styles.directionTitleLabel}>To</Text>
                  </View>
                  <Text style={styles.directionValue}>
                    {`${orderInfo.building.name}, ${orderInfo.building.address}`}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Status</Text>
              <Text style={[styles.infoValue, styles.status]}>
                {orderInfo?.deliveryStatus.toUpperCase()}
              </Text>
            </View>
          </ScrollView>
          {!!submitTitle && (
            <View>
              <Button
                title={submitTitle}
                buttonStyle={styles.submitBtn}
                titleStyle={styles.buttonTitle}
                onPress={onSubmit}
              />
              {orderInfo.deliveryStatus === 'Delivering' && (
                <Button
                  title={'Cancel'}
                  buttonStyle={styles.cancelBtn}
                  titleStyle={styles.cancelButtonTitle}
                  onPress={onCancel}
                />
              )}
            </View>
          )}
        </>
      ) : (
        <View style={styles.scrollContainer}>
          <Text>Order not found!</Text>
        </View>
      )}
    </ScreenContainer>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 16,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
  },
  verticalInfoRow: {
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
  },
  label: {
    color: Colors.black_80,
  },
  infoValue: {
    fontWeight: 'bold',
  },
  pksWrapper: {
    backgroundColor: Colors.gray_25,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pkgItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
  },
  name: {
    flex: 1,
    fontWeight: 'bold',
  },
  quantity: {
    paddingHorizontal: 16,
  },
  price: {
    width: 108,
    textAlign: 'right',
  },
  submitBtn: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: Dimension.RADIUS_2,
    backgroundColor: Colors.darkGreen,
    marginHorizontal: 24,
  },
  buttonTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cancelBtn: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: Dimension.RADIUS_2,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray,
    marginHorizontal: 24,
  },
  cancelButtonTitle: {
    color: Colors.black,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  directionItem: {
    marginVertical: 8,
  },
  directionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  directionTitleLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  directionValue: {
    marginVertical: 8,
    marginLeft: 16,
  },
  status: {
    color: Colors.red,
  },
});
