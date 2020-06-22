import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  Container,
} from './styles';

import {
  Button,
} from '../../../components';

interface Props {
  numId: number;
  newLocalUnit?: string;
  newLocalArea?: string;
}

const Stage02: React.FC<Props> = ({
  numId,
  newLocalUnit,
  newLocalArea,
}: Props) => {

  const history = useHistory();

  return (
    <Container>
      <div>
        <p>Dados gravados com sucesso</p>
        <p>Número de Identificação</p>
        <p>{numId}</p>
        <p>Unidade: {newLocalUnit}</p>
        <p>Area: {newLocalArea}</p>
        <p>ATENÇÃO</p>
        <p>O NÚMERO ACIMA NÃO SERÁ EXIBIDO NOVAMENTE, GRAVE-O IMEDIATAMENTE
          NO MOTOR.
        </p>
      </div>
      <div>
        <Button type="button" onClick={() => history.push(`/motor/${numId}`)}>
          CONCORDAR
        </Button>
      </div>
    </Container>
  );
};

export default Stage02;
