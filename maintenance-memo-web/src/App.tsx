import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import Routes from './routes'
import { MotorsProvider } from './context/MotorsContext';

import GlobalStyle from './styles/global'

function App() {
  return (
    <>
      <GlobalStyle/>
      <Router>
        <MotorsProvider>
          <Routes/>
        </MotorsProvider>
      </Router>
    </>
  );
}

export default App;
