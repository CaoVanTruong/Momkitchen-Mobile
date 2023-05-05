import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const SvgComponent = (props: SvgProps) => (
  <Svg viewBox="0 0 32 32" {...props}>
    <Path d="m11.414 15-8-8L2 8.414 8.586 15H2v1a14 14 0 0 0 28 0v-1ZM16 28A12.017 12.017 0 0 1 4.041 17H27.96A12.017 12.017 0 0 1 16 28Z" />
    <Path d="M22 8a5.005 5.005 0 0 0-1.57.255A8.024 8.024 0 0 0 14 5a7.936 7.936 0 0 0-4.906 1.68L4.414 2 3 3.414l6.05 6.05.707-.707A5.96 5.96 0 0 1 14 7a6.02 6.02 0 0 1 4.688 2.264 5.06 5.06 0 0 0-.59.61A2.99 2.99 0 0 1 15.754 11H12v2h3.754a4.98 4.98 0 0 0 3.904-1.875A3 3 0 0 1 25 13h2a5.006 5.006 0 0 0-5-5Z" />
    <Path d="M0 0h32v32H0z" fill={'none'} />
  </Svg>
);
export default SvgComponent;
