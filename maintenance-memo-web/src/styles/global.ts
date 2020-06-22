import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    outline: 0;
  }
  body {
    background: #F6F6F6;
    font-family: 'Roboto', sans-serif;
  }
  button {
    cursor: pointer;
  }
`;
