import React, { TableHTMLAttributes } from 'react';

import { Container } from './styles';

type TableProps = TableHTMLAttributes<HTMLTableElement>

const Table: React.FC<TableProps> = ({ children, ...rest }) => (
  <Container {...rest}>
    {children}
  </Container>
);

export default Table;
