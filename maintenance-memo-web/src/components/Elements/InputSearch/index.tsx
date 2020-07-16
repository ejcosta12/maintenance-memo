import React from 'react';

import SearchIcon from '../../../assets/images/search.svg';

import { Container } from './styles';

import Input from '../Input';

interface Props {
  valueSearchMotors: string;
  handleChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputSearch: React.FC<Props> = ({
  valueSearchMotors,
  handleChangeSearch,
}) => (
  <Container>
    <img className="icon-search-motors" src={SearchIcon} alt="Pesquisar" />
    <Input
      type="search"
      placeholder="Número do motor"
      value={valueSearchMotors}
      onChange={(event) => handleChangeSearch(event)}
    />
  </Container>
);

export default InputSearch;
