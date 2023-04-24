import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg viewBox="0 0 1024 1024" {...props}>
    <Path d="M768 903.232 717.568 960 256 512 717.568 64 768 120.768 364.928 512z" />
  </Svg>
);
export default SvgComponent;
