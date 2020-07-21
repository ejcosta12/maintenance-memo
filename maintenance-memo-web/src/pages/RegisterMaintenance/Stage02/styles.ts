import styled from 'styled-components';

export const Container = styled.div`
  div {
    display: flex;
    align-items: center;
    input {
      margin-right: 20px;
    }
    span {
      width: 100%;
      color: #0D3E3D;
      margin-left: 10px;
      font-weight: bold;
    }
  }
  textarea {
    margin-top: 10px;
    width: 100%;
    height: 60px;
    border: 0;
    text-align: left;
    color: #0D3E3D;

    ::-webkit-input-placeholder {
      color: rgba(32, 162, 160, 0.4);
    }
  }
`;
