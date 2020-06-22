import React from 'react';

import {
  Container,
} from './styles';

import {
  Input,
  Label,
  Button,
  ButtonNavigation,
  ErrorsForm,
  Unit,
} from '../../../components'


interface Errors {
  numberMotor?: string;
  submitForm: boolean;
  resistance30s?: string;
  resistance60s?: string;
  resistance10m?: string;
}

interface Props {
  numberMotor: string;
  commentary: string;
  resistance30s: string;
  resistance60s: string;
  resistance10m: string;
  unitResistance30s: string;
  unitResistance60s: string;
  unitResistance10m: string;
  setFinishForm: (value: React.SetStateAction<boolean>) => void;
  setNextForm: (value: React.SetStateAction<boolean>) => void;
  handleBlur: (eventOrString: any) => void | ((e: any) => void);
  handleChange: (eventOrPath: string | React.ChangeEvent<any>) => void |
    ((eventOrTextValue: string | React.ChangeEvent<any>) => void);
  errors: Errors;
}

const Stage02: React.FC<Props> = ({
  numberMotor,
  commentary,
  resistance30s,
  resistance60s,
  resistance10m,
  unitResistance30s,
  unitResistance60s,
  unitResistance10m,
  setFinishForm,
  setNextForm,
  handleBlur,
  handleChange,
  errors,
}: Props) => {


  return (
    <Container>
      <Label>Motor: {numberMotor}</Label>
      <Label> Resistência de isolamento </Label>
      <div>
        <Input
          type="number"
          id="resistance30s"
          name="resistance30s"
          onChange={handleChange}
          value={resistance30s}
          placeholder='5,2'
        />
        <Unit
          nameField="unitResistance30s"
          valueSelect={unitResistance30s}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <span> 30 seg</span>
      </div>
      <div>
        <Input
          type="number"
          id="resistance60s"
          name="resistance60s"
          onChange={handleChange}
          value={resistance60s}
          placeholder='5,2'
        />
        <Unit
          nameField="unitResistance60s"
          valueSelect={unitResistance60s}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <span> 60 seg</span>
      </div>
      <div>
        <Input
          type="number"
          id="resistance10m"
          name="resistance10m"
          onChange={handleChange}
          value={resistance10m}
          placeholder='5,2'
        />
        <Unit
          nameField="unitResistance10m"
          valueSelect={unitResistance10m}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <span> 10 min</span>
      </div>
      <ErrorsForm>
        <div>
          {
            errors.resistance30s ||
            errors.resistance60s ||
            errors.resistance10m
          }
        </div>
      </ErrorsForm>
      <Label> Observações </Label>
      <textarea
        name="commentary"
        onChange={handleChange}
        value={commentary}
        placeholder='Exemplo “Cabos de ligação estavam mal conectados.”'
      />
      <div>
        <Button type="button" onClick={() => {
          !errors.resistance30s &&
          !errors.resistance60s &&
          !errors.resistance10m ?
          setFinishForm(true) :
          setFinishForm(false)
        }}>CONTINUAR</Button>
        <ButtonNavigation type="button" onClick={() => setNextForm(false)}>
          Voltar
        </ButtonNavigation>
      </div>
    </Container>
  );
};

export default Stage02;
