import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const SvgComponent = (props: SvgProps) => (
  <Svg viewBox="0 0 32 32" {...props}>
    <Path d="M17.987 3h-5v3h5V3zm0 12v-2h-5v2h5zm-5 15h5v-8h-5v8zm12-18L22.8 9.5 24.987 7h-16l-2.6 2.5 2.6 2.5h16zm-2 4h-16l2.188 2.5L6.987 21h16l2.625-2.5-2.625-2.5z" />
  </Svg>
);
export default SvgComponent;
