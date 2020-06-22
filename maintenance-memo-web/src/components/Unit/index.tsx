import React from 'react';

import { Container } from './styles';

import { Select } from '../Elements';

interface Props {
  nameField: string;
  valueSelect: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleBlur: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Unit: React.FC<Props> = ({
  nameField,
  valueSelect,
  handleChange,
  handleBlur,
}) => {
  return (
    <Container>
      <Select
        name={nameField}
        value={valueSelect}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <option value= '1'> &#x2126; </option>
        <option value= '2'> K&#x2126; </option>
        <option value= '3'> M&#x2126; </option>
        <option value= '4'> G&#x2126; </option>
        <option value= '5'> T&#x2126; </option>
      </Select>
    </Container>

  );
};

export default Unit;
