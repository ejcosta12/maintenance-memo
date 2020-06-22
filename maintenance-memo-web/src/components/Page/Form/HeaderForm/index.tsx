import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';

import { Container, ProgressArea } from './styles';
import { MotorsContext } from '../../../../context/MotorsContext';
import { Button } from '../../../Elements';

interface PropsForm {
  children?: React.ReactNode;
  nextForm: boolean;
  finishForm: boolean;
}

const HeaderForm: React.FC<PropsForm> = ({
  children,
  nextForm,
  finishForm,
}: PropsForm) => {

  const { countAlertsIssued } = useContext(MotorsContext);
  const history = useHistory();

  return (
    <Container>
      <div>
        <h1 onClick={() => history.push('/gallery-motor')}>
          MAINTENANCE MEMO
        </h1>
      </div>
      <div>
        <p>
          {countAlertsIssued} Noitifcações
        </p>
        <Button onClick={() => history.push('/gallery-motor')}>
          Ver Registros
        </Button>
      </div>
      <div>
        <h4>
          {children}
        </h4>
      </div>
      <ProgressArea
        ifNextForm={nextForm}
        ifFinishForm={finishForm}
      >
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </ProgressArea>
    </Container>
  );
};

export default HeaderForm;
