import React from 'react';

import { FiSearch } from 'react-icons/fi';

import { Container } from './styles';

import Input from '../Input';

interface Props {
  valueSearchMotors: string;
  handleChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputSearch: React.FC<Props> = ({
  valueSearchMotors,
  handleChangeSearch,
}) => {
  return (
    <Container>
      <FiSearch className='icon-search-motors' size={25}/>
      <Input type="search" placeholder='Número do motor'
        value={valueSearchMotors}
        onChange={(event) => handleChangeSearch(event)}
      />
    </Container>
  );
};

export default InputSearch;
