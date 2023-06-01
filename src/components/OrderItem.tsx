import { Text } from '@rneui/themed';
import { Clock, Coin, Phone } from 'assets/svgs';
import Colors from 'constants/colors';
import Dimension from 'constants/dimension';
import { DEFAULT_DATETIME_FORMAT } from 'constants/format';
import shadowStyle from 'constants/shadowStyle';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ICustomer, IOrderDetail } from 'types/order';

interface OrderItemProps {
  disabled?: boolean;
  confirmBtnLabel?: string;
  onConfirm?: () => void;
  onPress?: () => void;
  id: number;
  date: string;
  customer: ICustomer;
  orderDetails: IOrderDetail[];
  deliveryStatus: string;
}

const OrderItem = ({
  id,
  date,
  customer,
  orderDetails,
  deliveryStatus,
  disabled,
  confirmBtnLabel,
  onConfirm,
  onPress,
}: OrderItemProps) => {
  const totalPrice =
    orderDetails?.reduce(
      (total, item) => total + item.sessionPackage.price * item.quantity,
      0,
    ) || 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      disabled={disabled}>
      <View style={styles.contentWrapper}>
        <View style={styles.infoWrapper}>
          <Icon
            name="hashtag"
            size={12}
            color={Colors.lightPink}
            style={styles.idIcon}
          />
          <Text style={styles.id}>{id}</Text>
        </View>
        <Text style={styles.name}>{`Order of ${customer?.name}`}</Text>
        <View style={styles.infoWrapper}>
          <Phone width={24} height={24} style={styles.infoIcon} />
          <Text style={styles.phone}>{customer?.phone}</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Coin width={24} height={24} style={styles.infoIcon} />
          <Text style={styles.price}>{`${totalPrice} VND`}</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Clock width={24} height={24} style={styles.infoIcon} />
          <Text style={styles.time}>
            {dayjs(date).format(DEFAULT_DATETIME_FORMAT)}
          </Text>
        </View>
      </View>
      <View style={styles.statusWrapper}>
        {confirmBtnLabel ? (
          <TouchableOpacity onPress={onConfirm} style={styles.confirmBtn}>
            <Text style={styles.confirmTitle}>{confirmBtnLabel}</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
        <Text style={styles.status}>{deliveryStatus}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: Dimension.RADIUS_3,
    marginBottom: 12,
    ...shadowStyle.ELEVATOR_4,
  },
  contentWrapper: {
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 8,
  },
  statusWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  confirmBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.lightGreen,
    borderRadius: Dimension.RADIUS_2,
  },
  confirmTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  status: {
    fontWeight: 'bold',
    color: Colors.red,
  },
  id: {
    color: Colors.lightPink,
    fontSize: 12,
  },
  idIcon: {
    width: 16,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  phone: {},
  time: {},
  price: {},
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 12,
  },
});
