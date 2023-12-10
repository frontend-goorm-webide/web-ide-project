import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import Join from './pages/join/Join';
import FindInfo from './pages/findinfo/FindInfo';
import Ide from './pages/ide/Ide';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/join' element={<Join />}></Route>
        <Route path='/ide' element={<Ide />}></Route>
        <Route path='/findinfo' element={<FindInfo />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
