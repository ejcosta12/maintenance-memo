import React, {
  useEffect,
  useCallback,
  useState,
  useContext,
} from 'react';

import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import {
  HeaderPage,
  HeaderSection,
  AreaSection,
  ButtonNavigation,
  InputSearch,
  Location,
  Loader,
} from '../../components';

import { MotorsContext } from '../../context/MotorsContext';

import { useAlertsMotors } from '../../hooks';

import {
  Container,
  GridContainer,
  MotorContainer,
} from './styles';

  interface Motor {
    uuIdMotor: string;
    numIdMotor: number;
    lastValueIP: number;
    lastValueIA: number;
    dateLastMaintenance: string;
    localUnit: number;
    localArea: number;
    messageAlert?: string;
    colorAlert?: string;
  }

  interface Motors {
    quantityTotal: number;
    motorsMaintenances: Motor[];
  }

const GalleryMotors: React.FC = () => {
  const [getMotors, setGetMotors] = useState<Motor[]>([]);
  const [valueSearchMotors, setValueSearchMotors] = useState('');
  const [quantityMotors, setQuantityMotors] = useState(0);
  const [valueSelectUnit, setValueSelectUnit] = useState(0);
  const [valueSelectArea, setValueSelectArea] = useState(0);
  const [load, setLoad] = useState(true);

  const motorsContext = useContext(MotorsContext);
  const originalMotors = motorsContext.motorsPlusAlerts;

  const history = useHistory();

  useEffect(() => {
    async function loadMotors(): Promise<void> {
      setLoad(true);
      const response = await api.get('motors/maintenance', {
        params: {
          localUnit: valueSelectUnit,
          localArea: valueSelectArea,
        },
      });
      const motorsResponse: Motors = response.data;
      if (motorsResponse.motorsMaintenances) {
        setGetMotors(motorsResponse.motorsMaintenances);
        setQuantityMotors(motorsResponse.quantityTotal);
      }
      if (response.status) {
        setLoad(false);
      }
    }
    loadMotors();
  }, [valueSelectUnit, valueSelectArea]);

  const { motorsPlusAlerts } = useAlertsMotors(getMotors);

  const handleChangeSearch = useCallback((event) => {
    setValueSearchMotors(event.target.value);
    const newMotors = originalMotors.filter((motor) => (
      String(motor.numIdMotor).startsWith(event.target.value)
    ));
    setGetMotors(newMotors);
    setQuantityMotors(newMotors.length);
    if (!event.target.value) {
      setValueSelectUnit(0);
      setValueSelectArea(0);
    }
  }, [originalMotors]);

  const handleChangeSelectUnit = useCallback((event) => {
    setValueSelectUnit(event.target.value);
    setValueSelectArea(0);
    setValueSearchMotors('');
  }, []);

  const handleChangeSelectArea = useCallback((event) => {
    setValueSelectArea(event.target.value);
    setValueSearchMotors('');
  }, []);

  return (
    <>
      {load && <Loader />}
      <Container>
        <HeaderPage>
          <ButtonNavigation
            type="button"
            onClick={() => history.push('/')}
          >
            Cadastrar Manutenção
          </ButtonNavigation>
        </HeaderPage>
        <AreaSection>
          <div className="header-section-grid">
            <HeaderSection>
              {
                ((quantityMotors === 1) && (
                  <p>
                    <strong>{quantityMotors}</strong>
                    motor encontrado
                  </p>
                ))
                || ((quantityMotors > 1) && (
                  <p>
                    <strong>{quantityMotors}</strong>
                    motores encontrados
                  </p>
                ))
                || (<p> Nenhum motor encontrado. </p>)
              }
              <Location
                valueSelectUnit={valueSelectUnit}
                valueSelectArea={valueSelectArea}
                handleChangeSelectUnit={handleChangeSelectUnit}
                handleChangeSelectArea={handleChangeSelectArea}
                ifFieldAll={!false}
              />
            </HeaderSection>
            <InputSearch

              valueSearchMotors={valueSearchMotors}
              handleChangeSearch={handleChangeSearch}
            />
          </div>
          <GridContainer>
            { !!motorsPlusAlerts && motorsPlusAlerts.map((motor) => (
              <MotorContainer
                key={motor.uuIdMotor}
                ifColorAlert={motor.colorAlert}
                onClick={() => history.push(`/motor/${motor.numIdMotor}`)}
              >
                <div>
                  <h4>
                    Motor:
                    {motor.numIdMotor}
                  </h4>
                </div>
                <div>
                  Polarização:
                  {motor.lastValueIP}
                </div>
                <div>
                  Absorção:
                  {motor.lastValueIA}
                </div>
                <div>{motor.messageAlert}</div>
                <div><h4> Abrir </h4></div>
              </MotorContainer>
            ))}
          </GridContainer>
        </AreaSection>
      </Container>
    </>
  );
};

export default GalleryMotors;
