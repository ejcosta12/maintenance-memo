import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;


const ButtonNavigation: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container {...rest}>
    {children}
  </Container>
);
export default ButtonNavigation;
