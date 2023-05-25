import { Image, Text } from '@rneui/themed';
import { ImagePlaceholder } from 'assets/svgs';
import { Colors, DEFAULT_DATE_FORMAT, Dimensions } from 'constants';
import shadowStyle from 'constants/shadowStyle';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface FoodPackageItemProps {
  name: string;
  description: string;
  image: string | null;
  price: number;
  quantity: number;
  remainQuantity: number;
  createDate: string;
  onPress: () => void;
}

const FoodPackageItem = ({
  name,
  description,
  image,
  price,
  quantity,
  remainQuantity,
  createDate,
  onPress,
}: FoodPackageItemProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.touchableItem}>
        <View style={styles.content}>
          <View style={styles.imageWrapper}>
            {image ? (
              <Image source={{ uri: image }} />
            ) : (
              <ImagePlaceholder width={48} height={48} fill={Colors.orange} />
            )}
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{name || 'No title'}</Text>
            {!!description && <Text style={styles.desc}>{description}</Text>}
            {/* <Text style={styles.desc}>{description}</Text> */}
            <View style={styles.priceWrapper}>
              <Text style={styles.desc}>{`Price: ${price} VND`}</Text>
              <Text style={styles.desc}>{`Quantity: ${quantity}`}</Text>
              <Text style={styles.desc}>{`Remain: ${remainQuantity}`}</Text>
            </View>
            <Text style={styles.desc}>{`Created: ${dayjs(createDate).format(
              DEFAULT_DATE_FORMAT,
            )}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FoodPackageItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: Dimensions.RADIUS_2,
    marginBottom: 12,
    ...shadowStyle.ELEVATOR_4,
  },
  touchableItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageWrapper: {
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  desc: {
    fontSize: 12,
    color: Colors.black,
  },
  priceWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
});
