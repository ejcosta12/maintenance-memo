import React, {LabelHTMLAttributes} from 'react';

import {Container} from './styles';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

const Label: React.FC<LabelProps> = ({children, ...rest}) => {
  return (
    <Container {...rest}>{children}</Container>
  )
};

export default Label;
