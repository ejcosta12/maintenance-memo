import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
  }

  div {
    width: 80%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2);

    h1 {
      color: #177978;
      cursor: pointer;
      @media screen and (max-width: 768px) {
        font-size: 15pt;
      }
    }

    nav {
      width: 100%;
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      * {
        margin-right: 20px;
        @media screen and (max-width: 768px) {
          font-size: 10pt;
        }
      }
    }
  }

`;
