import styled from 'styled-components';

export const Container = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  background: #ffffff;
  border-radius: 20px;
  padding: 2px 5px;
  font-size: 10pt;

  @media screen and (max-width: 768px) {
    font-size: 12pt;
  }
`;
