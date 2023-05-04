import { ScreenContainer } from 'components';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import MarketItem from './components/MarketItem';
import { PlusRounded } from 'assets/svgs';
import { Colors } from 'constants';
import { IMarketItem } from 'types/market';

const data: IMarketItem[] = [
  {
    id: '1',
    title: 'Lunch',
    createdDate: '2023-05-04T00:00:00Z',
    timeline: '10h30 - 14h',
  },
  {
    id: '2',
    title: 'Dinner',
    createdDate: '2023-05-04T00:00:00Z',
    timeline: '16h30 - 20h',
  },
];

const MarketScreen = () => {
  const renderItem = ({ item }: any) => <MarketItem {...item} />;
  return (
    <ScreenContainer
      title="Market Sessions"
      bodyContainerStyle={styles.container}
      hasBack={false}>
      <View style={styles.marketListContainer}>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
        <View style={styles.addBtn}>
          <TouchableOpacity style={styles.btn}>
            <PlusRounded width={48} height={48} fill={Colors.orange} />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
  },
  marketListContainer: {
    flex: 1,
  },
  addBtn: {
    position: 'absolute',
    zIndex: 1,
    right: -8,
    bottom: -8,
  },
  btn: {
    padding: 8,
  },
});
