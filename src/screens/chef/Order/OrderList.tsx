import { useNavigation } from '@react-navigation/native';
import { OrderItem } from 'components';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { IOrder } from 'types/order';

interface OrderListProps {
  orders: IOrder[];
  onRefreshData?: () => void;
}

const OrderList = ({ orders, onRefreshData }: OrderListProps) => {
  const navigation = useNavigation<any>();

  const onItemPress = (id: number) => {
    navigation.navigate('orderDetail', { orderId: id });
  };

  const renderItem = ({ item }: { item: IOrder }) => {
    return <OrderItem onPress={() => onItemPress(item.id)} {...item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        refreshing={false}
        onRefresh={onRefreshData}
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
