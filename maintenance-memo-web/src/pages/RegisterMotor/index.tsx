import React, { useState, useCallback } from 'react';
import { useFormik } from 'formik';

import api from '../../services/api';

import {
  Container
} from './styles';

import {
  AreaForm,
  HeaderForm,
  FormValues,
} from '../../components';

import Stage01 from './Stage01';
import Stage02 from './Stage02';

interface FormValues {
  type: string;
  power: string;
  localUnit: string;
  localArea: string;
}

const RegisterMotor: React.FC = () => {

  const [finishForm, setFinishForm] = useState(false);
  const [numId, setNumId] = useState('');

  const formik = useFormik({
    initialValues: {
      type: '',
      power: '',
      localUnit: '1',
      localArea: '1',
    },
    validate: values => handleValidateForm(values),
    onSubmit: (values) => {
      handleSubmitMotor(values);
    },
  });

  const handleValidateForm = useCallback(({
    type,
    power,
  }: FormValues ) => {
    const errors: Partial<FormValues> = {};
    if (!type){
      errors.type = 'Insira o tipo de motor (CC ou CA)';
    }
    if (!power){
      errors.power = 'Insira a potência do motor em cavalos';
    }
    return errors;
  }, []);

  const handleSubmitMotor = useCallback( async ({
    type,
    power,
    localUnit,
    localArea,
  }: FormValues): Promise<void> => {
    const response = await api.post('/motors', {
      type,
      power,
      localUnit,
      localArea,
    });
    setNumId(response.data.numId);
    setFinishForm(true);
  }, [])

  const {
    type,
    power,
  } = formik.values;

  return (
    <Container ifErrorFieldForm={formik.errors}>
      <AreaForm className="area-form">
        <HeaderForm nextForm={true} finishForm={finishForm}>
          Atenção: Antes de continuar é necessário que você tenha um marcardor
          para gravar o número de identificação que será fornecido ao novo motor!
        </HeaderForm>
        <FormValues onSubmit={formik.handleSubmit}>
          <h2> NOVO MOTOR </h2>
          {
            !finishForm && (
              <Stage01
                type={type}
                power={power}
                localUnit={formik.values.localUnit}
                localArea={formik.values.localArea}
                handleBlur={formik.handleBlur}
                handleChange={formik.handleChange}
                errors={{
                  type: formik.errors.type,
                  power: formik.errors.power
                }}
              />
            )
          }
          {
            finishForm && (
              <Stage02
                numId={numId}
              />
            )
          }
        </FormValues>
      </AreaForm>
    </Container>
  );
};

export default RegisterMotor;
