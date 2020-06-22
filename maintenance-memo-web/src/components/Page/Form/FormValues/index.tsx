import React, {FormHTMLAttributes} from 'react';

import { Container } from './styles';

type FormProps = FormHTMLAttributes<HTMLFormElement>

const FormValues: React.FC<FormProps> = ({children, ...rest}) => {

  return (
    <Container {...rest}>{children}</Container>
  );
};

export default FormValues;

