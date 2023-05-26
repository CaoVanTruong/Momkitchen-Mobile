import { Image, Text } from '@rneui/themed';
import { ImagePlaceholder } from 'assets/svgs';
import Colors from 'constants/colors';
import Dimension from 'constants/dimension';

import shadowStyle from 'constants/shadowStyle';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IFoodPackage } from 'types/foodPackage';

interface FoodPackageItemProps extends IFoodPackage {
  onPress: () => void;
}

const FoodPackageItem = ({
  name,
  description,
  image,
  defaultPrice,
  foodPackageStyle,
  onPress,
}: FoodPackageItemProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.touchableItem}>
        <View style={styles.content}>
          <View style={styles.imageWrapper}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <ImagePlaceholder width={48} height={48} fill={Colors.orange} />
            )}
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.information}>
              <View style={styles.info_description}>
                <Text style={styles.desc}>{description}</Text>
                {!!foodPackageStyle?.title && (
                  <Text style={styles.foodStyle}>{foodPackageStyle.title}</Text>
                )}
              </View>
              <Text style={styles.price}>{`${defaultPrice} VND`}</Text>
            </View>
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
    borderRadius: Dimension.RADIUS_2,
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
  image: {
    width: 48,
    height: 48,
    resizeMode: 'cover',
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
  price: {
    // alignSelf: 'flex-end',
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.orange,
  },
  foodStyle: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Dimension.RADIUS_2,
    backgroundColor: Colors.lightPink,
    marginTop: 4,
  },
  information: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info_description: {
    flex: 1,
    alignItems: 'flex-start',
  },
  infoWrapper: {
    flex: 1,
    alignItems: 'flex-start',
  },
});
