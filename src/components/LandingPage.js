import {React, useContext} from 'react'   
import Header from '../landing components/Header'
import Intro from '../landing components/Intro'
import Interior from '../landing components/Interior'
import LandScaping from '../landing components/LandScaping'
import AboutUs from '../landing components/AboutUs'
import Busines from '../landing components/Busines'
import Footer from './Footer'
import DarkModeToggle from './DarkModeToggle'
import { ThemeContext } from '../contexts/ThemeContext'

const LandingPage = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div>
      <DarkModeToggle/>
      <Header/>
      <Intro/>
      <Interior/>
      <LandScaping/>
      <AboutUs/>
      <Busines/>
      <Footer/>
    </div>
  )
}

export default LandingPage