import React, {SelectHTMLAttributes} from 'react';

import {Container} from './styles';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<SelectProps> = ({children, ...rest}) => {
  return (
    <Container {...rest}>{children}</Container>
  )
};

export default Select;
