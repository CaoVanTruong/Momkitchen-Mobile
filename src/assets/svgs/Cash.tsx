import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const SvgComponent = (props: SvgProps) => (
  <Svg viewBox="0 0 96 96" {...props}>
    <Path d="M90 12H6a5.997 5.997 0 0 0-6 6v60a5.997 5.997 0 0 0 6 6h84a5.997 5.997 0 0 0 6-6V18a5.997 5.997 0 0 0-6-6ZM24 72a12.012 12.012 0 0 0-12-12V36a12.012 12.012 0 0 0 12-12h48a12.012 12.012 0 0 0 12 12v24a12.012 12.012 0 0 0-12 12Z" />
    <Path d="M48 36a12 12 0 1 0 12 12 12.012 12.012 0 0 0-12-12Z" />
  </Svg>
);
export default SvgComponent;
