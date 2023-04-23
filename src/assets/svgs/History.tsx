import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 42 35.25" {...props}>
    <Path
      fill="#FF7A00"
      d="M24.458.875A17.625 17.625 0 0 0 6.833 18.5H.958l7.618 7.618.137.274 7.912-7.892H10.75c0-7.579 6.13-13.708 13.708-13.708 7.58 0 13.709 6.13 13.709 13.708 0 7.579-6.13 13.708-13.709 13.708-3.78 0-7.206-1.547-9.674-4.034l-2.78 2.781a17.534 17.534 0 0 0 12.454 5.17 17.625 17.625 0 1 0 0-35.25ZM22.5 10.667v9.791l8.323 4.935 1.508-2.526-6.894-4.093v-8.107H22.5Z"
    />
  </Svg>
);
export default SvgComponent;
