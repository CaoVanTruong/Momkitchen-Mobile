import { useNavigation } from '@react-navigation/native';
import { OrderItem } from 'components';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { IOrder } from 'types/order';
import { getChangeStatusButtonLabel } from 'utils/orderStatus';

interface OrderListProps {
  orders: IOrder[];
  changeStatus?: (id: number) => void;
  onRefreshData?: () => void;
  EmptyListComponent?: React.ReactElement;
}

const OrderList = ({
  orders,
  changeStatus = () => {},
  onRefreshData,
  EmptyListComponent,
}: OrderListProps) => {
  const navigation = useNavigation<any>();

  const onItemPress = (id: number) => {
    navigation.navigate('orderDetail', { orderId: id });
  };

  const onConfirm = (id: number) => {
    if (!id) {
      return;
    }

    changeStatus(id);
  };

  const renderItem = ({ item }: { item: IOrder }) => {
    const btnLabel = getChangeStatusButtonLabel(item.deliveryStatus);
    return (
      <OrderItem
        confirmBtnLabel={btnLabel}
        onPress={() => onItemPress(item.id)}
        onConfirm={() => onConfirm(item.id)}
        {...item}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        refreshing={false}
        onRefresh={onRefreshData}
        ListEmptyComponent={EmptyListComponent}
      />
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
