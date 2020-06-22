import styled from 'styled-components';


export const Container = styled.button`
  width: 250px;
  height: 40px;
  border-radius: 20px;
  border-width: 0;
  color: #ffffff;
  background: #0D3E3D;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    width: 150px;
    height: 30px;
  }
`;
