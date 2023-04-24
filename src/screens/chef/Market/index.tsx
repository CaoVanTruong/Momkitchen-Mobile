import { ScreenContainer } from 'components';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import MarketItem from './components/MarketItem';
import { PlusRounded } from 'assets/svgs';
import { Colors } from 'constants';

const data = [
  {
    id: 1,
    image:
      'https://images.pexels.com/photos/12166666/pexels-photo-12166666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Mam com tuoi tho',
    description: 'Ca phao voi thit luoc cham mam tom',
    quantity: 5,
  },
  {
    id: 2,
    image:
      'https://images.pexels.com/photos/12166666/pexels-photo-12166666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Mam com tuoi tho 2',
    description: 'Ca phao voi thit chien cham mam ruoc',
    quantity: 12,
  },
  {
    id: 3,
    image:
      'https://images.pexels.com/photos/12166666/pexels-photo-12166666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Mam com gia dinh 1',
    description: 'Ca phao voi thit chien cham mam ruoc',
    quantity: 2,
  },
  {
    id: 4,
    image:
      'https://images.pexels.com/photos/12166666/pexels-photo-12166666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Mam com gia dinh 2',
    description: 'Ca phao voi thit chien cham mam ruoc',
    quantity: 4,
  },
];

const MarketScreen = () => {
  const renderItem = ({ item }: any) => <MarketItem {...item} />;
  return (
    <ScreenContainer title="Market" bodyContainerStyle={styles.container}>
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
