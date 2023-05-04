import { Text } from '@rneui/themed';
import { Bell, Cash, List } from 'assets/svgs';
import { Colors, Dimensions } from 'constants';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { OrderItem, ScreenContainer } from 'components';
import { IOrderItem } from 'types/order';

const MOCK_DATA: IOrderItem[] = [
  {
    id: '1',
    name: 'Recent Order Item 1',
    phone: '0123456789',
    price: 50000,
    time: '2023-05-04T10:55:24Z',
    status: 'Ordering',
  },
  {
    id: '2',
    name: 'Recent Order Item 2',
    phone: '0123456789',
    price: 50000,
    time: '2023-05-04T10:55:24Z',
    status: 'Ordering',
  },
  {
    id: '3',
    name: 'Recent Order Item 3',
    phone: '0123456789',
    price: 50000,
    time: '2023-05-04T10:55:24Z',
    status: 'Ordering',
  },
  {
    id: '4',
    name: 'Recent Order Item 4',
    phone: '0123456789',
    price: 50000,
    time: '2023-05-04T10:55:24Z',
    status: 'Ordering',
  },
];

const DashboardScreen = () => {
  const onNotificationPress = () => {
    console.log('notificationPress');
  };

  const onConfirm = (id: string) => {
    if (!id) {
      return;
    }
    console.log('confirm order', id);
  };

  const renderOrderItems = ({ item }: { item: IOrderItem }) => (
    <OrderItem onConfirm={() => onConfirm(item.id)} {...item} />
  );

  return (
    <ScreenContainer
      hasGradientBg
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
              <Text style={styles.statisticValue}>15</Text>
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
              <Text style={styles.statisticValue}>2.400.000 VND</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.section, styles.dynamicContainer]}>
        <View style={[styles.headerWrapper, styles.ph_24]}>
          <Text style={styles.headingTitle}>Recent Orders</Text>
        </View>
        <View style={styles.dynamicContainer}>
          <FlatList
            data={MOCK_DATA}
            keyExtractor={item => item.id.toString()}
            renderItem={renderOrderItems}
            style={[styles.listWrapper, styles.ph_24]}
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
    width: Dimensions.SCREEN_WIDTH / 2 - 36,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Dimensions.RADIUS_2,
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
    borderRadius: Dimensions.RADIUS_2,
  },
});
