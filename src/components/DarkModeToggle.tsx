import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

const DarkModeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg transition-colors duration-200 hover:bg-navy-blue/10 dark:hover:bg-white/10"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="h-5 w-5 text-slate-gray dark:text-white" />
      ) : (
        <Moon className="h-5 w-5 text-slate-gray" />
      )}
    </button>
  );
};

export default DarkModeToggle;