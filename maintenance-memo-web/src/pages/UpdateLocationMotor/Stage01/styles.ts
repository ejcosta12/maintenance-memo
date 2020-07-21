import styled from 'styled-components';

export const Container = styled.div`

  span {
    color: #0D3E3D;
    margin-top: 20px;
  }

  > div {
    display: flex;
    flex-direction: column;

    label {
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .select {
      margin-top: 20px;
    }

    div {
      display: flex;
      align-items: center;
    }
  }
`;
