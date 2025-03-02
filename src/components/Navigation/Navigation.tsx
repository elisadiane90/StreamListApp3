import React from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from "./DarkModeToggle/DarkModeToggle"; 

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </nav>
  );
};

export default Navigation; 
