import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './components/Home';
import Login from './components/Login';
import Generator from './components/Generator';

function App() {

  return (
    
      <div className=''>
        <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/generateimage' element={<Generator/>}></Route>
        </Routes>
        </BrowserRouter>
       
    </div>
  )
}

export default App
