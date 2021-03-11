import React from 'react';
import CenterVertically from 'components/atoms/CenterVertically/CenterVertically';

const CenterVerticallyContainer: React.FC = ({ children }) => (
  <CenterVertically>
    <div>
      {children}
    </div>
  </CenterVertically>
)

export default CenterVerticallyContainer;