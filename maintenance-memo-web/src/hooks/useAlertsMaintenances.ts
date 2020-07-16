import { useState, useEffect } from 'react';
import { differenceInMonths } from 'date-fns';

import {
  polarizationIndex,
  absorptionIndex,
  limitDateLastMaintenance,
  noAlerts,
} from '../constants';

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
interface MaintenancesPlusAlerts {
  maintenancesPlusAlerts: MaintenanceMotor[];
}

function useAlertsMaintenances(maintenancesRequest: MaintenanceMotor[]): MaintenancesPlusAlerts {
  const [maintenances, setMaintenances] = useState<MaintenanceMotor[]>([]);

  useEffect(() => {
    if (maintenancesRequest.length > 0) {
      const maintenancesPlusAlerts = maintenancesRequest.map((maintenance) => {
        if (maintenance.valueIP < 2) {
          if (maintenance.valueIP > 1.5) {
            const { colorAlert } = polarizationIndex[0];
            return ({
              ...maintenance,
              colorAlert,
            });
          } if (maintenance.valueIP > 1) {
            const { colorAlert } = polarizationIndex[1];
            return ({
              ...maintenance,
              colorAlert,
            });
          } if (maintenance.valueIP === 0) {
            const { colorAlert } = polarizationIndex[2];
            return ({
              ...maintenance,
              colorAlert,
            });
          }
          const { colorAlert } = polarizationIndex[3];
          return ({
            ...maintenance,
            colorAlert,
          });
        } if (maintenance.valueIA < 1.25) {
          if (maintenance.valueIA > 1.1) {
            const { colorAlert } = absorptionIndex[0];
            return ({
              ...maintenance,
              colorAlert,
            });
          } if (maintenance.valueIA > 1) {
            const { colorAlert } = absorptionIndex[1];
            return ({
              ...maintenance,
              colorAlert,
            });
          } if (maintenance.valueIA === 0) {
            const { colorAlert } = absorptionIndex[2];
            return ({
              ...maintenance,
              colorAlert,
            });
          }
          const { colorAlert } = absorptionIndex[3];
          return ({
            ...maintenance,
            colorAlert,
          });
        } if (differenceInMonths(new Date(), new Date(maintenance.created_at)) > 6) {
          const { colorAlert } = limitDateLastMaintenance[0];
          return ({
            ...maintenance,
            colorAlert,
          });
        }
        const { colorAlert } = noAlerts[0];
        return ({
          ...maintenance,
          colorAlert,
        });
      });
      setMaintenances(maintenancesPlusAlerts);
    }
  }, [maintenancesRequest]);

  return ({ maintenancesPlusAlerts: maintenances });
}

export default useAlertsMaintenances;
