import { useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import { LeftArrow } from 'assets/svgs';
import { Colors, ShadowStyles } from 'constants';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface HeaderProps {
  title?: string;
  headerShown?: boolean;
  onBack?: () => void;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const Header = ({
  title = '',
  headerShown = true,
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
      <View style={styles.backIconWrapper}>
        <TouchableOpacity onPress={onBackPress} style={styles.backIcon}>
          <LeftArrow width={24} height={24} fill={Colors.red} />
        </TouchableOpacity>
      </View>
      <View>
        <Text h4 style={[styles.headerTitle, titleStyle]}>
          {title}
        </Text>
      </View>
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
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    ...ShadowStyles.ELEVATOR_4,
  },
  headerTitle: {
    color: Colors.red,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  backIconWrapper: {
    position: 'absolute',
    left: 12,
  },
  backIcon: {
    padding: 12,
  },
});
