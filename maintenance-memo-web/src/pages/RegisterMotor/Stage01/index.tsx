import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  Container,
} from './styles';

import {
  Input,
  Label,
  Button,
  ButtonNavigation,
  ErrorsForm,
  Location,
} from '../../../components';


interface Errors {
  type?: string;
  power?: string;
}

interface Props {
  type: string;
  power: string;
  localUnit: string;
  localArea: string;
  handleBlur: (eventOrString: any) => void | ((e: any) => void);
  handleChange: (eventOrPath: string | React.ChangeEvent<any>) => void |
    ((eventOrTextValue: string | React.ChangeEvent<any>) => void);
  errors: Errors;
}

const Stage01: React.FC<Props> = ({
  type,
  power,
  localUnit,
  localArea,
  handleBlur,
  handleChange,
  errors,
}: Props) => {
  const history = useHistory();
  return (
    <Container>
      <div>
        <Label>Tipo</Label>
        <Input
          id="type"
          name="type"
          onChange={handleChange}
          value={type}
          placeholder="CA"
        />
        <ErrorsForm>
          <div>{errors.type}</div>
        </ErrorsForm>
      </div>
      <div>
        <Label>Potência</Label>
        <div>
          <Input
            id="power"
            name="power"
            onChange={handleChange}
            value={power}
            placeholder="2"
          />
          <span>CV</span>
        </div>
        <ErrorsForm>
          <div>{errors.power}</div>
        </ErrorsForm>
      </div>
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
          <Button type="submit">CADASTRAR</Button>
          <ButtonNavigation type="button" onClick={() => history.push('/')}>
            Voltar
          </ButtonNavigation>
        </div>
      </div>
    </Container>
  );
};

export default Stage01;
