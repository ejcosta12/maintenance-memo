import styled, { css } from 'styled-components';

interface FormProps {
  type?: string;
  power?: string;
}

interface StatusFormProps {
  ifErrorFieldForm?: FormProps;
}

export const Container = styled.div<StatusFormProps>`

  .area-form{
    flex-direction: row-reverse;
    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
  }

  form {
    > div {
      ${({ ifErrorFieldForm }) => (!!ifErrorFieldForm?.type) && css`
          #type {
            border: 2px solid #FF0F00;
          }
      `}
      ${({ ifErrorFieldForm }) => (!!ifErrorFieldForm?.power) && css`
          #power {
            border: 2px solid #FF0F00;
          }
      `}
    }
  button {
    margin: 10px auto;
  }
}
`;
