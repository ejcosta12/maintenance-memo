import React, {AreaHTMLAttributes} from 'react';

import { Container } from './styles';

type ErrorsProps = AreaHTMLAttributes<HTMLDivElement>

const ErrorsForm: React.FC<ErrorsProps> = ({children, ...rest}) => {

  return (
    <Container {...rest}>{children}</Container>
  );
};

export default ErrorsForm;

