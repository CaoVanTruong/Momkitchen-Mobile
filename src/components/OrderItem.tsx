import { Text } from '@rneui/themed';
import { Clock, Coin, Phone } from 'assets/svgs';
import { Colors, DEFAULT_DATETIME_FORMAT, Dimensions } from 'constants';
import shadowStyle from 'constants/shadowStyle';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { IOrderItem } from 'types/order';

interface OrderItemProps extends IOrderItem {
  onConfirm: () => void;
}

const OrderItem = ({
  id,
  name,
  phone,
  price,
  time,
  status,
  onConfirm,
}: OrderItemProps) => {
  return (
    <View style={styles.container}>
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
        <Text style={styles.name}>{name}</Text>
        <View style={styles.infoWrapper}>
          <Phone width={24} height={24} style={styles.infoIcon} />
          <Text style={styles.phone}>{phone}</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Coin width={24} height={24} style={styles.infoIcon} />
          <Text style={styles.price}>{`${price} VND`}</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Clock width={24} height={24} style={styles.infoIcon} />
          <Text style={styles.time}>
            {dayjs(time).format(DEFAULT_DATETIME_FORMAT)}
          </Text>
        </View>
      </View>
      <View style={styles.statusWrapper}>
        <TouchableOpacity onPress={onConfirm} style={styles.confirmBtn}>
          <Text style={styles.confirmTitle}>Confirm</Text>
        </TouchableOpacity>
        <Text style={styles.status}>{status}</Text>
      </View>
    </View>
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
    borderRadius: Dimensions.RADIUS_3,
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
    borderRadius: Dimensions.RADIUS_2,
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
