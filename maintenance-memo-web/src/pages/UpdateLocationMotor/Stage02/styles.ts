import styled from "styled-components";

export const Container = styled.div`
  div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #ffffff;
    border: 0;
    width: 100%;
    height: 80%;
    padding: 10px;
    line-height: 40px;
    color: #FF0F00;

    p:nth-child(2) {
        font-weight: bold;
    }

    p:last-child {
      font-weight: bold;
    }
  }
`;
