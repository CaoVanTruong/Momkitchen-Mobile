import { useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import { LeftArrow } from 'assets/svgs';
import Colors from 'constants/colors';
import ShadowStyles from 'constants/shadowStyle';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';

interface HeaderProps {
  title?: string;
  headerShown?: boolean;
  hasBack?: boolean;
  titleAlignment?: 'left' | 'right' | 'center';
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  rightIcon?: React.ReactNode;
  onBack?: () => void;
  onRightIconPress?: () => void;
}

const Header = ({
  title = '',
  headerShown = true,
  hasBack = true,
  titleAlignment = 'center',
  rightIcon,
  onRightIconPress,
  onBack,
  titleStyle,
  containerStyle,
}: HeaderProps) => {
  const navigation = useNavigation();

  const onBackPress = () => {
    if (onBack) {
      onBack();
      return;
    }
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  if (!headerShown) {
    return null;
  }

  return (
    <View style={[styles.header, containerStyle]}>
      {hasBack && (
        <View style={styles.backIconWrapper}>
          <TouchableOpacity onPress={onBackPress} style={styles.backIcon}>
            <LeftArrow width={24} height={24} fill={Colors.white} />
          </TouchableOpacity>
        </View>
      )}
      <View>
        <Text
          h4
          style={[
            styles.headerTitle,
            titleStyle,
            { textAlign: titleAlignment },
          ]}>
          {title}
        </Text>
      </View>
      {!!rightIcon && (
        <View style={styles.rightIconWrapper}>
          <TouchableOpacity
            disabled={!onRightIconPress}
            onPress={onRightIconPress}
            style={styles.rightIcon}>
            {rightIcon}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  hide: {
    display: 'none',
  },
  header: {
    alignSelf: 'stretch',
    backgroundColor: Colors.lightGreen,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    ...ShadowStyles.ELEVATOR_4,
  },
  headerTitle: {
    color: Colors.white,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  backIconWrapper: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  rightIconWrapper: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
  },
  backIcon: {
    padding: 12,
  },
  rightIcon: {
    padding: 12,
  },
});
