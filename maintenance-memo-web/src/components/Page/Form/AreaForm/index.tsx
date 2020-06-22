import React, {AreaHTMLAttributes} from 'react';

import { Container } from './styles';

type AreaFormProps = AreaHTMLAttributes<HTMLDivElement>

const AreaForm: React.FC<AreaFormProps> = ({children, ...rest}) => {

  return (
    <Container {...rest}>{children}</Container>
  );
};

export default AreaForm;

