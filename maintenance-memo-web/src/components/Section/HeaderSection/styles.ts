import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  width: 70%;
  align-self: center;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
  place-items: center;
  padding: 5px;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2);
  color: #0D3E3D;

  div {
    display:flex;
  }

  button {
    width: 150px;
    height: 20px;
  }

  div button, select {
    margin-right: 10px;
  }
  div label{
    margin-right: 5px;
  }


  @media screen and (max-width: 768px) {
    width: 90%;
    flex-direction: column;
    div {
      display: flex;
      flex-direction: column;
      * {
        margin-top: 10px;
      }
    }
  }
`;
