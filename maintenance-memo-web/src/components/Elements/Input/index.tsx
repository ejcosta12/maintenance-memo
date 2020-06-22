import React, {InputHTMLAttributes} from 'react';

import {Container} from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => {
  return (
  <>
    <Container {...props} />
  </>
  );
};

export default Input;
