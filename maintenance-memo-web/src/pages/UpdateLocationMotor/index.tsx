import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';

import api from '../../services/api';

import {
  Container,
} from './styles';

import {
  AreaForm,
  HeaderForm,
  FormValues,
  Loader,
} from '../../components';

import { locations } from '../../constants';

import Stage01 from './Stage01';
import Stage02 from './Stage02';

interface FormValues {
  localUnit: string;
  localArea: string;
}

interface Motor {
  uuId: string;
  numId: number;
  type: string;
  power: number;
  localUnit: number;
  localArea: number;
  created_at: string;
}

const RegisterMotor: React.FC = () => {
  const { numId } = useParams();

  const [finishForm, setFinishForm] = useState(false);
  const [motor, setMotor] = useState<Motor>({} as Motor);
  const [newMotor, setNewMotor] = useState<Motor>({} as Motor);
  const [load, setLoad] = useState(false);

  const nameLocalUnit = motor.localUnit
    ? locations[motor.localUnit - 1].unit : undefined;
  const nameLocalArea = motor.localUnit
    ? locations[motor.localUnit - 1].area[motor.localArea - 1] : undefined;
  const newNameLocalUnit = newMotor.localUnit
    ? locations[newMotor.localUnit - 1].unit : undefined;
  const newNameLocalArea = newMotor.localUnit
    ? locations[newMotor.localUnit - 1].area[newMotor.localArea - 1] : undefined;

  const handleUpdateMotor = useCallback(async ({
    localUnit,
    localArea,
  }: FormValues): Promise<void> => {
    setLoad(true);
    const response = await api.put(`/motors/${motor.uuId}`, {
      localUnit,
      localArea,
    });
    if (response.status) {
      setLoad(false);
    }
    setNewMotor(response.data);
    setFinishForm(true);
  }, [motor]);

  const formik = useFormik({
    initialValues: {
      localUnit: '1',
      localArea: '1',
    },
    onSubmit: (values) => {
      handleUpdateMotor(values);
    },
  });

  useEffect(() => {
    async function loadMotor(): Promise<void> {
      setLoad(true);
      const responseMotor = await api.get(`/motors/listmotor/${numId}`);
      setMotor(responseMotor.data);
      if (responseMotor.status) {
        setLoad(false);
      }
    }
    loadMotor();
  }, [numId]);

  return (
    <>
      {load && <Loader />}
      <Container>
        <AreaForm className="area-form">
          <HeaderForm
            nextForm={!false}
            finishForm={finishForm}
          >
            Atenção: Antes de continuar é necessário que você tenha um marcardor
            para gravar o número de identificação que será fornecido ao novo motor!
          </HeaderForm>
          <FormValues
            onSubmit={formik.handleSubmit}
          >
            <h2> NOVA LOCALIZAÇÃO </h2>
            {
              !finishForm && (
                <Stage01
                  numId={motor.numId}
                  nameLocalUnit={nameLocalUnit}
                  nameLocalArea={nameLocalArea}
                  localUnit={formik.values.localUnit}
                  localArea={formik.values.localArea}
                  handleBlur={formik.handleBlur}
                  handleChange={formik.handleChange}
                />
              )
            }
            {
              finishForm && (
                <Stage02
                  numId={newMotor.numId}
                  newLocalUnit={newNameLocalUnit}
                  newLocalArea={newNameLocalArea}
                />
              )
            }
          </FormValues>
        </AreaForm>
      </Container>
    </>
  );
};

export default RegisterMotor;
