import styled from 'styled-components';

export const Container = styled.div`

  .area-form{
    flex-direction: row-reverse;
    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
  }

  form {
    button {
      margin: 10px auto;
    }
  }
`;
