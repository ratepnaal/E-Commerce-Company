import {React} from 'react'   
import Header from '../landing components/Header'
import Intro from '../landing components/Intro'
import Interior from '../landing components/Interior'
import LandScaping from '../landing components/LandScaping'
import AboutUs from '../landing components/AboutUs'
import Busines from '../landing components/Busines'
import Footer from './Footer'
const LandingPage = ({darkMode , setDarkMode}) => {
  return (
    <div>
<Header darkMode={darkMode} setDarkMode={setDarkMode}/>
<Intro darkMode={darkMode} setDarkMode={setDarkMode}/>
<Interior darkMode={darkMode} setDarkMode={setDarkMode}/>
<LandScaping darkMode={darkMode} setDarkMode={setDarkMode}/>
<AboutUs darkMode={darkMode} setDarkMode={setDarkMode}/>
<Busines darkMode={darkMode} setDarkMode={setDarkMode}/>
<Footer darkMode={darkMode} setDarkMode={setDarkMode}/>
    </div>
  )
}

export default LandingPage