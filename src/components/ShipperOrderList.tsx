import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { IShipperOrder } from 'types/shipperHome';
import { getChangeStatusButtonLabel } from 'utils/orderStatus';
import ShipperOrderItem from './ShipperOrderItem';

interface ShipperOrderListProps {
  orders: IShipperOrder[];
  isLoading?: boolean;
  changeStatus?: (id: number) => void;
  onRefreshData?: () => void;
  EmptyListComponent?: React.ReactElement;
}

const ShipperOrderList = ({
  orders,
  changeStatus = () => {},
  onRefreshData,
  isLoading,
  EmptyListComponent,
}: ShipperOrderListProps) => {
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

  const renderItem = ({ item }: { item: IShipperOrder }) => {
    const btnLabel = getChangeStatusButtonLabel(item.deliveryStatus, 'shipper');
    return (
      <ShipperOrderItem
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
        refreshing={isLoading}
        onRefresh={onRefreshData}
        ListEmptyComponent={EmptyListComponent}
      />
    </View>
  );
};

export default ShipperOrderList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
