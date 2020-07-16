import styled, { css } from 'styled-components';

interface MotorProps {
  ifColorAlert: string | undefined;
}
export const Container = styled.div`

  .header-section-grid {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: #F6F6F6;
    position: sticky;
    top: 0;
  }
`;

export const GridContainer = styled.div`
  width: 100%;
  display: grid;
  padding: 10px 100px;
  margin-bottom: 20px;
  grid-template-columns: repeat(auto-fill, minmax(20%, auto));
  gap: 30px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 100%;
    padding: 10px 20px;
  }

`;
export const MotorContainer = styled.div<MotorProps>`
  font-size: 10pt;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  color: #ffffff;
  padding: 10px 0;
  cursor: pointer;

  :hover {
    transform: translateX(5px) scale(1.1);
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.4);
    margin-bottom: 50px;
  }

  ${({ ifColorAlert }) => ifColorAlert && css`
    background: ${ifColorAlert};
  `}

  div:nth-child(4) {
    width: 100%;
    border-top: 5px solid #F6F6F6;
    padding: 10px;
    line-height: 25px;
  }

  ${({ ifColorAlert }) => ifColorAlert === '#ffffff' && css`
    color: rgba(0, 0, 0, 0.8);
    && div:nth-child(4) {
      border-top: 5px solid rgba(0, 0, 0, 0.3);
      font-weight: bold;
      color: #177978;
    }
  `}

  div {
    text-align: center;
    margin: 5px 0;
  }
`;
