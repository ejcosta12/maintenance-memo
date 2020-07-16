import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { format } from 'date-fns';

import api from '../../services/api';

import {
  HeaderPage,
  HeaderSection,
  AreaSection,
  Button,
  ButtonNavigation,
  Table,
  Loader,
} from '../../components';

import { locations } from '../../constants';

import { useAvarageInsulation, useAlertsMaintenances, useConvertUnit } from '../../hooks';

import { MotorsContext } from '../../context/MotorsContext';

import { Container, MaintenanceContainer } from './styles';


interface Motor {
  uuId: string;
  numId: number;
  type: string;
  power: number;
  localUnit: number;
  localArea: number;
  created_at: string;
  messageAlert?: string;
  colorAlert?: string;
}

interface MaintenanceMotor {
  uuId: string;
  motor_uuid: number;
  resistance30s: number;
  resistance60s: number;
  resistance10m: number;
  valueIP: number;
  valueIA: number;
  commentary?: string,
  created_at: string;
  colorAlert?: string;
}

const UpdateLocationMotor: React.FC = () => {
  const [motor, setMotor] = useState<Motor>({} as Motor);
  const [maintenanceMotor, setMaintenanceMotor] = useState<MaintenanceMotor[]>([]);
  const [selectOrder, setSelectOrder] = useState('desc');
  const [load, setLoad] = useState(true);

  const { motorsPlusAlerts } = useContext(MotorsContext);

  const avarageInsulation = useAvarageInsulation;
  const convertUnit = useConvertUnit;

  const { numId } = useParams();
  const history = useHistory();

  const nameLocalUnit = motor.localUnit ? locations[motor.localUnit - 1].unit : undefined;
  const nameLocalArea = motor.localUnit ? locations[motor.localUnit - 1]
    .area[motor.localArea - 1] : undefined;

  const dateCreatedMotor = motor.created_at;

  useEffect(() => {
    async function loadMotor(): Promise<void> {
      setLoad(true);
      const response = await api.get(`/motors/listmotor/${numId}`);
      const responseMotor:Motor = response.data;
      if (responseMotor) {
        const motorData = motorsPlusAlerts.find((value) => (
          value.uuIdMotor === responseMotor.uuId
        ));
        if (motorData) {
          setMotor({
            ...responseMotor,
            colorAlert: motorData.colorAlert,
            messageAlert: motorData.messageAlert,
          });
        } else {
          setMotor(responseMotor);
        }
      }
      if (response.status) {
        setLoad(false);
      }
    }
    loadMotor();
  }, [numId, motorsPlusAlerts]);

  useEffect(() => {
    async function loadMaintenancesMotor(): Promise<void> {
      setLoad(true);
      const response = await api.get(`/maintenance/${motor.uuId}?order=${selectOrder}`);
      const maintenancesMotorResponse: MaintenanceMotor[] = response.data;
      setMaintenanceMotor(maintenancesMotorResponse);
      console.log(selectOrder);
      if (response.status) {
        setLoad(false);
      }
    }
    if (motor.uuId) {
      loadMaintenancesMotor();
    }
  }, [motor, selectOrder]);

  const { maintenancesPlusAlerts } = useAlertsMaintenances(maintenanceMotor);

  const handleDeleteMotor = useCallback(async () => {
    setLoad(true);
    if (window.confirm('Tem certeza que deseja excluir este motor permanentemente?')) {
      const response = await api.delete(`/motors/${motor.uuId}`);
      if (response.status) {
        setLoad(false);
      }
      if (response.status === 204) {
        history.push('/gallery-motor');
        alert('O motor foi excluído com sucesso');
      } else {
        alert('Ocorreu um erro, tente novamente mais tarde ou contate o suporte técnico.');
        history.push(`/motor/${motor.numId}`);
      }
    }
  }, [motor, history]);

  return (
    <>
      {load && <Loader />}
      <Container
        ifSelectOrder={selectOrder}
        ifColorAlert={motor.colorAlert}
      >
        <HeaderPage className="header-page-motor">
          <ButtonNavigation onClick={() => history.push(`/maintenance-motor/${motor.numId}`)}>Cadastrar Manutenção</ButtonNavigation>
          <ButtonNavigation onClick={() => history.push('/gallery-motor')}>Voltar</ButtonNavigation>
        </HeaderPage>
        <AreaSection>
          <HeaderSection>
            <h2>MOTOR</h2>
            <div>
              <Button onClick={() => history.push(`/update-motor/${motor.numId}`)}>Alterar localização</Button>
              <Button onClick={() => handleDeleteMotor()}>Excluir Motor</Button>
            </div>
          </HeaderSection>
          <div className="motor-section">
            <div>
              <span>
                Número do motor:
                <strong>
                  { motor.numId }
                </strong>
              </span>
              <span>
                Tipo:
                <strong>
                  {
                    motor.type === 'CA' ? ' Motor de Corrente Alternada' : ' Motor de Corrente Contínua'
                  }
                </strong>
              </span>
              <span>
                Potência:
                <strong>
                  { motor.power }
                  CV
                </strong>
              </span>
            </div>
            <div>
              <span>
                Unidade:
                <strong>
                  {nameLocalUnit}
                </strong>
              </span>
              <span>
                Área:
                <strong>
                  {nameLocalArea}
                </strong>
              </span>
            </div>
            <div>
              <span>
                Cadastrado desde
                <strong>
                  {motor.created_at}
                </strong>
              </span>
            </div>
            <div>
              {motor.messageAlert}
            </div>
          </div>
        </AreaSection>
        {(maintenancesPlusAlerts.length > 0) ? (
          <AreaSection>
            <HeaderSection className="header-maintenance-section">
              <h2>MANUTENÇÕES</h2>
              <div>
                <Button onClick={() => setSelectOrder('desc')}> Recentes Primeiro </Button>
                <Button onClick={() => setSelectOrder('asc')}> Antigas Primeiro </Button>
              </div>
            </HeaderSection>
            <div className="maintenance-section">
              <Table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Isolamento (M&#x2126;)</th>
                    <th>Indice de Polarização</th>
                    <th>Indice de Absorção</th>
                    <th>Observação</th>
                  </tr>
                </thead>
                {
                maintenancesPlusAlerts.map((maintenance) => (
                  <MaintenanceContainer
                    key={maintenance.uuId}
                    ifcolorAlert={maintenance.colorAlert}
                  >
                    <tr>
                      <td>{format(new Date(maintenance.created_at), 'dd/MM/yyyy')}</td>
                      <td>
                        {
                          convertUnit('8', avarageInsulation(
                            maintenance.resistance10m,
                            maintenance.resistance60s,
                            maintenance.resistance30s,
                          )).toFixed(2)
                        }
                      </td>
                      <td>{maintenance.valueIP.toFixed(2)}</td>
                      <td>{maintenance.valueIA.toFixed(2)}</td>
                      <td>{maintenance.commentary}</td>
                    </tr>
                  </MaintenanceContainer>
                ))
              }
              </Table>
            </div>
          </AreaSection>
        ) : (
          <div />
        )}
      </Container>
    </>
  );
};
export default UpdateLocationMotor;
