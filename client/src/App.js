import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ZoomAuth from './components/ZoomAuth';

function App() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<ZoomAuth/>}/>
    </Routes>
  );
}

export default App;
