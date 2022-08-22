import React from 'react';
import Calc from './components/Calculator';
import { ExContainer, Footer, Header } from './AppElements';
import ReactVersion from './components/functions/ReactVersion';

function App() {
  return (
    <ExContainer>
      <Header>
      </Header>
      <Calc />
      <Footer>
        <ReactVersion />
      </Footer>
    </ExContainer>
  );
}

export default App;
