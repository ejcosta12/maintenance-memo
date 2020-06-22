import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
  padding: 2px 10px;
  color: #0D3E3D;
  margin: 10px 0 20px 0;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
  input {
    border-radius: 20px;
    font-weight: bold;
  }
`;
