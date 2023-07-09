import React from 'react';

import './styles.scss';
import { MatrixWrapper } from '../MatrixWrapper';

const App = () => {
  console.log('matrix gogo');
  return (
    <div className={'matrix matrix-container'}>
      <MatrixWrapper />
    </div>
  );
};

export default App;
