import React from 'react';
import Header from './Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Colors } from 'constants';

interface ScreenContainerProps {
  safeView?: boolean;
  title?: string;
  headerShown?: boolean;
  onBack?: () => void;
  titleStyle?: StyleProp<TextStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  bodyContainerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const ScreenContainer = (props: ScreenContainerProps) => {
  const {
    safeView = true,
    headerStyle,
    containerStyle,
    bodyContainerStyle,
    children,
    ...headerProps
  } = props;
  const ContainerView = safeView ? SafeAreaView : View;
  return (
    <ContainerView style={[styles.container, containerStyle]}>
      <Header containerStyle={headerStyle} {...headerProps} />
      <View style={bodyContainerStyle}>{children}</View>
    </ContainerView>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
