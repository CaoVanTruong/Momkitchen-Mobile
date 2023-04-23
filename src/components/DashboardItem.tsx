import { Text } from '@rneui/themed';
import { Colors, Dimensions } from 'constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface DashboardItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
}

const DashboardItem = ({
  icon,
  title,
  subtitle,
  onPress,
}: DashboardItemProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {icon}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DashboardItem;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.responsiveWidth(132),
    height: Dimensions.responsiveWidth(132),
    borderRadius: Dimensions.RADIUS_4,
    padding: 12,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    marginBottom: Dimensions.responsiveHeight(32),
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.purple,
    textAlign: 'center',
  },
  subtitle: {
    textTransform: 'uppercase',
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.purple,
    textAlign: 'center',
  },
});
