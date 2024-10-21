import React from 'react'
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import Login from './components/Login'
import ChangePassword from './components/ChangePassword';
import SignUp from './components/SignUp';
import Verification from './components/Verification';
import Profile from './components/Profile';
import LandingPage from './components/LandingPage';
import Floors from './landing components/Floors';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element = {<Login/>}/>
          <Route path='/change-password' element = {<ChangePassword/>}/>
          <Route path='/sign-up' element = {<SignUp/>}/>
          <Route path='/verification' element = {<Verification/>}/>
          <Route path='/profile' element = {<Profile/>}/>
          <Route path='landing' element = {<LandingPage/>}/>
          <Route path='/floors' element = {<Floors/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App





