import { Button, Image, Text } from '@rneui/themed';
import Colors from 'constants/colors';
import Dimension from 'constants/dimension';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import _pick from 'lodash/pick';
import { AddDishFormType } from 'schemas/dishSchemas';

interface UploadImageProps {
  control: Control<AddDishFormType>;
}

const UploadImage = ({ control }: UploadImageProps) => {
  const {
    field: { value, onChange },
  } = useController({ control, name: 'image' });

  const handleUploadImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 120,
        maxWidth: 120,
        selectionLimit: 1,
      },
      res => {
        if (res.didCancel) {
          return;
        }
        onChange(_pick(res.assets?.[0], ['fileName', 'uri']));
      },
    );
  };

  return (
    <View style={styles.imageUpload}>
      <Text style={styles.imageUploadTitle}>Image</Text>
      <Button
        buttonStyle={styles.uploadBtn}
        title={'Upload Image'}
        titleStyle={styles.uploadBtnLabel}
        onPress={handleUploadImage}
      />
      {!!value && !!value.uri && (
        <Image source={{ uri: value.uri }} style={styles.previewImage} />
      )}
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  imageUpload: {
    marginTop: 16,
    alignItems: 'center',
  },
  imageUploadTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.superDarkPink,
    marginLeft: 12,
    alignSelf: 'flex-start',
  },
  uploadBtn: {
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Dimension.RADIUS_2,
  },
  uploadBtnLabel: {
    fontSize: 14,
    color: Colors.black,
  },
  previewImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 16,
  },
});
