import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  Container,
} from './styles';

import {
  Button,
} from '../../../components';

interface Props {
  numId: string;
}

const Stage02: React.FC<Props> = ({
  numId,
}: Props) => {

  const history = useHistory();

  return (
    <Container>
      <div>
        <p>Número de Identificação</p>
        <p>{numId}</p>
        <p>ATENÇÃO</p>
        <p>O NÚMERO ACIMA NÃO SERÁ EXIBIDO NOVAMENTE, GRAVE-O IMEDIATAMENTE
          NO MOTOR.
        </p>
      </div>
      <div>
        <Button type="button" onClick={() => history.push('/')}> CONCORDAR </Button>
      </div>
    </Container>
  );
};

export default Stage02;
