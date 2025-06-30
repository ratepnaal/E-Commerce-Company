import {React , useContext} from 'react'
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
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
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './PrivateRoute'; 

const AppContent = () => {
  const { darkMode } = useContext(ThemeContext);
  const { i18n } = useTranslation();
  return (
    <div className={`${darkMode?`bg-gray-900 text-white`:``}`}>
      <I18nextProvider i18n={i18n}>
        <Router>
          <LanguageSelector />
          <DarkModeToggle />
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/change-password' element={<ChangePassword/>}/>
            <Route path='/sign-up' element={<SignUp/>}/>
            <Route path='/verification' element={<Verification/>}/>
            <Route path="/profile" element={ <PrivateRoute> <Profile/> </PrivateRoute>}/>
            <Route path="/landing" element={<PrivateRoute> <LandingPage/> </PrivateRoute>}/>
            <Route path="/floors" element={<PrivateRoute> <Floors/> </PrivateRoute>}/>
            <Route path='/verify-code' element={<VerifyResetCode/>}/>
            <Route path='/set-password' element={<SetNewPassword/>}/>
          </Routes>
        </Router>
      </I18nextProvider>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
    </AuthProvider>
  );
};

export default App







