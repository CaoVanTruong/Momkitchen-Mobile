import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      stroke={props.stroke || '#121923'}
      strokeWidth={1.2}
      d="M5 6.5h15m-10 0v-2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2M12.5 9v8m3-8-.5 8M9.5 9l.5 8m8.5-10.5-.929 12.077a1 1 0 0 1-.997.923H8.426a1 1 0 0 1-.997-.923L6.5 6.5h12Z"
    />
  </Svg>
);
export default SvgComponent;
