import styled, {css} from 'styled-components';

interface IfContainerProps {
  ifSelectOrder: string;
  ifColorAlert?: string;
}

interface IfMaintenanceContainerProps {
  ifcolorAlert?: string;
}

export const Container = styled.div<IfContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 160vh;

  ${(props) => props.ifColorAlert && css`
    .header-page-motor {
      button:first-child {
        color: ${props.ifColorAlert === '#ffffff' ? '#0D3E3D' : props.ifColorAlert};
        border-bottom-color: ${props.ifColorAlert === '#ffffff' ? '#0D3E3D' : props.ifColorAlert};
      }
    }
  `}

  .motor-section {
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
      ${(props) => props.ifColorAlert && css`
        background: ${props.ifColorAlert};
      `}
      ${(props) => props.ifColorAlert === '#ffffff' && css`
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
  }
  .header-maintenance-section {
    div {
      ${(props) => props.ifSelectOrder === 'desc' ? css`
        button:last-child {
          background: #ffffff;
          color: #8D8D8D;
        }
      ` : css`
        button:first-child {
          background: #ffffff;
          color: #8D8D8D;
        }
      `}
    }
  }
  .maintenance-section {
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
  }
`;

export const MaintenanceContainer = styled.tbody<IfMaintenanceContainerProps>`
  ${(props) => props.ifcolorAlert && css`
    td {
      color: ${props.ifcolorAlert === '#ffffff' ? '#177978' : props.ifcolorAlert};
    }
  `}
`;
