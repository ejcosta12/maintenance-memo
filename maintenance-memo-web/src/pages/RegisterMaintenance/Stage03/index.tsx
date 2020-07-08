import React from 'react';

import {
  Container,
} from './styles';

import {
  useAvarageInsulation,
  useConvertUnit,
} from '../../../hooks';

import {
  Button,
  ButtonNavigation,
} from '../../../components';

interface Props {
  numberMotor: string;
  polarizationIndex: number;
  absorptionIndex: number;
  resistance30s: string;
  resistance60s: string;
  resistance10m: string;
  unitResistance30s: string;
  unitResistance60s: string;
  unitResistance10m: string;
  setFinishForm: (value: React.SetStateAction<boolean>) => void;
}

const Stage03: React.FC<Props> = ({
  numberMotor,
  polarizationIndex,
  absorptionIndex,
  resistance30s,
  resistance60s,
  resistance10m,
  unitResistance30s,
  unitResistance60s,
  unitResistance10m,
  setFinishForm,
}: Props) => {

  const valueResistance30s = useConvertUnit(unitResistance30s, resistance30s);
  const valueResistance60s = useConvertUnit(unitResistance60s, resistance60s);
  const valueResistance10m = useConvertUnit(unitResistance10m, resistance10m);

  const avarageInsulation = useAvarageInsulation(
    valueResistance30s,
    valueResistance60s,
    valueResistance10m
  );

  return (
    <Container>
      <div>
        <p>Motor: {numberMotor}</p>
        <p> IP: {polarizationIndex} </p>
        <p> IA: {absorptionIndex} </p>
        <p>Isolamento médio: {avarageInsulation} &#x2126;
        </p>
        <p>Condição:
          {
            !!((absorptionIndex <= 1.25 )||(polarizationIndex <= 2)) ?
            ' O equipamento precisará ser avaliado pelo responsável.'
            :' Equipamento em ótimo estado.'
          }
        </p>
        <p>Bom Trabalho!</p>
      </div>
      <div>
        <Button type="submit">ENVIAR</Button>
        <ButtonNavigation type="button" onClick={() => setFinishForm(false)}>Voltar</ButtonNavigation>
      </div>
    </Container>
  );
};

export default Stage03;
