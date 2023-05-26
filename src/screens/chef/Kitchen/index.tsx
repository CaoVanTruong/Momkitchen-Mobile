import { ScreenContainer } from 'components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import KitchenMenu from './components/KitchenMenu';
import { useNavigation } from '@react-navigation/native';
import { Category, Dish, Meal, Noodle } from 'assets/svgs';
import Colors from 'constants/colors';

const MENUS = [
  {
    id: 'dishType',
    label: 'Dish Type',
    icon: <Category width={40} height={40} fill={Colors.orange} />,
    navigateTo: 'dishType',
  },
  {
    id: 'dishes',
    label: 'Dishes',
    icon: <Dish width={40} height={40} fill={Colors.orange} />,
    navigateTo: 'dishes',
  },
  {
    id: 'foodPackage',
    label: 'Food Package',
    icon: <Meal width={40} height={40} fill={Colors.orange} />,
    navigateTo: 'foodPackage',
  },
  {
    id: 'foodStyle',
    label: 'Food Style',
    icon: <Noodle width={40} height={40} fill={Colors.orange} />,
    navigateTo: 'foodStyle',
  },
];

const KitchenScreen = () => {
  const navigation = useNavigation();

  const onNavigate = (screenName: string) => {
    if (!screenName) {
      return;
    }

    navigation.navigate(screenName as never);
  };

  return (
    <ScreenContainer
      hasBack={false}
      title="Kitchen"
      titleAlignment="left"
      bodyContainerStyle={styles.container}>
      <View style={styles.menuContainer}>
        {MENUS.map(menu => (
          <KitchenMenu
            key={menu.id}
            onPress={() => onNavigate(menu.navigateTo)}
            {...menu}
          />
        ))}
      </View>
    </ScreenContainer>
  );
};

export default KitchenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
});
