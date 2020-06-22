import React from 'react';

import { Container } from './styles';

import { Label, Select } from '../Elements';

import { locations } from '../../constants';

interface Props {
  valueSelectUnit: number;
  valueSelectArea: number;
  ifFieldAll?: boolean;
  handleChangeSelectUnit: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeSelectArea: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeBlurUnit?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeBlurArea?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Location: React.FC<Props> = ({
  valueSelectUnit,
  valueSelectArea,
  ifFieldAll,
  handleChangeSelectUnit,
  handleChangeSelectArea,
  handleChangeBlurUnit,
  handleChangeBlurArea,
}) => {

  return (
    <Container>
      <div className="select" >
        <Label> Unidade: </Label>
        <Select
          name="localUnit"
          value={valueSelectUnit}
          onChange={(event) => handleChangeSelectUnit(event)}
          onBlur={() => handleChangeBlurUnit}
        >
          {ifFieldAll && <option value={0}> Todas </option>}
          { locations.map((location, index)=> (
            <option key={index} value={index + 1}>{location.unit}</option>
          ))}
        </Select>
      </div>
      { valueSelectUnit > 0 && (
        <div className="select">
          <Label> Área: </Label>
          <Select
            name="localArea"
            value={valueSelectArea}
            onChange={(event) => handleChangeSelectArea(event)}
            onBlur={() => handleChangeBlurArea}
          >
            { ifFieldAll && <option value={0}> Todas </option>}
            { locations[Number(valueSelectUnit) - 1].area.map((localArea, index) => (
              <option key={index} value={index + 1}>{localArea}</option>
            ))}
          </Select>
        </div>
      )}
    </Container>

  );
};

export default Location;
