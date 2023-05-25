import { ScreenContainer } from 'components';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MarketItem from './components/MarketItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getSessions } from 'redux/actions/session';
import { useNavigation } from '@react-navigation/native';
import { ISession } from 'types/session';

const MarketScreen = () => {
  const { items: sessions, isLoading } = useSelector(
    (state: RootState) => state.session,
  );
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (!isLoading && !sessions.length) {
      getSessionsList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSessionsList = () => {
    dispatch(getSessions());
  };

  const onItemPress = (sessionId: number) => {
    navigation.navigate('marketDetail', { sessionId });
  };

  const renderItem = ({ item }: { item: ISession }) => (
    <MarketItem {...item} onPress={() => onItemPress(item.id)} />
  );

  return (
    <ScreenContainer
      title="Market Sessions"
      bodyContainerStyle={styles.container}
      hasBack={false}>
      <View style={styles.marketListContainer}>
        <FlatList
          data={sessions}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          refreshing={isLoading}
          onRefresh={getSessionsList}
        />
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
});
