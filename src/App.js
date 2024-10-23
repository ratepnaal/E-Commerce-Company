import {React , useState , useEffect} from 'react'
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import Login from './components/Login'
import ChangePassword from './components/ChangePassword';
import SignUp from './components/SignUp';
import Verification from './components/Verification';
import Profile from './components/Profile';
import LandingPage from './components/LandingPage';
import Floors from './landing components/Floors';
import DarkModeToggle from './components/DarkModeToggle';

const App = () => {
  const [darkMode , setDarkMode] = useState(false);
  useEffect(()=>{
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark'){
      setDarkMode(true)
    }else{
      setDarkMode(false);
    }
  } , [] );
  useEffect(()=>{
    if (darkMode){
      document.documentElement.setAttribute('data-theme' , 'dark');
      localStorage.setItem('theme' , 'dark');
    }else{
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme' , 'light')
    }
    }
   , [darkMode])
  return (
    <div className={`${darkMode?`bg-gray-900 text-white`:``}`}>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Router>
        <Routes>
          <Route path='/' element = {<Login darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path='/change-password' element = {<ChangePassword darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path='/sign-up' element = {<SignUp darkMode = {darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path='/verification' element = {<Verification darkMode = {darkMode} setDarkMode = {setDarkMode}/>}/>
          <Route path='/profile' element = {<Profile darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path='landing' element = {<LandingPage darkMode= {darkMode} setDarkMode = {setDarkMode} />}/>
          <Route path='/floors' element = {<Floors darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        </Routes>
      </Router>
    </div>
  )
}
export default App





