import styled, { css } from 'styled-components';

interface StatusFormProps {
  ifNextForm: boolean;
  ifFinishForm: boolean;
}

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: #20A2A0;
  height: 100vh;
  align-items: center;
  justify-content: center;


  @media screen and (max-width: 768px) {
    padding: 10px 0;
    justify-content: space-between;
    width: 100%;
    height: 400px;
    position: sticky;
    top: -330px;
  }

  div {
    width: 80%;
    text-align: center;
    line-height: 20pt;
    p {
    color: #ffffff;
    }
    h1 {
      color: #ffffff;
      margin-bottom: 10px;
      cursor: pointer;
    }
    h4 {
      font-weight: 400;
      font-size: 15pt;
      color: #0D3E3D;
    }
    button {
      margin-top: 10px;
      width: 200px;
      height: 25px;
      color: #ffffff;
      background: #177978;
    }
  }
`;
export const ProgressArea = styled.div<StatusFormProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #20A2A0;
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    margin-top: 0;
    height: 50px;
  }

  div {
    display:flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #ffffff;
    margin: 0 10px;
  }

  ${(props) => !props.ifNextForm && css`
  div {
        background: #0D3E3D;
        & + div {
          background: #C4C4C4;
        }
      }
  `}

  ${(props) => props.ifNextForm && !props.ifFinishForm && css`
  div {
        background: #0D3E3D;
        + div {
          background: #0D3E3D;
          + div {
            background: #c4c4c4;
          }
        }
      }
  `}
  ${(props) => props.ifNextForm && props.ifFinishForm && css`
  div {
        background: #0D3E3D;
      }
  `}
`;
