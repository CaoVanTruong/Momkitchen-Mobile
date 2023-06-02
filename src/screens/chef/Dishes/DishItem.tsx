import { Image, Text } from '@rneui/themed';
import { ImagePlaceholder, Times } from 'assets/svgs';
import Colors from 'constants/colors';
import Dimension from 'constants/dimension';
import shadowStyle from 'constants/shadowStyle';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IDish } from 'types/dish';

interface DishItemProps extends IDish {
  onPress: () => void;
  onRemove: () => void;
}

const DishItem = ({
  name,
  dishType,
  image,
  onPress,
  onRemove,
}: DishItemProps) => {
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
          <View style={styles.info}>
            <Text style={styles.name}>{name}</Text>
            {!!dishType?.name && (
              <Text style={styles.desc}>{dishType?.name}</Text>
            )}
          </View>
          <View style={styles.action}>
            <TouchableOpacity onPress={onRemove} style={styles.actionBtn}>
              <Times width={28} height={28} fill={Colors.red} />
            </TouchableOpacity>
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
  info: {
    flex: 1,
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
    borderRadius: Dimension.RADIUS_2,
  },
  image: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  action: {
    position: 'absolute',
    right: 0,
    top: 4,
  },
  actionBtn: {
    padding: 8,
  },
});
