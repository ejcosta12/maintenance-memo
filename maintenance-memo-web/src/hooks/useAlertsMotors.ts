import { useState, useEffect } from 'react';
import { differenceInMonths } from 'date-fns';

import {
  polarizationIndex,
  absorptionIndex,
  limitDateLastMaintenance,
  noAlerts,
} from '../constants';

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
interface MotorsPlusAlerts {
  motorsPlusAlerts: Motor[];
  countAlertsIssued: number;
}

function useAlertsMotors(motorsRequest: Motor[]): MotorsPlusAlerts {
  const [motors, setMotors] = useState<Motor[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    if (motorsRequest.length > 0) {
      const motorsPlusAlerts = motorsRequest.map((motor) => {
        if (motor.lastValueIP < 2) {
          setCount((value) => value + 1);
          if (motor.lastValueIP > 1.5) {
            const { messageAlert, colorAlert } = polarizationIndex[0];
            return ({
              ...motor,
              messageAlert,
              colorAlert,
            });
          } if (motor.lastValueIP > 1) {
            const { messageAlert, colorAlert } = polarizationIndex[1];
            return ({
              ...motor,
              messageAlert,
              colorAlert,
            });
          } if (motor.lastValueIP === 0) {
            const { messageAlert, colorAlert } = polarizationIndex[2];
            return ({
              ...motor,
              messageAlert,
              colorAlert,
            });
          }
          const { messageAlert, colorAlert } = polarizationIndex[3];
          return ({
            ...motor,
            messageAlert,
            colorAlert,
          });
        } if (motor.lastValueIA < 1.25) {
          setCount((value) => value + 1);
          if (motor.lastValueIA > 1.1) {
            const { messageAlert, colorAlert } = absorptionIndex[0];
            return ({
              ...motor,
              messageAlert,
              colorAlert,
            });
          } if (motor.lastValueIA > 1) {
            const { messageAlert, colorAlert } = absorptionIndex[1];
            return ({
              ...motor,
              messageAlert,
              colorAlert,
            });
          } if (motor.lastValueIA === 0) {
            const { messageAlert, colorAlert } = absorptionIndex[2];
            return ({
              ...motor,
              messageAlert,
              colorAlert,
            });
          }
          const { messageAlert, colorAlert } = absorptionIndex[3];
          return ({
            ...motor,
            messageAlert,
            colorAlert,
          });
        } if (differenceInMonths(new Date(), new Date(motor.dateLastMaintenance)) > 6) {
          setCount((value) => value + 1);
          const { messageAlert, colorAlert } = limitDateLastMaintenance[0];
          return ({
            ...motor,
            messageAlert,
            colorAlert,
          });
        }
        const { messageAlert, colorAlert } = noAlerts[0];
        return ({
          ...motor,
          messageAlert,
          colorAlert,
        });
      });
      setMotors(motorsPlusAlerts);
    }
  }, [motorsRequest]);

  return ({ motorsPlusAlerts: motors, countAlertsIssued: count });
}

export default useAlertsMotors;
