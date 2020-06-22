import React from 'react';

import LoadIcon from '../../assets/images/load.svg';

import { Container } from './styles';

const Loader: React.FC = () => {
  return (
    <Container>
      <img className='icon-search-motors' src={LoadIcon} alt="Loading"/>
    </Container>
  );
};

export default Loader;
