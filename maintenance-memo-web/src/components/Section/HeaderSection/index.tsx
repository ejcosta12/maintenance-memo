import React, {AreaHTMLAttributes} from 'react';

import { Container } from './styles';

type HeaderProps = AreaHTMLAttributes<HTMLHeadElement>

const HeaderSection: React.FC<HeaderProps> = ({children, ...rest}) => {

  return (
    <Container {...rest}>{children}</Container>
  );
};

export default HeaderSection;

