import { useRoute } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import { ScreenContainer } from 'components';
import Colors from 'constants/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import dayjs from 'dayjs';
import { DEFAULT_DATE_FORMAT } from 'constants/format';
import { ScrollView } from 'react-native-gesture-handler';
import Dimension from 'constants/dimension';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { changeOrderStatus, getOrders } from 'redux/actions/order';
import { getChangeStatusButtonLabel } from 'utils/orderStatus';
// import { View } from 'react-native';

const OrderDetailScreen = () => {
  const router = useRoute();
  const dispatch = useDispatch<any>();

  const { items: orderList, isLoading } = useSelector(
    (state: RootState) => state.order,
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
  );

  const fetchOrderList = () => {
    dispatch(getOrders());
  };

  const onSubmit = () => {
    dispatch(changeOrderStatus(orderId)).unwrap().then(fetchOrderList);
  };

  if (!orderInfo) {
    return null;
  }

  return (
    <ScreenContainer
      title="Order detail"
      isLoading={isLoading}
      bodyContainerStyle={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Order Id </Text>
          <Text style={styles.infoValue}>{orderInfo?.id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Order Date</Text>
          <Text style={styles.infoValue}>
            {dayjs(orderInfo?.date).format(DEFAULT_DATE_FORMAT)}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.infoValue}>{orderInfo?.status}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Customer Name</Text>
          <Text style={styles.infoValue}>{orderInfo?.customer.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Customer Phone</Text>
          <Text style={styles.infoValue}>{orderInfo?.customer.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Building</Text>
          <Text
            style={
              styles.infoValue
            }>{`${orderInfo?.building.name}, ${orderInfo.building.address}`}</Text>
        </View>
        <View style={styles.verticalInfoRow}>
          <Text style={styles.label}>Food Packages</Text>
          <View style={styles.pksWrapper}>
            {!!orderInfo.orderDetails &&
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
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.infoValue}>{`${totalPrice} VND`}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Delivery Status</Text>
          <Text style={styles.infoValue}>{orderInfo?.deliveryStatus}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Note</Text>
          <Text style={styles.infoValue}>{orderInfo.note}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Batch</Text>
          <Text style={styles.infoValue}>{orderInfo?.batchId}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Session</Text>
          <Text style={styles.infoValue}>{orderInfo?.session.title}</Text>
        </View>
      </ScrollView>
      {!!submitTitle && (
        <Button
          title={submitTitle}
          buttonStyle={styles.submitBtn}
          titleStyle={styles.buttonTitle}
          onPress={onSubmit}
        />
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
});
