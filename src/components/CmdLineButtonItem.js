import React from 'react';

import CmdLineButton from './CmdLineButton';

const CmdLineButtonItem = ({ onClick, displayText }) => (
  <li>
    <CmdLineButton
      onClick={onClick}
      text={displayText}
    />
  </li>
);

export default CmdLineButtonItem;

