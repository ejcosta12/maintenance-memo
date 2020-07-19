import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  Container,
} from './styles';

import {
  Button,
  ButtonNavigation,
  Location,
} from '../../../components';

interface Props {
  numId: number;
  nameLocalUnit?: string;
  nameLocalArea?: string;
  localUnit: string;
  localArea: string;
  handleBlur: (eventOrString: any) => void | ((e: any) => void);
  handleChange: (eventOrPath: string | React.ChangeEvent<any>) => void |
    ((eventOrTextValue: string | React.ChangeEvent<any>) => void);
}

const Stage01: React.FC<Props> = ({
  numId,
  nameLocalUnit,
  nameLocalArea,
  localUnit,
  localArea,
  handleBlur,
  handleChange,
}: Props) => {
  const history = useHistory();

  return (
    <Container>
      <div>
        <span>
          Número do motor:
          <strong>
            { numId }
          </strong>
        </span>
        <span>
          Unidade atual:
          <strong>
            { nameLocalUnit }
          </strong>
        </span>
        <span>
          Área atual:
          <strong>
            { nameLocalArea }
          </strong>
        </span>
      </div>
      <span>
        <strong>---------- Novo Endereço ----------</strong>
      </span>
      <Location
        valueSelectUnit={Number(localUnit)}
        valueSelectArea={Number(localArea)}
        handleChangeSelectUnit={handleChange}
        handleChangeSelectArea={handleChange}
        handleChangeBlurUnit={handleBlur}
        handleChangeBlurArea={handleBlur}
      />
      <div>
        <div>
          <Button type="submit">Atualizar</Button>
          <ButtonNavigation type="button" onClick={() => history.push(`/motor/${numId}`)}>
            Voltar
          </ButtonNavigation>
        </div>
      </div>
    </Container>
  );
};

export default Stage01;
