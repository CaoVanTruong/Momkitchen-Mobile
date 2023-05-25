import { Image, Text } from '@rneui/themed';
import { ImagePlaceholder } from 'assets/svgs';
import { Colors, Dimensions } from 'constants';
import shadowStyle from 'constants/shadowStyle';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IDish } from 'types/dish';

interface DishItemProps extends IDish {
  onPress: () => void;
}

const DishItem = ({ name, dishType, image, onPress }: DishItemProps) => {
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
            <Text style={styles.name}>{name}</Text>
            {!!dishType?.name && (
              <Text style={styles.desc}>{dishType?.name}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DishItem;

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
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  desc: {
    fontSize: 12,
    color: Colors.black,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: Colors.lightGreen,
    borderRadius: Dimensions.RADIUS_2,
  },
});
