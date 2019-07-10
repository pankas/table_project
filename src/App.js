import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import Table from './Table';
import RowDetails from './RowDetails';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Route path='/' component={Table} />
      <Route  path='/details' component={RowDetails}/>
    </BrowserRouter>

    </div>
  );
}

export default App;
