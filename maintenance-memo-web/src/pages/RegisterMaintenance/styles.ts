import styled, { css } from 'styled-components';

interface FormProps {
  numberMotor?: string;
  resistance30s?: string;
  resistance60s?: string;
  resistance10m?: string;
  commentary?: string;
}

interface StatusFormProps {
  ifErrorSubmitForm?: boolean;
  ifErrorFieldForm?: FormProps;
}

export const Container = styled.div<StatusFormProps>`
  form {
    > div {
      div:first-child {
        width: 100%;
        label {
          display: block;
          width: 100%;
          margin-top: 20px;
          text-align: left;
          margin-bottom: 20px;
        }
      }
      div:last-child {
        display: flex;
        align-items: center;
      }
      a {
        margin: 20px 0;
        :visited {
          color: #0D3E3D;
        }
      }
      p {
        color: #0D3E3D;
      }
      button {
        margin: 10px auto;
      }

      ${({ ifErrorFieldForm, ifErrorSubmitForm }) => (
    !!ifErrorFieldForm?.numberMotor || !!ifErrorSubmitForm) && css`
        #numberMotor {
          border: 2px solid #FF0F00;
        }
      `}
      ${({ ifErrorFieldForm }) => ((!!ifErrorFieldForm?.resistance30s) && css`
        #resistance30s {
          border: 2px solid #FF0F00;
        }
      `)
    || (
      (!!ifErrorFieldForm?.resistance60s) && css`
        #resistance60s {
          border: 2px solid #FF0F00;
        }
      `)
      || (
        (!!ifErrorFieldForm?.resistance10m) && css`
        #resistance10m {
          border: 2px solid #FF0F00;
        }
      `)}
    }
  }
`;
