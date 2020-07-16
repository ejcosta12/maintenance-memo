import React, { AreaHTMLAttributes } from 'react';

import { Container } from './styles';

type HeaderProps = AreaHTMLAttributes<HTMLHeadElement>

const HeaderPage: React.FC<HeaderProps> = ({ children, ...rest }) => (
  <Container {...rest}>
    <div>
      <h1>MAINTENANCE MEMO</h1>
      <nav>
        {children}
      </nav>
    </div>
  </Container>
);

export default HeaderPage;
