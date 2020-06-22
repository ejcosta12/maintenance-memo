import React, {AreaHTMLAttributes} from 'react';

import { Container } from './styles';

type SectionProps = AreaHTMLAttributes<HTMLDivElement>

const Errors: React.FC<SectionProps> = ({children, ...rest}) => {

  return (
    <Container {...rest}>{children}</Container>
  );
};

export default Errors;

