import { FaSun, FaMoon } from 'react-icons/fa'; // استخدام أيقونات من مكتبة react-icons

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <div
      className={`fixed top-4 right-9 p-2 rounded-full shadow-lg mt-[500px] 
      ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-900'}
      transition-colors duration-300 ease-in-out cursor-pointer`}
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? (
        <FaMoon size={24} />
      ) : (
        <FaSun size={24} />
      )}
    </div>
  );
};

export default DarkModeToggle;
