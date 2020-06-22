import React from 'react';

import {
  Container,
} from './styles';

import {
  Input,
  Label,
  Button,
  ErrorsForm,
} from '../../../components'


interface Errors {
  numberMotor?: string;
  submitForm: boolean;
}

interface Props {
  handleChange: (eventOrPath: string | React.ChangeEvent<any>) => void |
    ((eventOrTextValue: string | React.ChangeEvent<any>) => void);
  valueInput: string;
  handleValidate: (valueInput: string) => Promise<void>;
  errors: Errors;
}

const Stage01: React.FC<Props> = ({
  handleChange,
  handleValidate,
  valueInput,
  errors,
}: Props) => {


  return (
    <Container>
      <div>
        <Label> Número do Motor </Label>
        <Input
          id="numberMotor"
          type="number"
          name="numberMotor"
          onChange={handleChange}
          value={valueInput}
          placeholder='Exemplo: 13280'
        />
        <ErrorsForm>
          <div>{errors.numberMotor}</div>
          { !errors.numberMotor && errors.submitForm && (
            <div>
            Motor não encontrado, digite o número correto ou cadastre um novo motor.
            </div>
          )}
        </ErrorsForm>
      </div>
      <p> Ou </p>
      <a href="/register-motor"> Toque aqui para antes cadastrar um novo motor </a>
      <Button type="button" onClick={() => handleValidate(valueInput)}>CONTINUAR</Button>
    </Container>
  );
};

export default Stage01;
