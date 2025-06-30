import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
          setDarkMode(true);
        } else {
          setDarkMode(false); // الافتراضي هو اللايت إذا مافي شي محفوظ
        }
      }, []);
      useEffect(() => {
        if (darkMode) {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
          document.body.classList.add('dark-mode-body'); // اسم كلاس اختياري ممكن تضيفه للـ body
          document.body.classList.remove('light-mode-body');
        } else {
          document.documentElement.removeAttribute('data-theme');
          localStorage.setItem('theme', 'light');
          document.body.classList.add('light-mode-body'); // اسم كلاس اختياري
          document.body.classList.remove('dark-mode-body');
        }
      }, [darkMode]);
      const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
      };
      return (
        // 3. توفير القيمة (darkMode و toggleDarkMode) للـ children
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
          {children}
        </ThemeContext.Provider>
      );
    };
    export { ThemeContext, ThemeProvider };
    