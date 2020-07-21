import styled, { css } from 'styled-components';

interface IfContainerProps {
  ifSelectOrder: string;
  ifColorMotorAlert?: string;
}

interface IfMaintenanceContainerProps {
  ifColorMaintenanceAlert?: string;
}

export const Container = styled.div<IfContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 160vh;

  ${({ ifColorMotorAlert }) => ifColorMotorAlert && css`
    .header-page-motor {
      button:first-child {
        color: ${ifColorMotorAlert === '#ffffff' ? '#0D3E3D' : ifColorMotorAlert};
        border-bottom-color: ${ifColorMotorAlert === '#ffffff' ? '#0D3E3D' : ifColorMotorAlert};
      }
    }
  `}
  .header-maintenance-section {
    div {
      ${({ ifSelectOrder }) => (ifSelectOrder === 'desc' ? css`
        button:last-child {
          background: #ffffff;
          color: #8D8D8D;
        }
      ` : css`
        button:first-child {
          background: #ffffff;
          color: #8D8D8D;
        }
      `)}
    }
  }
`;

export const MotorContainer = styled.div<IfContainerProps>`
  width: 70%;
  line-height: 25px;
  div {
    width: 100%;
    padding: 5px;
    span {
      color: #2C2C2C;
      margin: 0 20px 0 10px;
      strong {
        color: #177978;
      }
    }
  }
  div:last-child {
    font-weight: 500;
    width: 50%;
    margin: 10px auto;
    color: #ffffff;
    border-radius: 5px;
    padding: 10px;
    text-align: center;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
    ${({ ifColorMotorAlert }) => ifColorMotorAlert && css`
      background: ${ifColorMotorAlert};
    `}
    ${({ ifColorMotorAlert }) => ifColorMotorAlert === '#ffffff' && css`
      color: #177978;
    `}
    @media screen and (max-width: 768px) {
      width: 90%;
    }
  }
  @media screen and (max-width: 768px) {
    div {
      padding: 1px;
      display: flex;
      flex-direction: column;
    }
  }
`;

export const MaintenanceSectionContainer = styled.div<IfContainerProps>`
  width: 80%;
  overflow: auto;
  margin-bottom: 20px;
  Table {
    padding: 10px;
    td {
      padding-top: 10px;
      box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2)
    }
    td:last-child {
      max-width: 25%;
      text-align: justify;
    }
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const MaintenanceContainer = styled.tbody<IfMaintenanceContainerProps>`
  ${({ ifColorMaintenanceAlert }) => ifColorMaintenanceAlert && css`
    td {
      color: ${ifColorMaintenanceAlert === '#ffffff' ? '#177978' : ifColorMaintenanceAlert};
    }
  `}
`;
