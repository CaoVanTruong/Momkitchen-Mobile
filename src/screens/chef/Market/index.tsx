import { ScreenContainer } from 'components';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MarketItem from './components/MarketItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getSessions } from 'redux/actions/session';

const MarketScreen = () => {
  const { items: sessions, isLoading } = useSelector(
    (state: RootState) => state.session,
  );
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (!isLoading && !sessions) {
      getSessionsList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSessionsList = () => {
    dispatch(getSessions());
  };

  const renderItem = ({ item }: any) => <MarketItem {...item} />;
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
