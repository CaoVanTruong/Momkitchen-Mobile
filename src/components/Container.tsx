import React from 'react';
import Header from './Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Colors } from 'constants';
import LinearGradient from 'react-native-linear-gradient';
import { Overlay } from '@rneui/themed';

interface ScreenContainerProps {
  title?: string;
  headerShown?: boolean;
  hasGradientBg?: boolean;
  hasBack?: boolean;
  isLoading?: boolean;
  gradientColors?: string[];
  rightIcon?: React.ReactNode;
  titleAlignment?: 'left' | 'right' | 'center';
  titleStyle?: StyleProp<TextStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  bodyContainerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  onBack?: () => void;
  onRightIconPress?: () => void;
}

const ScreenContainer = (props: ScreenContainerProps) => {
  const {
    isLoading = false,
    hasGradientBg = false,
    gradientColors = Colors.gradient_1,
    headerStyle,
    containerStyle,
    bodyContainerStyle,
    children,
    ...headerProps
  } = props;

  const renderView = () => (
    <SafeAreaView style={[styles.container, containerStyle]}>
      <Header containerStyle={headerStyle} {...headerProps} />
      <View style={bodyContainerStyle}>{children}</View>
      <Overlay
        isVisible={isLoading}
        statusBarTranslucent
        style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} />
      </Overlay>
    </SafeAreaView>
  );

  if (hasGradientBg) {
    return (
      <LinearGradient colors={gradientColors} style={styles.gradientbg}>
        {renderView()}
      </LinearGradient>
    );
  }

  return renderView();
};

export default ScreenContainer;

const styles = StyleSheet.create({
  gradientbg: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    backgroundColor: 'transparent',
  },
});
