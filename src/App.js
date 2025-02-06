import {React , useState , useEffect} from 'react'
import { BrowserRouter as Router , Route , Routes, useNavigate } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import Login from './components/Login'
import ChangePassword from './components/ChangePassword';
import SignUp from './components/SignUp';
import Verification from './components/Verification';
import Profile from './components/Profile';
import LandingPage from './components/LandingPage';
import Floors from './landing components/Floors';
import DarkModeToggle from './components/DarkModeToggle';
import LanguageSelector from './components/LanguageSelector ';
import VerifyResetCode from './components/VerifyResetCode';
import SetNewPassword from './components/SetNewPassword';
import { useTranslation } from 'react-i18next';
import PrivateRoute from './PrivateRoute';

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
   const { i18n } = useTranslation();
   const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
 
   const changeLanguage = (lang) => {
     i18n.changeLanguage(lang);
     setCurrentLanguage(lang);
   };
   useEffect(() => {
    document.body.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  }, [currentLanguage]);

  return (
    <div className={`${darkMode?`bg-gray-900 text-white`:``}`}>
      <I18nextProvider i18n={i18n}>
      <LanguageSelector currentLanguage={currentLanguage} changeLanguage={changeLanguage} darkMode={darkMode} />
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Router>
        <Routes>
          <Route path='/' element = {<Login darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path='/change-password' element = {<ChangePassword darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path='/sign-up' element = {<SignUp darkMode = {darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path='/verification' element = {<Verification darkMode = {darkMode} setDarkMode = {setDarkMode}/>}/>
          <Route path="/profile" element={<Profile darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/landing" element={<LandingPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/floors" element={<Floors darkMode={darkMode} setDarkMode={setDarkMode} />  } />
          <Route path='/verify-code' element = {<VerifyResetCode darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path='/set-password' element = {<SetNewPassword darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        </Routes>
      </Router>
      </I18nextProvider>
    </div>
  )
}
export default App






