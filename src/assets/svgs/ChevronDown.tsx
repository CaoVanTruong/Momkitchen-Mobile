import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const SvgComponent = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path
      fill="none"
      stroke={props.fill || '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m5 8.5 7 7 7-7"
    />
  </Svg>
);
export default SvgComponent;
