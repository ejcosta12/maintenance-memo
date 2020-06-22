import React, {AreaHTMLAttributes} from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from './styles';

type HeaderProps = AreaHTMLAttributes<HTMLHeadElement>

const HeaderPage: React.FC<HeaderProps> = ({children, ...rest}) => {

  const history = useHistory();

  return (
    <Container {...rest}>
      <div>
        <h1 onClick={() => history.push('/gallery-motor')}>MAINTENANCE MEMO</h1>
        <nav>
          {children}
        </nav>
      </div>
    </Container>
  );
};

export default HeaderPage;

