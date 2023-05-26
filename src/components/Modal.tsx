import { Overlay, Text } from '@rneui/themed';
import Colors from 'constants/colors';
import Dimension from 'constants/dimension';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';

interface ModalProps {
  isVisible?: boolean;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  cancelButtonLabel?: string;
  submitButtonLabel?: string;
  actionBtnShown?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
  onCancelPress?: () => void;
  onSubmitPress?: () => void;
}

const Modal = ({
  isVisible = true,
  title,
  titleStyle,
  children,
  cancelButtonLabel = 'Cancel',
  submitButtonLabel = 'Submit',
  actionBtnShown = true,
  onClose,
  onCancelPress,
  onSubmitPress,
}: ModalProps) => {
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
      <View style={styles.body}>{children}</View>
      {actionBtnShown && (
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            onPress={onCancelPress}
            style={[styles.btn, styles.cancelBtn]}>
            <Text style={styles.btnLabel}>{cancelButtonLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSubmitPress}
            style={[styles.btn, styles.submitBtn]}>
            <Text style={styles.btnLabel}>{submitButtonLabel}</Text>
          </TouchableOpacity>
        </View>
      )}
    </Overlay>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  title: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
    width: Dimension.SCREEN_WIDTH * 0.7,
  },
  body: {
    paddingHorizontal: 12,
  },
  actionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
    borderTopColor: Colors.gray,
    borderTopWidth: 1,
    paddingTop: 16,
  },
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: Dimension.RADIUS_2,
    width: Dimension.SCREEN_WIDTH * 0.3,
  },
  cancelBtn: {
    backgroundColor: Colors.white,
    borderColor: Colors.gray,
  },
  submitBtn: {
    backgroundColor: Colors.lightGreen,
    borderColor: 'transparent',
  },
  btnLabel: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
