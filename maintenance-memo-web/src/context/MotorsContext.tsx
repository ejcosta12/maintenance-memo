import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

import api from '../services/api';

import { useAlertsMotors } from '../hooks';

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

interface MotorsContext {
  motorsPlusAlerts: Motor[];
  countAlertsIssued: number;
  toggleAlerts(): void;
}

interface Motors {
  quantityTotal: number;
  motorsMaintenances: Motor[];
}

const MotorsContext = createContext<MotorsContext>({} as MotorsContext);

const MotorsProvider: React.FC = ({ children }) => {
  const [motors, setMotors] = useState<Motor[]>([]);
  const [updateAlertsMotors, setUpdateAlertsMotors] = useState(false);
  const { motorsPlusAlerts, countAlertsIssued } = useAlertsMotors(motors);

  useEffect(() => {
    async function loadMotors(): Promise<void> {
      const response = await api.get('motors/maintenance');
      const motorsResponse: Motors = response.data;
      if (motorsResponse.motorsMaintenances) {
        setMotors(motorsResponse.motorsMaintenances);
      }
    }
    loadMotors();
  }, [updateAlertsMotors]);

  const toggleAlerts = useCallback(() => {
    if (updateAlertsMotors) {
      setUpdateAlertsMotors(false);
    } else {
      setUpdateAlertsMotors(true);
    }
  }, [updateAlertsMotors]);

  return (
    <MotorsContext.Provider value={{
      countAlertsIssued,
      motorsPlusAlerts,
      toggleAlerts,
    }}
    >
      {children}
    </MotorsContext.Provider>
  );
};

export { MotorsContext, MotorsProvider };
