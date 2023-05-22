import { Image, Text } from '@rneui/themed';
import { ImagePlaceholder } from 'assets/svgs';
import { Colors, Dimensions } from 'constants';
import shadowStyle from 'constants/shadowStyle';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface FoodPackageItemProps {
  name: string;
  description: string;
  image: string | null;
  onPress: () => void;
}

const FoodPackageItem = ({
  name,
  description,
  image,
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
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.desc}>{description}</Text>
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
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  desc: {
    fontSize: 12,
    color: Colors.black,
  },
});
