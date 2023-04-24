import { Image, Text } from '@rneui/themed';
import { Times } from 'assets/svgs';
import { Colors, Dimensions } from 'constants';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface MarketItemProps {
  image?: string;
  title: string;
  description?: string;
  quantity?: number;
  onPress?: () => void;
  onRemove?: () => void;
}

const MarketItem = ({
  image,
  title,
  description,
  quantity = 0,
  onPress,
  onRemove,
}: MarketItemProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.marketItemContainer}>
        <View style={styles.imgWrapper}>
          <Image
            source={{ uri: image }}
            style={styles.img}
            resizeMode="cover"
          />
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{description}</Text>
          <Text style={styles.quantity}>Quantity: {quantity}</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.actionBtn} onPress={onRemove}>
            <Times width={28} height={28} fill={Colors.orange} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MarketItem;

const styles = StyleSheet.create({
  marketItemContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: Colors.gray,
    padding: 12,
    borderRadius: Dimensions.RADIUS_2,
    marginBottom: 12,
  },
  imgWrapper: {
    alignSelf: 'center',
    width: 64,
    height: 64,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginHorizontal: 12,
  },
  img: {
    width: 64,
    height: 64,
    borderRadius: Dimensions.RADIUS_2,
  },
  title: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: Colors.orange,
    marginBottom: 4,
    fontWeight: '500',
  },
  desc: {},
  quantity: {},
  actionBtn: {
    padding: 4,
    marginRight: -4,
    marginTop: -10,
  },
});
