import React, { useState, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';

import api from '../../services/api';

import { MotorsContext } from '../../context/MotorsContext';

import { convertUnit } from '../../constants';

import Stage01 from './Stage01';
import Stage02 from './Stage02';
import Stage03 from './Stage03';

import {
  AreaForm,
  HeaderForm,
  FormValues,
  Loader,
} from '../../components';

import {
  Container,
} from './styles';


interface FormValues {
  numberMotor: string;
  resistance30s: string;
  unitResistance30s: string;
  resistance60s: string;
  unitResistance60s: string;
  resistance10m: string;
  unitResistance10m: string;
  commentary: string;
}

interface Params {
  numIdMotor?: string;
}

const RegisterMaintenance: React.FC = () => {
  const { toggleAlerts } = useContext(MotorsContext);
  const [nextForm, setNextForm] = useState(false);
  const [finishForm, setFinishForm] = useState(false);
  const [errorSubmitForm, setErrorSubmitForm] = useState(false);
  const [load, setLoad] = useState(false);

  const { numIdMotor }: Params = useParams();

  const formik = useFormik({
    initialValues: {
      numberMotor: numIdMotor || '',
      resistance30s: '',
      unitResistance30s: '3',
      resistance60s: '',
      unitResistance60s: '3',
      resistance10m: '',
      unitResistance10m: '3',
      commentary: '',
    },
    validate: ({
      numberMotor,
      resistance30s,
      resistance60s,
      resistance10m,
    }) => {
      const errors: Partial<FormValues> = {};
      if (!numberMotor) {
        errors.numberMotor = 'Insira o número do motor';
      } else {
        setErrorSubmitForm(false);
      }
      if (!resistance30s) {
        errors.resistance30s = 'Insira o valor obtido em 30 segundos';
      }
      if (!resistance60s) {
        errors.resistance60s = 'Insira o valor obtido em 60 segundos';
      }
      if (!resistance10m) {
        errors.resistance10m = 'Insira o valor obtido em 10 minutos';
      }
      return errors;
    },
    onSubmit: async ({
      numberMotor,
      commentary,
      unitResistance30s,
      unitResistance60s,
      unitResistance10m,
      resistance30s,
      resistance60s,
      resistance10m,
    }: FormValues): Promise<void> => {
      const valueResistance30s = convertUnit(unitResistance30s, resistance30s);
      const valueResistance60s = convertUnit(unitResistance60s, resistance60s);
      const valueResistance10m = convertUnit(unitResistance10m, resistance10m);
      setLoad(true);
      const response = await api.post(`/maintenance/${numberMotor}`, {
        resistance30s: valueResistance30s,
        resistance60s: valueResistance60s,
        resistance10m: valueResistance10m,
        commentary,
      });
      if (response.status) {
        setLoad(false);
      }
      setNextForm(false);
      setFinishForm(false);
      formik.resetForm();
      toggleAlerts();
    },
  });

  const {
    numberMotor,
    resistance30s,
    unitResistance30s,
    resistance60s,
    unitResistance60s,
    resistance10m,
    unitResistance10m,
    commentary,
  } = formik.values;

  const polarizationIndex = Number(resistance10m) / Number(resistance60s);
  const absorptionIndex = Number(resistance60s) / Number(resistance30s);

  const handleValidateMotor = useCallback(async (numberMotorValidate: string): Promise<void> => {
    setLoad(true);
    try {
      const response = await api.get(`/motors/listmotor/${numberMotorValidate}`);
      if (response.data.uuId && !formik.errors.numberMotor) {
        setLoad(false);
        setNextForm(true);
      }
      if (response.status) {
        setLoad(false);
      }
    } catch (error) {
      setTimeout(setErrorSubmitForm(true), 10);
      setLoad(false);
    }
  }, [formik.errors.numberMotor]);

  return (
    <>
      {load && <Loader />}
      <Container
        ifErrorSubmitForm={errorSubmitForm}
        ifErrorFieldForm={formik.errors}
      >
        <AreaForm>
          <HeaderForm nextForm={nextForm} finishForm={finishForm}>
            Agradecemos por você estar aqui!
          </HeaderForm>
          <FormValues onSubmit={formik.handleSubmit}>
            <h2> CADASTRAR MANUTENÇÃO </h2>
            {
              !nextForm && !finishForm && (
                <Stage01
                  handleChange={formik.handleChange}
                  handleValidate={handleValidateMotor}
                  valueInput={numberMotor}
                  errors={{
                    numberMotor: formik.errors.numberMotor,
                    submitForm: errorSubmitForm,
                  }}
                />
              )
            }
            {
              nextForm && !finishForm && (
                <Stage02
                  numberMotor={numberMotor}
                  commentary={commentary}
                  resistance30s={resistance30s}
                  resistance60s={resistance60s}
                  resistance10m={resistance10m}
                  unitResistance30s={unitResistance30s}
                  unitResistance60s={unitResistance60s}
                  unitResistance10m={unitResistance10m}
                  setFinishForm={setFinishForm}
                  setNextForm={setNextForm}
                  handleBlur={formik.handleBlur}
                  handleChange={formik.handleChange}
                  errors={{
                    numberMotor: formik.errors.numberMotor,
                    submitForm: errorSubmitForm,
                    resistance30s: formik.errors.resistance30s,
                    resistance60s: formik.errors.resistance60s,
                    resistance10m: formik.errors.resistance10m,
                  }}
                />
              )
            }
            {
              nextForm && finishForm && (
                <Stage03
                  numberMotor={numberMotor}
                  polarizationIndex={polarizationIndex}
                  absorptionIndex={absorptionIndex}
                  resistance30s={resistance30s}
                  resistance60s={resistance60s}
                  resistance10m={resistance10m}
                  unitResistance30s={unitResistance30s}
                  unitResistance60s={unitResistance60s}
                  unitResistance10m={unitResistance10m}
                  setFinishForm={setFinishForm}
                />
              )
            }
          </FormValues>
        </AreaForm>
      </Container>
    </>
  );
};

export default RegisterMaintenance;
