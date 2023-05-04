import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const SvgComponent = (props: SvgProps) => (
  <Svg viewBox="0 0 32 32" {...props}>
    <Path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424T16 32t6.208-1.248 5.12-3.424 3.392-5.12T32 16t-1.28-6.208-3.392-5.12T22.24 1.28 16 0q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12T0 16zm4 0q0-3.264 1.6-6.016t4.384-4.352T16 4t6.016 1.632T26.4 9.984 28 16t-1.6 6.048-4.384 4.352T16 28t-6.016-1.6T5.6 22.048 4 16zm6.016 7.008q0 .576.224 1.152 2.592 1.856 5.76 1.856t5.76-1.856q.256-.576.256-1.152-.256-1.344-1.088-2.464t-2.048-1.792Q20 17.6 20 16v-1.984q0-1.664-1.184-2.848T16 10.016t-2.816 1.152T12 14.016V16q0 1.6 1.12 2.752-1.216.672-2.048 1.792t-1.056 2.464z" />
  </Svg>
);
export default SvgComponent;
