import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  width: 400px;
  flex-direction: column;
  height: 80vh;
  align-items: center;
  margin: auto;

  h2 {
    margin-bottom: 20px;
    color: #0D3E3D;
    text-align: center;
  }

  > div {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    margin: 20px auto;
    width: 90%;
  }
`;
